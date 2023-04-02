import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import MoodChart from "./MoodChart";
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

export default function Results() {
    const { trackId } = useParams();
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const apiUrl = `https://moodify-server.herokuapp.com/predict?track_id=${trackId}`;
        axios.post(apiUrl)
            .then((res) => {
                setSongInfo(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }, [trackId])

    const getTopMood = (moods) => {
        if (!moods || moods.length === 0) {
            return null;
        }
        const topMood = moods.reduce((prev, curr) =>
            prev.probability > curr.probability ? prev : curr
        );
        return topMood.name;
    };
    

    return (
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {songInfo && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-lg shadow-lg">
                    <img
                      src={songInfo.track.album_cover}
                      alt={songInfo.track.album}
                      className="w-full object-cover h-80 rounded-t-lg"
                    />
                    <div className="px-6 py-4">
                      <p className="text-3xl font-extrabold text-gray-900 mb-2">
                        {songInfo.track.title}
                      </p>
                      <p className="text-xl font-bold text-gray-700 mb-2">
                        {songInfo.track.artist}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {songInfo.track.album}
                      </p>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-700 mt-4 mb-4">Similar Songs</h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                    
                    {songInfo.recommendations.map((rec) => (
                      <div key={rec.track_id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                          src={rec.album_cover}
                          alt={rec.album}
                          className="w-full h-32 object-cover"
                        />
                        <div className="px-2 py-1">
                          <p className="text-sm font-bold text-gray-700 mb-1">
                            {rec.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {rec.artist}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-lg shadow-lg">
                    <div className="px-6 py-4">
                      <p className="text-xl font-bold text-gray-700 mb-2">
                        {`Most likely mood: ${getTopMood(songInfo?.moods)}`}
                      </p>
                      <MoodChart moods={songInfo.moods} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
}
