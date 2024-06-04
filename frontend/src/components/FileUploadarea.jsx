import React, { useState, useEffect } from 'react';
import { RiPlayCircleFill } from 'react-icons/ri';
import { LuUpload } from 'react-icons/lu';
import ReactPlayer from 'react-player';
import { submodule } from '../components/ModuleInput';
import { updateSubModule } from '../services/UsersService';
import CustomAlert from '../components/CustomAlert ';
import Swal from 'sweetalert2';
const FileUploadArea = ({ moduleId, submoduleIndex, submodule, onSubmoduleNameChange, onFileUpload, fileUploads }) => {
 
  const [uploads, setUploads] = useState({});
  const [statePdf, setStatePdf] = useState('false');
  const [stateVideo, setStateVideo] = useState('false');
  const [val, setVal] = useState('false');
  const [submodulupdate, setsubmodulupdate] = useState({
    title: '',
    contenu: null,
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
 
  console.log(submodule)
  
  
  useEffect(() => {
    if (submodule) {
      setsubmodulupdate({
          title: submodule.title || '',
          contenu: submodule.contenu || null,
      });
  }
    
   
 
  }, []);

  const handlerSubmoduleName = (moduleId, submoduleIndex,e) => {
    
  
    const { name, value } = e.target;
  setsubmodulupdate(prev => ({ ...prev, [name]: value }));
  console.log(submodulupdate)
  setVal('true')
  };
  useEffect(() => {
   
    if (submodule) {
      setsubmodulupdate({
        title: submodule.title,
        contenu: submodule.contenu,
      });
    
   
    
   const h = checkContentType(submodule.contenu) 
   if(h==='pdf'){
    setStatePdf('true')
   }
   if(h==='video'){
    setStateVideo('true')
   }
  } 
  }, [submodule]);
  useEffect(() => {
    // Cette fonction s'exécutera chaque fois que submodulUpdate est modifié.
    console.log("hello"+submodulupdate);
  }, [submodulupdate]);
  const checkContentType = (url) => {
    if (!url) {
      console.log("URL is null or undefined, defaulting to 'video'.");
      return 'video';  // Default to 'video' when the URL is not provided.
    }
  
    // Check for data URL and extract MIME type
    if (url.startsWith("data:")) {
      const mimeType = url.substring(5, url.indexOf(';'));
      console.log("MIME Type:", mimeType);
      return mimeType.includes('pdf') ? 'pdf' : 'video';
    }
  
    // Fallback for non-data URLs
    const extension = url.split('.').pop().toLowerCase();
    console.log("File extension:", extension);
    if (extension === 'pdf') {
      return 'pdf';
    } else {
      return 'video';
    }
    
  };
  const handleVideoUpload = (e) => {
    
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
       
        setsubmodulupdate(prevState => ({
          ...prevState,
          contenu: e.target.result
        }));
      };
      reader.readAsDataURL(file);
      setVal('true')
    }
    
    const checkContentType1 = checkContentType(submodulupdate.contenu)
    if(checkContentType1 === 'video'){
      console.log("video")
      setStateVideo(true)
      setStatePdf(false)
    }
    if(checkContentType1 === 'pdf'){
      console.log("video")
      setStateVideo(false)
      setStatePdf(true)
    }
  };
 

  const handleClick = async (id,title, contenu) => {
    const trimmedValue = title.trim();
        if (trimmedValue === '') {
          setsubmodulupdate({
            title: submodule.title,
            contenu: submodule.contenu,
          });
          Swal.fire({
            title: 'Invalid Input',
            text: 'The Submodule name cannot be empty.',
            icon: 'warning',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'confirm-button-class'
            }
          });
          return;  // Do not proceed with adding the module
        }
    onSubmoduleNameChange(moduleId, submoduleIndex, title, contenu);
    try {
      await new Promise(resolve => setTimeout(resolve, 0));  // Petite astuce pour attendre la mise à jour de l'état
      const response = await updateSubModule(id, submodulupdate);
      if (response.status === 'success') {
        setVal("false");
        console.log(submodulupdate.contenu)
      //  window.location.reload();
      } 
      else{
        setsubmodulupdate({
          title: submodule.title,
        });
        onSubmoduleNameChange(moduleId, submoduleIndex, submodule.title, contenu);
        Swal.fire({
          title: 'Erreur',
          text: 'name already exists',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
              confirmButton: 'custom-ok-button' // Applying custom class to the confirm button
          }
          
      });
      }
    } catch (error) {
      console.error("Error modify module:", error);
    }
  };
  const handleClickAnnuler = async () => {
    console.log(submodule.title)
    setsubmodulupdate({
      title: submodule.title,
      contenu: submodule.contenu,
    });
  setVal("false")
     
    
  };
  const getUploadState = (type) => {
    return uploads[submoduleIndex] ? uploads[submoduleIndex][type] : false;
  };
  //console.log(submodule.contenu)
 
  if (!moduleId || submoduleIndex == null || !submodule) {
    // If critical information is missing, don't render the component
    return null;
}
  return (
    
    <div className="bg-gray-200 overflow-hidden p-10 h-[1100px] w-full flex">
      <div className="bg-white p-8 shadow-md w-full flex flex-col items-center h-[1050px]">
      <div className=" w-full mb-6">
      {val === 'true' && (
          <div className="w-full py-6 px-4 bg-gray-100 rounded-md border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500 flex flex-col items-start ">
            <p className="font-bold mb-4">Save the <span className='text-orange-500'>changes</span></p>
            <div className="flex">
            <button
  className="bg-orange-500 hover:bg-orange-600 text-black px-3 py-1.5 text-xs font-bold mr-2 flex items-center justify-center"
  onClick={() => handleClick(submodule.id,submodulupdate.title, submodulupdate.contenu)}
><svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.8383 1.69134C11.8409 1.31273 11.6173 0.969098 11.2702 0.81793C10.9231 0.666762 10.5193 0.737194 10.2438 0.996948L10.2436 0.996772L4.64107 6.45163L2.79514 4.39589L2.79498 4.39609C2.42 4.07211 1.85821 4.09371 1.50921 4.44553L1.1304 4.82635C0.789088 5.17017 0.759138 5.71504 1.06071 6.0942L1.06055 6.09432L4.09103 9.90255L4.09117 9.90244C4.27012 10.1282 4.54242 10.2599 4.83051 10.2599C5.1186 10.2599 5.3909 10.1282 5.56984 9.90244L5.57 9.90257L11.6309 2.28609L11.6307 2.28598C11.7655 2.11711 11.8387 1.90738 11.8383 1.69134Z" fill="black"/>
</svg><span>Yes</span></button>
                <button className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1.5 text-xs font-bold" onClick={() => handleClickAnnuler()}>No</button>
            </div>
        </div>
      )}
        </div>
        <input
          type="text"
          name='title'
          value={submodulupdate.title}
          
          onChange={(e) => handlerSubmoduleName(moduleId, submoduleIndex,e)}
          
          className="w-full bg-gray-100 px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <div className="mt-8 mb-8 w-full">
          <label className={`w-full bg-gray-100 ${getUploadState('pdfUploaded') ? 'p-2' : 'p-24'} rounded-md border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 border-dashed cursor-pointer flex justify-center items-center`}>
           
             
          {!submodulupdate.contenu && (  
              <>
              <input type="file" accept="application/pdf"  style={{ display: 'none' }} />
                 <label htmlFor="fileInput">
        <LuUpload className="text-2xl ml-6 mb-2" />
      
          <span className="font-bold mr-8">Upload PDF</span>
        
      </label>
       
                
              </>
            
          )}
            {submodulupdate.contenu && (

              <>
            <LuUpload className="text-2xl  mr-4 mb-2" />    
         <span className="font-bold mr-6">Change to PDF</span>
                <input type="file" accept="application/pdf"  style={{ display: 'none' }} onChange={handleVideoUpload} />
         
       
                { checkContentType(submodulupdate.contenu) === 'pdf'&& (
                <object 
  className="bg-black" 
  data={submodulupdate.contenu} 
  type="application/pdf" 
  width="100%" 
  height="300px" 
  style={{ border: 'none' }}
>
  <p>Your browser does not support PDFs. <a href={submodulupdate.contenu}>Download the PDF</a>.</p>
</object>
)}

             
              </>
              )}
            
          </label>
        </div>
        
        <div className="mt-2 mb-12 w-full">
          <label className={`w-full bg-gray-100 ${getUploadState('pdfUploaded') ? 'p-2' : 'p-24'} rounded-md border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 border-dashed cursor-pointer flex justify-center items-center`}>
           
             
          {!submodulupdate.contenu && (  
              <>
       <input
        type="file"
        style={{ display: 'none' }}
        id="fileInput"
        onChange={handleVideoUpload}
      />
      <label htmlFor="fileInput">
        <LuUpload className="text-2xl ml-8 mb-2" />
      
          <span className="font-bold">Upload Video</span>
        
      </label>
                
              </>
            
          )}
            {submodulupdate.contenu && (

              <>
                <LuUpload className="text-2xl mr-4 mb-2" />
               <span className="font-bold mr-8" >
        Change to video
      </span>
      <input
        type="file"
        style={{ display: 'none' }}
        id="fileInput"
        onChange={handleVideoUpload}
      />
      
         
        { checkContentType(submodulupdate.contenu) === 'video'&& (
      <ReactPlayer url={submodulupdate.contenu} controls width="100%" height="300px" />
     )}
              
             
              </>
              )}
            
          </label>
        </div>
      </div>
      <CustomAlert
        isOpen={alertOpen}
        message={alertMessage}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
};

export default FileUploadArea;