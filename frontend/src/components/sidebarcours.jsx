import React, { useState } from 'react';
import "../styles/sidebarcourse.css";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { BsFillPlayCircleFill } from "react-icons/bs";


const Sidebarcours = ({ modules, onVideoSelect }) => {
  const [openModule, setOpenModule] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  const selectVideo = (video) => {
    setSelectedVideo(video);
    onVideoSelect(video);
  };

  return (
    <div className="sidebarcours">
      <ul>
        {modules.map((module, index) => (
          <li key={index}>
            <div className="module-container" onClick={() => toggleModule(index)}>
              {module.name}
              {openModule === index ? (
                <TiArrowSortedUp className="arrow-icon" />
              ) : (
                <TiArrowSortedDown className="arrow-icon" />
              )}
            </div>
            {openModule === index && (
              <ul>
                {module.videos.map((video, vIndex) => (
                  <li key={vIndex} className={selectedVideo === video ? 'selected-video' : 'video-item'}>
                    <div className="video-clickable" onClick={() => selectVideo(video)}>
                      <BsFillPlayCircleFill className="play-icon" />
                      <span className="video-title">{video.title}</span>
                    </div>
                    <p className='video-duration'>{video.duration}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebarcours;
