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
  <div className="bg-white  mb-2 " style={{height: '600px'}}>
  {selectedContenu && (
<div className="ml-8">
  
    <div className="flex flex-row font-bold py-4 ml-6" style={{ width: '80px', height: '30px' }}><p className='py-2 '><AiOutlineLeft /></p><span className='px-4'>{selectedContenu.title}</span></div>
    <div className="relative ml-6 mt-8" style={{ width: '800px', height: '400px' }}>
    {selectedContenu && (
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

export default ParcourirModules;
