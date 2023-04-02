import pandas as pd
from src.config.config import CLIENT_ID, CLIENT_SECRET
from src.config.auth import authenticate
from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib


app = Flask(__name__)
cors = CORS(app)

sp = authenticate(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)

model = joblib.load("src/predictor.joblib")


def predict_moods(track_id):
    # get the tracks information
    track_info = sp.track(track_id)

    # create a dict with the track info
    track_data = {
        "title": track_info["name"],
        "artist": track_info["artists"][0]["name"],
        "album": track_info["album"]["name"],
        "album_cover": track_info["album"]["images"][0]["url"]
    }

    # get the audio features
    features = sp.audio_features(tracks=[track_id])[0]

    # create a dateframe with the audio features
    df = pd.DataFrame.from_dict(features, orient='index').T

    # drop non feature cols
    df.drop(
        ['type', 'id', 'uri', 'track_href', 'liveness', 'mode', 'analysis_url', 'duration_ms', 'time_signature', 'key'],
        axis=1,
        inplace=True)

    # predict the mood probabilities for the track
    probs = model.predict_proba(df)[0]

    # get top 2
    top_moods = sorted(zip(model.classes_, probs), key=lambda x: x[1], reverse=True)

    # add track data to result dictionary
    result = {
        "track": track_data,
        "moods": []
    }

    # adds the mood predictions to result dict
    for mood, prob in top_moods:
        result["moods"].append({
            "name": mood,
            "probability": round(prob, 2)
        })

        # get similar tracks
        seed_artists = [track_info["artists"][0]["id"]]
        seed_tracks = [track_id]
        recommendations = sp.recommendations(seed_artists=seed_artists, seed_tracks=seed_tracks, limit=5)['tracks']
        recommended_tracks = []
        for rec in recommendations:
            recommended_tracks.append({
                "title": rec["name"],
                "artist": rec["artists"][0]["name"],
                "album": rec["album"]["name"],
                "album_cover": rec["album"]["images"][0]["url"],
                "track_id": rec["id"]
            })

        result["recommendations"] = recommended_tracks

    return result


@app.route("/", methods=["GET"])
def index():
    return "<p>Welcome to our Spotify app</p>"


@app.route("/predict", methods=["POST"])
def predict():
    track_id = request.args.get("track_id")
    result = predict_moods(track_id)
    return jsonify(result)


if __name__ == "__main__":
    app.debug = True
    app.run()
