import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar'; 
import { getModules ,changeState} from '../services/UsersService';
import Side from '../components/sidebarcours';
import { AiOutlineLeft } from "react-icons/ai";

const ParcourirModules = () => {
 
  const [modules, setModules] = useState([]);
  const [selectedContenu, setSelectedContenu] = useState(null);
  const [selectedContenu2, setSelectedContenu2] = useState(null);
  const [activeTab, setActiveTab] = useState('notes');
  
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
  const checkContentType1 = (url) => {
    if (!url) {
      console.log("URL is null or undefined, defaulting to 'video'.");
      return 'yrl';  // Default to 'video' when the URL is not provided.
    }
    const extension = url.split('.').pop().toLowerCase();
    console.log(extension)
    const parties = extension.split("/");
    const dernierElement = parties[parties.length - 1];
    const mot_pdf = dernierElement.split("?")[0];
    console.log(mot_pdf)
    if (mot_pdf === 'pdf') {
      return 'pdf';
    } else {
      return 'video';
    }
  }
 const t = checkContentType("data:application/pdf;base64,JVBERi0xLjcKJeLjz9MKNSAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDIyNz4+c3RyZWFtCnicddC9TsMwEMDx3U9xbLAc/orPWUFkR7LYTT4kt2nTOi68LqvfAidQQEA9WvLP/7sju3PsthEgObiBidogV0CWo7XgOibBRcbRlEPwyq7v+5jCEFqfoOuhmeLOpzDtb9yGPTj2yI5nT5jFk1xjRUCaUOjFKwC030Y/FyeXi32Gt7+I1CuiJWoJxA2S+BFll6AubKMH/xy6cClCWIVFMiRQrg2H6RTBv0whQjvtDmNOGUYPw+VpPkOMQqrAKI5Ev0OeTj1u5n8a7McMGusaqlqdF9HkMbQhrR/OcPX18B2xXmmQCmVuZHN0cmVhbQplbmRvYmoKNCAwIG9iago8PC9Db250ZW50cyA1IDAgUi9NZWRpYUJveFswIDAgNTk1IDg0Ml0vUGFyZW50IDIgMCBSL1Jlc291cmNlczw8L0ZvbnQ8PC9GMSA2IDAgUj4+Pj4vVHJpbUJveFswIDAgNTk1IDg0Ml0vVHlwZS9QYWdlPj4KZW5kb2JqCjEgMCBvYmoKPDwvUGFnZXMgMiAwIFIvVHlwZS9DYXRhbG9nPj4KZW5kb2JqCjMgMCBvYmoKPDwvQ3JlYXRpb25EYXRlKEQ6MjAyNDA1MTUxMjAyMTMrMDEnMDAnKS9Nb2REYXRlKEQ6MjAyNDA1MTUxMjAyMTMrMDEnMDAnKS9Qcm9kdWNlcihpVGV4dK4gNy4xLjkgqTIwMDAtMjAxOSBpVGV4dCBHcm91cCBOViBcKEFHUEwtdmVyc2lvblwpKT4+CmVuZG9iago2IDAgb2JqCjw8L0Jhc2VGb250L0hlbHZldGljYS9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvU3VidHlwZS9UeXBlMS9UeXBlL0ZvbnQ+PgplbmRvYmoKMiAwIG9iago8PC9Db3VudCAxL0tpZHNbNCAwIFJdL1R5cGUvUGFnZXM+PgplbmRvYmoKeHJlZgowIDcKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwNDQyIDAwMDAwIG4gCjAwMDAwMDA3MzIgMDAwMDAgbiAKMDAwMDAwMDQ4NyAwMDAwMCBuIAowMDAwMDAwMzA5IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDY0NCAwMDAwMCBuIAp0cmFpbGVyCjw8L0lEIFs8MTQwYzc4ZmEzNDlkMDNhODAxZWYzNTA3M2FmZDIzY2Q+PDE0MGM3OGZhMzQ5ZDAzYTgwMWVmMzUwNzNhZmQyM2NkPl0vSW5mbyAzIDAgUi9Sb290IDEgMCBSL1NpemUgNz4+CiVpVGV4dC03LjEuOQpzdGFydHhyZWYKNzgzCiUlRU9GCg==")
 console.log("yyyyy"+t) 
 const handleClick = async (trainingId)=> {
    const fetch = await changeState(trainingId, selectedContenu2);
    window.location.reload();
    };
    if (modules === null || modules.length === 0) {
  return(
<div>loading..</div>
  );
}
else{
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
  <div className="bg-white  mb-2 " style={{height: '600px'}}>
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
<div className="relative ml-6 mt-8" style={{ width: '800px', height: '300px' }}>
<button className="bg-orange-500 text-black px-6 py-1.5 text-xs font-bold" onClick={() => handleClick(selectedContenu.id)}>Done</button>
</div>

</div>
)}

    </div>
    <div className="bg-white mt-8 " style={{height: '400px'}}>
                <div className="flex ml-8">
                  <button
                    className={`mr-8 focus:outline-none font-bold ${activeTab === 'notes' ? 'text-white-500 border-b-2 border-orange-500 font-bold' : ''}`}
                    onClick={() => handleTabChange('notes')}
                  >
                    Notes
                  </button>
                  
                  <button
                    className={`focus:outline-none font-bold ${activeTab === 'downloads' ? 'text-white-500 border-b-2 border-orange-500 font-bold' : ''}`}
                    onClick={() => handleTabChange('downloads')}
                  >
                    Downloads
                  </button>
                </div>
                {activeTab === 'notes' && (
                  <div className='ml-14 bg-gray-100 mr-8 mt-6 rounded-md'>
                  <div className="font-bold ml-12 mt-2 py-2"> Notes</div>
                   <textarea
         onChange={(e) => console.log(e.target.value)}
         
         className="textarea-lined ml-12 mr-12 mt-2"
       />
                 </div>
                )}
                {activeTab === 'downloads' && (
                  <div className='ml-8 mt-8'>
                    {/* Render downloads content here */}
                    <p></p>
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
}

export default ParcourirModules;
