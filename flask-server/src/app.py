from config import config
from config.auth import authenticate
from flask import Flask
import joblib
import pandas as pd

app = Flask(__name__)

sp = authenticate(client_id=config.CLIENT_ID, client_secret=config.CLIENT_SECRET)

@app.route("/", methods=["GET"])
def index():
    return "<p>Welcome to our Spotify app</p>"


if __name__ == "__main__":
    app.debug = True
    app.run()
