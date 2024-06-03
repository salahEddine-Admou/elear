import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar'; 
import { getModules ,changeState, addNote} from '../services/UsersService';
import Side from '../components/sidebarcours';
import { AiOutlineLeft } from "react-icons/ai";
import "../App.css";

const ParcourirModules11 = () => {
 
  const [modules, setModules] = useState([]);
  const [selectedContenu, setSelectedContenu] = useState(null);
  const [selectedContenu2, setSelectedContenu2] = useState(null);
  const [activeTab, setActiveTab] = useState('notes');
   const [note, setNote] = useState(
    {
  
      text: ''
    }
   );
   const [pdfFiles, setPdfFiles] = useState([]);
  

   useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedModules = await getModules();
        console.log("Modules fetched:", fetchedModules); // Affiche les modules récupérés pour le débogage
    
        // Collecte tous les sous-modules qui contiennent des PDFs
        const pdfs = fetchedModules.flatMap(module =>
          module.submodules.filter(submodule => {
            const contentType = checkContentType(submodule.contenu);
            console.log("Submodule content:", submodule.contenu); // Affiche le contenu du sous-module
            console.log("Content type:", contentType); // Affiche le type de contenu détecté
            return contentType === 'pdf';
          })
        );
    
        console.log("PDF submodules:", pdfs); // Affiche les sous-modules qui contiennent des PDFs
        setPdfFiles(pdfs); // Stocke les sous-modules PDF dans l'état
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    

    fetchData();
  }, []);
  
   const handleClickNote = async() => {
    try {
      // Wait until the state is updated before making an API call
      await new Promise(resolve => setTimeout(resolve, 0));
      console.log(note)
      const response = await addNote(note);
      if (response.status === 'success') {
        console.log('Note added successfully');
        setNote({
text:"",
        });
        //) Reload the window or redirect as needed
        //window.location.reload();  // Consider using React Router for navigation instead
        setShowSuccess(true); // Affiche le message de succès
        setTimeout(() => {
          setShowSuccess(false);
       
        }, 3000);
      } else {
        console.error('Failed to add Note:', response.message);
      }
    } catch (error) {
      console.error("Error adding Note:", error);
    }
  
  };
  const [showSuccess, setShowSuccess] = useState(false); 
  const handleSuccessClose = () => {
    setShowSuccess(false);
  };
  useEffect(() => {
    
    const fetchData2 = async () => {
      try { 
        const modules1 = await getModules(); // Supposons que getFormationsMore() soit une fonction qui récupère les données des modules depuis l'API
        setModules(modules1 || []);
      } catch (err) {
        console.error("Une erreur s'est produite lors de la récupération des modules :", err);
        
      } 
    };

    fetchData2(); 
  }, []); 
  const handleContenuSelect = (contenu) => {
    setSelectedContenu(contenu);
  };
  const handleModuleSelect = (contenu2) => {
    setSelectedContenu2(contenu2);
  };
  const handleTabChange = (tab) =>{
    setActiveTab(tab);
  }
  const checkContentType = (url) => {
    if (!url) {
      console.log("URL is null or undefined, defaulting to 'video'.");
      return 'null';  // Default to 'video' when the URL is not provided.
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


 const handleClick = async (trainingId)=> {
    const fetch = await changeState(trainingId, selectedContenu2);
    window.location.reload();
    };
   

return (
  <>
  <div> 
          <Navbar />
    <div className="course-container">
      < Side
       modules={modules} onVideoSelect={handleContenuSelect} onVideoSelect2={handleModuleSelect} />
      <div className="bg-gray-200 overflow-hidden">
<div className="sm:mx-6 md:ml-60 md:mr-6 md:mt-14 p-6">
  <div>
  <div className="bg-white  mb-2 ml-4" style={{height: '600px'}}>
  {selectedContenu && (
<div className="ml-8">
  
    <div className="flex flex-row font-bold py-4 ml-6" style={{ width: '80px', height: '30px' }}><p className='py-2 '><AiOutlineLeft /></p><span className='px-4'>{selectedContenu.title}</span></div>
    <div className="relative ml-6 mt-8" style={{ width: '800px', height: '400px' }}>
      
    {selectedContenu.contenu && (
  checkContentType(selectedContenu.contenu) === 'pdf' ? (
    // Si le contenu est un PDF
    <embed src={selectedContenu.contenu} type="application/pdf" width="100%" height="100%" />
  ) : (
    // Si le contenu est une vidéo
    <video src={selectedContenu.contenu} controls className="absolute inset-0 w-full h-full object-cover" />
    
  )
)}
</div>
<div className="relative ml-6 mt-8" >
<button className="bg-orange-500 text-black px-6 py-1.5 text-xs font-bold" onClick={() => handleClick(selectedContenu.id)}>Done</button>
</div>

</div>
)}

    </div>
    <div className="bg-white mt-8 ml-4" style={{height: '500px'}}>
                <div className="flex ml-8 ">
                  <button
                    className={`mr-8 mt-4 focus:outline-none font-bold ${activeTab === 'notes' ? 'text-white-500 border-b-2 border-orange-500 font-bold' : ''}`}
                    onClick={() => handleTabChange('notes')}
                  >
                    Notes
                  </button>
                  
                  <button
                    className={`focus:outline-none font-bold mt-4 ${activeTab === 'downloads' ? 'text-white-500 border-b-2 border-orange-500 font-bold' : ''}`}
                    onClick={() => handleTabChange('downloads')}
                  >
                    Downloads
                  </button>
                </div>
                {activeTab === 'notes' && (
                  <>
                  <div className='ml-14 bg-gray-100 mr-8 mt-6 rounded-md'>
                  <div className="font-bold ml-12 mt-2 py-2"> Notes</div>
                   <textarea
                   name="text"
                   value={note.text}
        onChange={(e) => setNote({ text: e.target.value })}
         
         className="textarea-lined ml-12 mr-12 mt-2"
       />
     
                 </div>
                   <div className="relative ml-16 mt-8" >
                   <button className="bg-orange-500 text-black px-6 py-1.5 text-xs font-bold" onClick={() => handleClickNote()}>Save</button>
                   </div>
                   {showSuccess && (
        <div className="success-dialog px-4 py-4 w-[80%]" onClick={handleSuccessClose}>
          <div className="">
            <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.7324 14.0927L18.3918 27.1488C18.3918 27.1488 17.2101 28.7659 15.5428 27.0218C14.038 25.4484 9.87196 20.4801 9.87196 20.4801C9.87196 20.4801 8.92301 19.2739 10.3337 17.9409C11.5239 16.8163 12.4374 17.2737 12.7202 17.5559C13.1825 18.0172 16.1588 21.0185 16.1588 21.0185C16.1588 21.0185 16.5177 21.3776 17.0563 20.7877L26.1403 11.7076C26.1403 11.7076 27.2447 10.6806 28.4761 11.7838C29.7492 12.9239 28.7324 14.0927 28.7324 14.0927ZM19.3383 4.64921C26.6772 4.66163 32.814 10.2306 33.5367 17.5338C34.2593 24.8371 29.333 31.5008 22.1389 32.9513C14.9447 34.4018 7.82115 30.1677 5.6574 23.1549C3.49364 16.1422 6.99301 8.63042 13.7538 5.77518C15.5206 5.02796 17.42 4.64499 19.3383 4.64921ZM19.3383 0.233887C8.97404 0.233887 0.572144 8.63579 0.572144 19.0001C0.572144 29.3643 8.97404 37.7662 19.3383 37.7662C29.7026 37.7662 38.1045 29.3643 38.1045 19.0001C38.1045 8.63579 29.7026 0.233887 19.3383 0.233887Z" fill="#14AE5C" />
            </svg></div>
          <div className="">
            <p className="success-text ">Your note was saved <span className='font-bold'>successfully!</span></p>
          </div>
        </div>
      )}
                   </>
                )}
               {activeTab === 'downloads' && (
  <div className='ml-8 mt-8'>
    {pdfFiles.length > 0 ? (
      <div className="" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {pdfFiles.map((pdf, index) => (
          <div key={index} className="pdf-download-card bg-gray-100 " style={{ border: '1px solid #ccc', padding: '10px', width:'20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cc9808be90b75229a4e16ddfd08add63e361c7c7b1a717290534d0c6994e380?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Download" style={{ width: '50px', marginRight: '10px' }} />
            <p className='font-bold' style={{ flexGrow: 1, margin: 0 }}>{pdf.title}.pdf</p>
          </div>
          <a href={pdf.contenu} download style={{ color: '#ff4500', textDecoration: 'none' }}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4faab2725f48d9f4916c0f7ee7ae0f5ef3cb7fc2b0f639b4a878f05a2598abb?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Download icon" style={{ width: '24px', verticalAlign: 'middle' }} />
          </a>
        </div>
        
        ))}
      </div>
    ) : (
      <p>No PDFs available for download.</p>
    )}
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

export default ParcourirModules11;
