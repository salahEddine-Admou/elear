import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Sidebarcours from '../components/sidebarcours'; 

const ParcourirModules = () => {
  const modules = [
    {
      name: 'Module 1',
      videos: [
        { title: 'Video 1 introduction to devops ', duration: '10:00', videourl:"https://www.youtube.com/watch?v=vrP6MfMDyGQ"},
        { title: 'Video 2 introduction to automation', duration: '15:00' },
      ],
    },
    {
        name: 'Module 2',
        videos: [
          { title: 'Video 3', duration: '10:00' },
          { title: 'Video 4', duration: '15:00' },
        ],
      },
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('notes');
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };
  const handleTabChange = (tab) =>{
    setActiveTab(tab);
  }

  return (
    <>
    <div> 
            <Navbar />
      <div className="course-container">
        <Sidebarcours modules={modules} onVideoSelect={handleVideoSelect} />
        <div className="video-display">
          {selectedVideo && (
            <div>
              <h3>{selectedVideo.title}</h3>
              <p>Duration: {selectedVideo.duration}</p>
              {/* You can also add a video player here */}
            </div>
          )}
        </div>
        <div className="bg-gray-200 overflow-hidden">
  <div className="sm:mx-6 md:ml-72 md:mr-6 md:mt-24 p-6">
    <div>
      <div className="bg-white mt-6">
        <h1> hello </h1>
        <h1> hello </h1>
        <h1> hello </h1>
      </div>
      <div className="bg-white mt-8 mb-8" style={{height: '250px'}}>
                  <div className="flex">
                    <button
                      className={`mr-4 focus:outline-none ${activeTab === 'notes' ? 'text-white-500 border-b-2 border-orange-500' : ''}`}
                      onClick={() => handleTabChange('notes')}
                    >
                      Notes
                    </button>
                    <button
                      className={`focus:outline-none ${activeTab === 'downloads' ? 'text-white-500 border-b-2 border-orange-500' : ''}`}
                      onClick={() => handleTabChange('downloads')}
                    >
                      Downloads
                    </button>
                  </div>
                  {activeTab === 'notes' && (
                    <div>
                      {/* Render notes content here */}
                      <p>content notes.</p>
                    </div>
                  )}
                  {activeTab === 'downloads' && (
                    <div>
                      {/* Render downloads content here */}
                      <p>content downaloads.</p>
                    </div>
                  )}
                </div>
    </div>
  </div>
</div>

      </div>
      </div>
    </>
  );
}

export default ParcourirModules;
