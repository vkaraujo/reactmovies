import { useEffect, useState } from "react";
import { getDataVideos } from "../api/tmdb";

export function TrailerModal({ categoria, id, isOpen, onClose }) {
    const [videoKey, setVideoKey] = useState(null);

    async function loadTrailer() {
        try {
            const videos = await getDataVideos(categoria, id);
            const trailer = videos.find(video => video.type === "Trailer" && video.site === "YouTube");
            setVideoKey(trailer?.key || null);
        } catch (error) {
            console.error("Error loading trailer:", error);
            setVideoKey(null);
        }
    }

    useEffect(() => {
        if (isOpen) {
            loadTrailer();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded max-w-[800px] w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
                >
                    Close
                </button>
                {videoKey ? (
                    <iframe
                    className="w-full aspect-video border-0"
                    src={`https://www.youtube.com/embed/${videoKey}`}
                    title="Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                ) : (
                    <p className="text-brand-dark">No trailer available.</p>
                )}
            </div>
        </div>
    );
}
