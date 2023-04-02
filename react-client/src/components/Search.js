import { useState } from "react";
import '../index.css'
import { useNavigate } from "react-router-dom";

export default function Search(){
    const navigate = useNavigate();
    const [trackUrl, setTrackUrl] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        const parts = trackUrl.split("/");
        console.log(parts);
        const trackId = parts[parts.length - 1].split("?")[0];
        console.log(trackId);
        navigate(`/results/${trackId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Predict Song Mood</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="trackUrl" className="block text-sm font-medium text-gray-700">
                                Song URL:
                            </label>
                            <div className="mt-1">
                                <input
                                id="trackUrl"
                                type="text"
                                autoComplete="off"
                                required
                                value={trackUrl}
                                onChange={(e) => setTrackUrl(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <button 
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md
                            shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Find Mood
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}