import React from "react";
import "../App.css";
import {getCertificatsFinish,getCertificatsCurrent, downloadCertificat} from '../services/UsersService';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; // Importez useNavigate





const Certificats = () => {
  const [certificats, setCetificats] = useState([]);
  const [certificats1, setCetificats1] = useState([]);
  const navigate = useNavigate(); // Utilisez le hook useNavigate
  const handleselectButtonClick = (trainingId) => {
    localStorage.setItem('selectedTrainingId', trainingId);
        
        // Rediriger vers une nouvelle page
        navigate('/modules');
  };
  
  const handleDownloadButtonClick = async (certifId) => {
    try {
        await downloadCertificat(certifId);
    } catch (error) {
        console.error("Error downloading the certificate:", error);
    }
};

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const fetched1 = await getCertificatsCurrent();

        // Assurez-vous que `fetched` est bien un tableau avant de continuer.
        const certificats1 = fetched1.map(certif => ({
            id: certif.id,
            imageData: certif.pdfData ? `data:image/png;base64,${certif.pdfData.data}` : null, // Encode l'image en Base64
            formationTitle: certif.formation ? certif.formation.title : 'Titre non disponible', // Vérifiez l'existence de l'objet formation
            formationId: certif.formation ? certif.formation.id : 'id non disponible',
            progress: certif.progress? certif.progress : 0,
        }));
        
        setCetificats1(certificats1 || []);
          const fetched = await getCertificatsFinish();

          // Assurez-vous que `fetched` est bien un tableau avant de continuer.
          const certificats = fetched.map(certif => ({
              id: certif.id,
              imageData: certif.pdfData ? `data:image/png;base64,${certif.pdfData.data}` : null, // Encode l'image en Base64
              formationTitle: certif.formation ? certif.formation.title : 'Titre non disponible', // Vérifiez l'existence de l'objet formation
          }));
          
          setCetificats(certificats || []);
console.log(certificats)

      } catch (err) {
        console.error("An error occurred while fetching courses:", err);
      }
    };
    fetchData2();
 
  }, []);
 
  
    return (
      <section className="py-4 overflow-hidden bg-gray-200">
      <div className="container px-4 mx-auto">
        <div className="bg-white p-6 mb-4 w-full max-w-[10000px] mt-2">
          <div className="flex flex-wrap items-center justify-between mb-10 -m-2">
            <div className="w-auto p-2">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Certificats</h2>
            </div>
          </div>
          <div className="flex flex-wrap -m-2 ">
            


          {certificats.map((training, i) => (
                         <div  key={i} className="w-full sm:w-1/3 p-3 -mt-12 ">
                <a className="inline-block h-full bg-white border overflow-hidden rounded-xl" href="#">
                  <div className="flex flex-col justify-center shadow-lg max-w-[500px]">
                  <div className="flex flex-col justify-center w-full">
                  <img src={training.imageData} alt={`Certificat de ${training.formationTitle}`} className="w-full aspect-[1.79]" loading="lazy" />
                    </div>
                   </div>
                   <div class="flex bg-center gap-5 text-base tracking-normal leading-4 text-center text-black">
                       <img className="ml-4" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cc9808be90b75229a4e16ddfd08add63e361c7c7b1a717290534d0c6994e380?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="PDF file icon" class="shrink-0 aspect-[0.88] fill-red-500 w-[39px]" />
                       <div class="mt-6 text-sm tracking-normal leading-6 text-black-500">
                         <p class="font-bold">
                         {training.formationTitle}<span class="font-bold">.pdf</span>
                         </p>
                         <button class="mt-2 flex items-center justify-center px-1 py-1.5 bg-white-500 text-black font-bold text-sm rounded-md"  onClick={() => handleDownloadButtonClick(training.id)}>
                          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4faab2725f48d9f4916c0f7ee7ae0f5ef3cb7fc2b0f639b4a878f05a2598abb?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Download icon" class="mr-2 w-4 aspect-[0.94] fill-black" />
                        </button>
                         </div>
                       </div>
                         </a>  
                         </div>
  ))}




          </div>
        </div>
        
        {/* Finished Trainings Section */}
        <div className="bg-white p-6 w-full-screen max-w-[10000px]">
          <div className="flex flex-wrap items-center justify-between mb-10 -m-2">
            <div className="w-auto p-2">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Certificats in progress</h2>
            </div>
          </div>
          <div className="flex flex-wrap">
          


<div className="relative w-full sm:w-1/3 p-3 mt-3 sm:mt-0 sm:ml-2 ">
{certificats1.map((training1, i) => (
          <>
    <div key={i} className="flex flex-col px-7 max-w-[500px] mt-32 ">
      <h3 className="inline-block w-12 text-xs  font-bold tracking-normal leading-4 text-black -ml-4">{training1.progress}%</h3>
      <div className="flex flex-col -mt-1 w-full bg-white">
        
       
          <div className="w-24 min-h-[8px] bg-orange-500 mt-2 -ml-4" style={{ width: `${training1.progress}%` }} role="progressbar" aria-valuemin="0" aria-valuemax="100"/>
          <div className=" flex flex-col justify-center mt-12 w-full text-xs font-bold tracking-normal leading-3 text-center text-black whitespace-nowrap h-6">
            <button onClick={() => handleselectButtonClick(training1.formationId)}>
              <div className="flex flex-initial justify-center w-11 h-4 bg-orange-500 -ml-4" role="status">Access</div>
            </button>
            <div className="flex flex-col max-w-[10000px] mt-24">
              <div className="absolute inset-0 bg-flux opacity-30 rounded-xl z-10 pointer-events-none -mt-8">

               
                         <div   className="relative inline-block h-full bg-white border overflow-hidden rounded-xl z-20 transition-none">
                  <div className="flex flex-col justify-center shadow-lg max-w-[500px]">
                    <div className="flex flex-col justify-center h-full ">
                    <img src={training1.imageData} alt={`Certificat de ${training1.formationTitle}`} className="w-full aspect-[1.79]" loading="lazy" />
                    </div>
                  </div>
                  <div className="flex gap-5 text-base tracking-normal leading-4 text-center text-black">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cc9808be90b75229a4e16ddfd08add63e361c7c7b1a717290534d0c6994e380?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="PDF file icon" className="shrink-0 aspect-[0.88] w-[39px]" />
                    <div className="mt-6 text-sm tracking-normal leading-6 text-black-500">
                      <p>
                      {training1.formationTitle}<span className="font-bold">.pdf</span>
                      </p>
                      <button class="mt-3 flex items-center justify-center px-3 py-1.5 bg-white-500 text-black font-bold text-sm rounded-md">
                          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4faab2725f48d9f4916c0f7ee7ae0f5ef3cb7fc2b0f639b4a878f05a2598abb?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Download icon" class="mr-2 w-4 aspect-[0.94] fill-black" />
                      </button>
                    </div>
                  </div>
                </div>



              </div>  
            </div>
          </div>
           
      </div>
    </div>
    </> ))}
   

</div>



          </div>
        </div>
      </div>
    </section>
        
      );
      

};

export default Certificats;