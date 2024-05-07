import React, { useState } from 'react';
import { RiPlayCircleFill } from 'react-icons/ri';
import { LuUpload } from 'react-icons/lu';
import ReactPlayer from 'react-player';
import { submodule } from '../components/ModuleInput';



const FileUploadArea = ({ moduleId, submoduleIndex, submodule, onSubmoduleNameChange, onFileUpload, fileUploads }) => {
  const [editableSubmoduleName, setEditableSubmoduleName] = useState(submodule.name);
  const [uploads, setUploads] = useState({});

  const handleNameBlur = () => {
    if (editableSubmoduleName.trim() === '') {
      setEditableSubmoduleName(submodule.name || 'Default Name'); 
    } else {
      onSubmoduleNameChange(moduleId, submoduleIndex, editableSubmoduleName);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onFileUpload(moduleId, submoduleIndex, 'video', url);
      setUploads(prev => ({ ...prev, [submoduleIndex]: { ...prev[submoduleIndex], videoUploaded: true } }));
    }
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onFileUpload(moduleId, submoduleIndex, 'pdf', url);
      setUploads(prev => ({ ...prev, [submoduleIndex]: { ...prev[submoduleIndex], pdfUploaded: true } }));
    }
  };

  const getUploadState = (type) => {
    return uploads[submoduleIndex] ? uploads[submoduleIndex][type] : false;
  };

  return (
    <div className="bg-gray-200 overflow-hidden p-6 h-full w-full flex">
      <div className="bg-white p-8 shadow-md w-full flex flex-col items-center">
        <input
          type="text"
          value={submodule}
          onChange={(e) => setEditableSubmoduleName(e.target.value)}
          onBlur={handleNameBlur}
          className="w-full bg-gray-100 px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <div className="mt-6 w-full">
          <label className={`w-full bg-gray-100 ${getUploadState('videoUploaded') ? 'p-2' : 'p-24'} rounded-md border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 border-dashed cursor-pointer flex justify-center items-center`}>
            {getUploadState('videoUploaded') ? (
              <RiPlayCircleFill className="text-2xl mr-2" onClick={() => setUploads(prev => ({ ...prev, [submoduleIndex]: { ...prev[submoduleIndex], videoUploaded: false } }))} />
            ) : (
              <>
                <LuUpload className="text-2xl mr-2" />
                <span>Choose a video</span>
                <input type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: 'none' }} />
              </>
            )}
            {fileUploads?.video && getUploadState('videoUploaded') && (
              <ReactPlayer url={fileUploads.video} controls width="100%" height="400px" />
            )}
          </label>
        </div>

        <div className="mt-8 mb-8 w-full">
          <label className={`w-full bg-gray-100 ${getUploadState('pdfUploaded') ? 'p-2' : 'p-24'} rounded-md border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 border-dashed cursor-pointer flex justify-center items-center`}>
            {getUploadState('pdfUploaded') ? (
              <span>PDF uploaded. Click to change.</span>
            ) : (
              <>
                <LuUpload className="text-2xl mr-2" />
                <span>Choose a PDF</span>
                <input type="file" accept="application/pdf" onChange={handlePdfUpload} style={{ display: 'none' }} />
              </>
            )}
            {fileUploads?.pdf && getUploadState('pdfUploaded') && (
              <object data={fileUploads.pdf} type="application/pdf" width="100%" height="200px" style={{ border: 'none' }}>
                <p>Your browser does not support PDFs. <a href={fileUploads.pdf}>Download the PDF</a>.</p>
              </object>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default FileUploadArea;
