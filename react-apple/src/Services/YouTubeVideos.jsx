import React, { useState, useEffect } from "react";
import "./YouTubeVideos.css";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

function YouTubeVideos() {
  const [youTubeVideos, setYouTubeVideos] = useState([]);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=UCE_M8A5yxnLfW0KghEeajjw&part=snippet,id&order=date&maxResults=8`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setYouTubeVideos(data.items);
        } else {
          setYouTubeVideos([]);
        }
      })
      .catch(() => setYouTubeVideos([]));
  }, []);

  return (
    <div className="container-fluid px-0 youtube-container">
      <h2 className="text-center font-bold">Latest YouTube Videos</h2>

      <div className="row g-2 m-0">
        {youTubeVideos
          .filter((video) => video.id.videoId)
          .map((video) => {
            const { snippet } = video;

            return (
              <div key={video.id.videoId} className="col-6 p-1">
                <div className="youtube-card">
                 
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={snippet.thumbnails.high.url}
                      alt={snippet.title}
                      className="img-fluid"
                    />
                  </a>

                
                  <h6 className="mt-2">{snippet.title}</h6>
                  <p className="small">{snippet.description}</p>
                  <p className="small text-muted">
                    {new Date(snippet.publishedAt).toDateString()}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default YouTubeVideos;
