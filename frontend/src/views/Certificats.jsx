import React from "react";
import "../App.css";
import { useState, useEffect } from 'react';





const Certificats = ({ percentage }) => {
  const [progress, setProgress] = useState(100);
  const [showImage, setShowImage] = useState(false);

  const handleAccessButtonClick = (event, type) => {
    if (type === "first") {
      if (progress !== 100) {
        console.log("Veuillez finir les modules");
        event.stopPropagation();
        event.preventDefault();
      } else {
        setShowImage(true);
      }
    } else if (type === "second") {
      console.log("Action différente pour le deuxième bouton d'accès");
    }
  };
  
  const handleDownloadButtonClick = (event) => {
    event.stopPropagation();
    console.log("Téléchargement du certificat...");
    event.preventDefault();
  };



    return (
      <section className="py-4 overflow-hidden bg-gray-200">
      <div className="container px-4 mx-auto">
        <div className="bg-white p-6 mb-4 w-full max-w-[10000px] mt-2">
          <div className="flex flex-wrap items-center justify-between mb-10 -m-2">
            <div className="w-auto p-2">
              <h2 className="font-heading text-3xl font-semibold">Certificats</h2>
            </div>
          </div>
          <div className="flex flex-wrap -m-2">
          <div className="w-full sm:w-1/3 p-3 -mt-2">
                <a className="inline-block h-full bg-white border overflow-hidden rounded-xl" href="#">
                  <div className="flex flex-col justify-center shadow-lg max-w-[500px]">
                  <div className="flex flex-col justify-center w-full">
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/13bba356aed63deb17574a2c85420e4f8f689d55d98909029e70991c784d47ae?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Relevant alt text describing the image" className="w-full aspect-[1.79]" loading="lazy" /> 
                    </div>
                   </div>
                   <div class="flex gap-5 text-base tracking-normal leading-4 text-center text-black">
                       <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cc9808be90b75229a4e16ddfd08add63e361c7c7b1a717290534d0c6994e380?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="PDF file icon" class="shrink-0 aspect-[0.88] fill-red-500 w-[39px]" />
                       <div class="mt-6 text-sm tracking-normal leading-6 text-black-500">
                         <p>
                           UX/UI Design Certificat<span class="font-bold">.pdf</span>
                         </p>
                         <button class="mt-3 flex items-center justify-center px-3 py-1.5 bg-white-500 text-black font-bold text-sm rounded-md">
                          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4faab2725f48d9f4916c0f7ee7ae0f5ef3cb7fc2b0f639b4a878f05a2598abb?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Download icon" class="mr-2 w-4 aspect-[0.94] fill-black" />
                        </button>
                       </div>
                       </div>
                         </a>  
                         </div>

                         <div className="w-full sm:w-1/3 p-3 -mt-2">
                <a className="inline-block h-full bg-white border overflow-hidden rounded-xl" href="#">
                  <div className="flex flex-col justify-center shadow-lg max-w-[500px]">
                  <div className="flex flex-col justify-center w-full">
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/13bba356aed63deb17574a2c85420e4f8f689d55d98909029e70991c784d47ae?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Relevant alt text describing the image" className="w-full aspect-[1.79]" loading="lazy" /> 
                    </div>
                   </div>
                   <div class="flex gap-5 text-base tracking-normal leading-4 text-center text-black">
                       <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cc9808be90b75229a4e16ddfd08add63e361c7c7b1a717290534d0c6994e380?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="PDF file icon" class="shrink-0 aspect-[0.88] fill-red-500 w-[39px]" />
                       <div class="mt-6 text-sm tracking-normal leading-6 text-black-500">
                         <p>
                           UX/UI Design Certificat<span class="font-bold">.pdf</span>
                         </p>
                         <button class="mt-3 flex items-center justify-center px-3 py-1.5 bg-white-500 text-black font-bold text-sm rounded-md">
                          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4faab2725f48d9f4916c0f7ee7ae0f5ef3cb7fc2b0f639b4a878f05a2598abb?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Download icon" class="mr-2 w-4 aspect-[0.94] fill-black" />
                        </button>

                       </div>
                       </div>
                         </a>  
                         </div>
                         <div className="w-full sm:w-1/3 p-3 -mt-2">
                <a className="inline-block h-full bg-white border overflow-hidden rounded-xl" href="#">
                  <div className="flex flex-col justify-center shadow-lg max-w-[500px]">
                  <div className="flex flex-col justify-center w-full">
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/13bba356aed63deb17574a2c85420e4f8f689d55d98909029e70991c784d47ae?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Relevant alt text describing the image" className="w-full aspect-[1.79]" loading="lazy" /> 
                    </div>
                   </div>
                   <div class="flex bg-center gap-5 text-base tracking-normal leading-4 text-center text-black">
                       <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cc9808be90b75229a4e16ddfd08add63e361c7c7b1a717290534d0c6994e380?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="PDF file icon" class="shrink-0 aspect-[0.88] fill-red-500 w-[39px]" />
                       <div class="mt-6 text-sm tracking-normal leading-6 text-black-500">
                         <p>
                           UX/UI Design Certificat<span class="font-bold">.pdf</span>
                         </p>
                         <button class="mt-2 flex items-center justify-center px-1 py-1.5 bg-white-500 text-black font-bold text-sm rounded-md">
                          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4faab2725f48d9f4916c0f7ee7ae0f5ef3cb7fc2b0f639b4a878f05a2598abb?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Download icon" class="mr-2 w-4 aspect-[0.94] fill-black" />
                        </button>
                         </div>
                       </div>
                         </a>  
                         </div>
          </div>
        </div>
        
        {/* Finished Trainings Section */}
        <div className="bg-white p-6 w-full-screen max-w-[10000px]">
          <div className="flex flex-wrap items-center justify-between mb-10 -m-2">
            <div className="w-auto p-2">
              <h2 className="font-heading text-3xl font-semibold">Certificats in progress</h2>
            </div>
          </div>
          <div className="flex flex-wrap">
          


<div className="relative w-full sm:w-1/3 p-3 mt-3 sm:mt-0 sm:ml-2">
  {progress !== 100 || !showImage ? (
    <div className="flex flex-col px-7 max-w-[500px] mt-32">
      <h3 className="inline-block w-12 text-xs  font-bold tracking-normal leading-4 text-black">{progress}%</h3>
      <div className="flex flex-col -mt-1 w-full bg-white">
        <div className="w-24 min-h-[8px] bg-orange-500 mt-2" style={{ width: `${progress}%` }} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
        {(progress >= 0 && progress < 100) && (
          <div className="flex flex-col max-w-[500px] mt-24">
            <div className="absolute inset-0 bg-flux opacity-30 rounded-xl z-1 pointer-events-none">
              <div className="relative inline-block h-full bg-gray border overflow-hidden rounded-xl z-2 transition-none">
                <div className="flex flex-col justify-center shadow-lg max-w-[500px]">
                  <div className="flex flex-col justify-center w-full">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/13bba356aed63deb17574a2c85420e4f8f689d55d98909029e70991c784d47ae?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Relevant alt text describing the image" className="w-full h-full aspect-[1.79]" loading="lazy" />
                  </div>
                </div>
                <div className="flex gap-5 text-base tracking-normal leading-4 text-center text-black">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cc9808be90b75229a4e16ddfd08add63e361c7c7b1a717290534d0c6994e380?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="PDF file icon" className="shrink-0 aspect-[0.88] w-[39px]" />
                  <div className="mt-6 text-sm tracking-normal leading-6 text-black-500">
                    <p>
                      UX/UI Design Certificate<span className="font-bold">.pdf</span>
                    </p>
                    <button onClick={handleDownloadButtonClick}> 
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4faab2725f48d9f4916c0f7ee7ae0f5ef3cb7fc2b0f639b4a878f05a2598abb?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Download icon" className="mt-3 w-4 fill-black" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {progress === 100 && (
          <div className="flex flex-col justify-center mt-12 w-full text-xs font-bold tracking-normal leading-3 text-center text-black whitespace-nowrap h-6">
            <button onClick={(event) => handleAccessButtonClick(event, "first")}>
              <div className="flex flex-initial justify-center w-11 h-4 bg-orange-500" role="status">Access</div>
            </button>
            <div className="flex flex-col max-w-[10000px] mt-24">
              <div className="absolute inset-0 bg-flux opacity-30 rounded-xl z-10 pointer-events-none -mt-8">
                <div className="relative inline-block h-full bg-white border overflow-hidden rounded-xl z-20 transition-none">
                  <div className="flex flex-col justify-center shadow-lg max-w-[500px]">
                    <div className="flex flex-col justify-center h-full">
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/13bba356aed63deb17574a2c85420e4f8f689d55d98909029e70991c784d47ae?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Relevant alt text describing the image" className="w-full h-full aspect-[1.79]" loading="lazy" />
                    </div>
                  </div>
                  <div className="flex gap-5 text-base tracking-normal leading-4 text-center text-black">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cc9808be90b75229a4e16ddfd08add63e361c7c7b1a717290534d0c6994e380?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="PDF file icon" className="shrink-0 aspect-[0.88] w-[39px]" />
                    <div className="mt-6 text-sm tracking-normal leading-6 text-black-500">
                      <p>
                        UX/UI Design Certificate<span className="font-bold">.pdf</span>
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
        )}
      </div>
    </div>
  ) : ( 
    <div className="flex flex-col max-w-[10000px] mt-24">
      <div className="relative flex flex-col h-auto w-300 -mt-32">
        <button onClick={(event) => handleAccessButtonClick(event, "second")}>
         <div className="flex flex-col max-w-[10000px] mt-24">
  
                <div className="relative inline-block h-full bg-white border overflow-hidden rounded-xl z-2 transition-none -mt-24">
                  <div className="flex flex-col justify-center shadow-lg max-w-[500px]">
                    <div className="flex flex-col justify-center w-full">
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/13bba356aed63deb17574a2c85420e4f8f689d55d98909029e70991c784d47ae?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Relevant alt text describing the image" className="w-full h-full aspect-[1.79]" loading="lazy" />
                    </div>
                  </div>
                  <div className="flex gap-5 text-base tracking-normal leading-4 text-center text-black">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cc9808be90b75229a4e16ddfd08add63e361c7c7b1a717290534d0c6994e380?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="PDF file icon" className="shrink-0 aspect-[0.88] w-[39px]" />
                    <div className="mt-6 text-sm tracking-normal leading-6 text-black-500">
                      <p>
                        UX/UI Design Certificate<span className="font-bold">.pdf</span>
                      </p>
                      <button class="mt-3 flex items-center justify-center px-3 py-1.5 bg-white-500 text-black font-bold text-sm rounded-md">
                          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4faab2725f48d9f4916c0f7ee7ae0f5ef3cb7fc2b0f639b4a878f05a2598abb?apiKey=a39938f6ec5e4acebececfa422789e63&" alt="Download icon" class="mr-2 w-4 aspect-[0.94] fill-black" />
                        </button>
                    </div>
                  </div>
                </div>
              </div>  
            
        </button>
      </div>
    </div>
  )}
</div>



          </div>
        </div>
      </div>
    </section>
        
      );
      

};

export default Certificats;