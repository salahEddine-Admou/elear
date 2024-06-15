import {jwtDecode} from 'jwt-decode';

export const getUsers = async () => {
    const api = "http://localhost:8080/users";
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'GET', // Méthode HTTP
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Type de contenu (facultatif, mais recommandé)
            }
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            const data = await response.json(); // Parse la réponse en JSON
            return data; 
            console.log('Successful:', data);
        } else {
            console.error('HTTP-Error:', response.status);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
export const deleteUser = async (userId) => {
    // Supposons que l'API nécessite l'ID de l'utilisateur dans l'URL
    const api = `http://localhost:8080/users/delete/${userId}`;
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'DELETE', // Méthode HTTP
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Type de contenu (facultatif, mais recommandé)
            }
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            // Succès de la suppression
            console.log('User deleted successfully');
            return { status: 'success', message: 'User deleted successfully' };
        } else {
            // Gestion des réponses non réussies
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
}
export const deleteSelectedUsers = async (userIds) => {
    const api = `http://localhost:8080/users/delete/${userIds}`; // API URL
    const token = localStorage.getItem("userToken");
    
    try {
        const response = await fetch(api, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ userIds }) // Sending the user IDs in the body
        });

        if (response.ok) {
            // Succès de la suppression
            console.log('User deleted successfully');
            return { status: 'success', message: 'User deleted successfully' };
        } else {
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
};

export const addUser = async (user) => {
    // Supposons que l'URL de l'API pour ajouter un utilisateur est légèrement différente
    const api = `http://localhost:8080/users/add`;
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'POST', // Méthode HTTP pour ajouter des données
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Spécifier le type de contenu des données envoyées
            },
            body: JSON.stringify(user) // Convertit l'objet utilisateur en chaîne JSON pour l'envoi
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            // Succès de l'ajout
            console.log('User added successfully');
            const data = await response.json(); // Optionnel, dépend de si vous avez besoin de la réponse
            return { status: 'success', message: 'User added successfully', data };
        } else {
            // Gestion des réponses non réussies
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
}
export const getUserPhotofromtoken = () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
        try {
          const decodedToken = jwtDecode(userToken);
          return decodedToken.profilePicture || 'User';
        } catch (error) {
          console.error("Failed to decode token", error);
          return 'User';
        }
      }
    
      return 'User';
  };
export const getUserFromToken = () => {
    const userToken = localStorage.getItem('userToken');
  
    if (userToken) {
      try {
        const decodedToken = jwtDecode(userToken);
        return decodedToken.fullName || 'User';
      } catch (error) {
        console.error("Failed to decode token", error);
        return 'User';
      }
    }
  
    return 'User';
};
export const updateUser = async (userId, userData) => {
    const api = `http://localhost:8080/users/update/${userId}`; // Incluez l'ID de l'utilisateur dans l'URL
    const token = localStorage.getItem("userToken");

    try {
        const response = await fetch(api, {
            method: 'PUT', // Utilisez 'PUT' ou 'PATCH' selon les besoins de votre API
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) // userData contient les informations mises à jour de l'utilisateur
        });

        if (response.ok) {
            console.log('User updated successfully');
            const data = await response.json(); // Récupérez la réponse de l'API si nécessaire
            return { status: 'success', message: 'User updated successfully', data };
        } else {
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
}


export const logout = async () => {
    const api = `http://localhost:8080/logOut`; // L'URL pour se déconnecter

    try {
        const token = localStorage.getItem("userToken");
        const response = await fetch(api, {
            method: 'GET', // Utilisez 'GET' pour les demandes de déconnexion
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log('Logout successful');
            return { status: 'success', message: 'Logout successful'};
        } else {
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
}
export const updateFormation = async (id,dataa) => {
    // const id = localStorage.getItem("userId");
    const api = `http://localhost:8080/formations/${id}`;
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'PUT', // Méthode HTTP pour mettre à jour des données
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Spécifier le type de contenu des données envoyées
            },
             body: JSON.stringify(dataa) // Convertit l'objet formation en chaîne JSON pour l'envoi
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            const data = await response.json(); // Convertit la réponse JSON en objet JavaScript
            console.log('Formation updated successfully');
            
            return { status: 'success', message: 'formation updated successfully', data: data };

        }     
                // Succès de la mise à jour

           
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error fetching dataa:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
};


export const getFormationsCurrent = async () => {
    const id = localStorage.getItem("userId");
    const api = `http://localhost:8080/formations/getFormations/current/${id}`;
    const token = localStorage.getItem("userToken");
    
    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data
        console.log(data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};
export const getFormation = async (id) => {
  //  const id = localStorage.getItem("userId");
    const api = `http://localhost:8080/formations/getById/${id}`;
    const token = localStorage.getItem("userToken");
    
    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data
        console.log(data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};
export const getFormationsFinish = async () => {
    const id = localStorage.getItem("userId");
    const api = `http://localhost:8080/formations/getFormations/finish/${id}`;
    const token = localStorage.getItem("userToken");

    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data
        console.log(data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};
export const getFormationsMore = async () => {
    const id = localStorage.getItem("userId");
    const api = `http://localhost:8080/formations/getFormations/more/${id}`;
    const token = localStorage.getItem("userToken");

    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data
        console.log(data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};
export const getFormationsMoreAdmin = async () => {
    const api = `http://localhost:8080/formations/getFormationsAdmin/more`;
    const token = localStorage.getItem("userToken");

    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data
        console.log(data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};

export const getModules= async () => {
    const userId = localStorage.getItem("userId");
    const FormationId = localStorage.getItem("selectedTrainingId");
    const api = `http://localhost:8080/formations/getModules/${FormationId}/${userId}`;
    const token = localStorage.getItem("userToken");
    
    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data

        console.log("moiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"+data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};
export const getModulesAdmin= async () => {
   
    const FormationId = localStorage.getItem("selectedTrainingId");
    const api = `http://localhost:8080/formations/getModulesAdmin/${FormationId}`;
    const token = localStorage.getItem("userToken");
    
    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data
        console.log(data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};





export const getState= async (moduleId,SubId) => {
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");
    const FormationId = localStorage.getItem("selectedTrainingId");
    const api = `http://localhost:8080/formations/getState/${FormationId}/${userId}/${moduleId}/${SubId}`;
// const token = localStorage.getItem("userToken");
    
    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data
        console.log(data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};
export const changeState= async (SubId, mod) => {
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");
    const FormationId = localStorage.getItem("selectedTrainingId");
    const api = `http://localhost:8080/formations/changeState/${FormationId}/${userId}/${mod}/${SubId}`;
// const token = localStorage.getItem("userToken");
    
    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data
        console.log(data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};


export const getUserById = async (userId) => {
    const api = `http://localhost:8080/users/user/${userId}`;
    const token = localStorage.getItem("userToken");


    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {


            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data
        console.log(data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};
export const getCertificatsFinish= async () => {
    const userId = localStorage.getItem("userId");
    const FormationId = localStorage.getItem("selectedTrainingId");
    const api = `http://localhost:8080/formations/getCertificatsFinish/${userId}`;
    const token = localStorage.getItem("userToken");
    
    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data
        console.log(data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};
export const downloadCertificat = async (certifId) => {  // Make sure to pass certifId as a parameter
    const api = `http://localhost:8080/formations/download/${certifId}`;
    const token = localStorage.getItem("userToken");
    
    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        // Handle response as a Blob
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `${certifId}.png`;  // or ".pdf" or another format as needed
        document.body.appendChild(a);
        a.click();
        a.remove();  // Clean up
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error;
    }
};
export const getCertificatsCurrent= async () => {
    const userId = localStorage.getItem("userId");
    const FormationId = localStorage.getItem("selectedTrainingId");
    const api = `http://localhost:8080/formations/getCertificatsCurrent/${userId}`;
    const token = localStorage.getItem("userToken");
    
    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data
        console.log(data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};
export const addFormation = async (formation) => {
    // Supposons que l'URL de l'API pour ajouter un utilisateur est légèrement différente
    const api = `http://localhost:8080/formations/add`;
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'POST', // Méthode HTTP pour ajouter des données
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Spécifier le type de contenu des données envoyées
            },
            body: JSON.stringify(formation) // Convertit l'objet utilisateur en chaîne JSON pour l'envoi
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            // Succès de l'ajout
            console.log('User added successfully');
            const data = await response.json(); // Optionnel, dépend de si vous avez besoin de la réponse
            return { status: 'success', message: 'User added successfully', data };
        } else {
            // Gestion des réponses non réussies
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
};

export const deleteFormation = async (formationId) => {
    const api = `http://localhost:8080/formations/${formationId}`;
    const token = localStorage.getItem("userToken");

    // Vérifiez si le token est présent dans le localStorage
    if (!token) {
        console.error("Token not found in localStorage");
        return { status: 'error', message: 'Token not found' };
    }

    try {
        // Effectuez la requête DELETE
        const response = await fetch(api, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // Vérifiez si la réponse est correcte
        if (response.ok) {
            console.log('Formation deleted successfully');
            return { status: 'success', message: 'Formation deleted successfully' };
        } else {
            console.error('HTTP-Error:', response.status, response.statusText);
            return { status: 'error', message: `HTTP-Error: ${response.status} ${response.statusText}` };
        }
    } catch (error) {
        // Gérer les erreurs de récupération
        console.error("Error fetching data:", error.message);
        return { status: 'error', message: `Error fetching data: ${error.message}` };
    }
};




export const addModule= async (module) => {
    const idf = localStorage.getItem("selectedTrainingId");
    // Supposons que l'URL de l'API pour ajouter un utilisateur est légèrement différente
    const api = `http://localhost:8080/formations/addModule/${idf}`;
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'POST', // Méthode HTTP pour ajouter des données
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Spécifier le type de contenu des données envoyées
            },
            body: JSON.stringify(module) // Convertit l'objet utilisateur en chaîne JSON pour l'envoi
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            // Succès de l'ajout
            const responseData = await response.json(); // Read the JSON response once
            console.log(responseData); // Log the parsed JSON response
           // console.log('Module added successfully');
            return { status: 'success', message: 'Module added successfully', data: responseData };
        } else {
            // Gestion des réponses non réussies
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
}
export const addSubmodule= async (sub, id) => {
    const idf = localStorage.getItem("selectedTrainingId");
    console.log(idf);
    // Supposons que l'URL de l'API pour ajouter un utilisateur est légèrement différente
    const api = `http://localhost:8080/formations/addSubmodule/${idf}/${id}`;
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'POST', // Méthode HTTP pour ajouter des données
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Spécifier le type de contenu des données envoyées
            },
            body: JSON.stringify(sub) // Convertit l'objet utilisateur en chaîne JSON pour l'envoi
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            // Succès de l'ajout
            const responseData = await response.json(); // Read the JSON response once
            console.log(responseData); 
           // Optionnel, dépend de si vous avez besoin de la réponse
            return { status: 'success', message: 'Submodule added successfully', data : responseData };
        } else {
            // Gestion des réponses non réussies
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
};
export const deleteModule = async (moduleId) => {
    const idf = localStorage.getItem("selectedTrainingId");
    // Supposons que l'API nécessite l'ID de l'utilisateur dans l'URL
    const api = `http://localhost:8080/formations/DeleteModule/${moduleId}/${idf}`;
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'DELETE', // Méthode HTTP
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Type de contenu (facultatif, mais recommandé)
            }
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            // Succès de la suppression
            console.log('module deleted successfully');
            return { status: 'success', message: 'module deleted successfully' };
        } else {
            // Gestion des réponses non réussies
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
};
export const deleteInscr = async () => {
    const idf = localStorage.getItem("selectedTrainingId");
    const idU = localStorage.getItem("userId");
    // Supposons que l'API nécessite l'ID de l'utilisateur dans l'URL
    const api = `http://localhost:8080/formations/DeleteInscription/${idf}/${idU}`;
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'DELETE', // Méthode HTTP
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Type de contenu (facultatif, mais recommandé)
            }
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            // Succès de la suppression
            console.log(' deleted successfully');
            return { status: 'success', message: 'deleted successfully' };
        } else {
            // Gestion des réponses non réussies
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
};
export const deleteSubmodule = async (subid, moduleId) => {
    // Supposons que l'API nécessite l'ID de l'utilisateur dans l'URL
    const api = `http://localhost:8080/formations/DeleteSubModule/${moduleId}/${subid}`;
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'DELETE', // Méthode HTTP
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Type de contenu (facultatif, mais recommandé)
            }
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            // Succès de la suppression
            const responseData = await response.json();
            console.log('submodule deleted successfully');
            return { status: 'success', message: 'submodule deleted successfully' , data: responseData};
        } else {
            // Gestion des réponses non réussies
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
};
export const updateModule = async (Id, module) => {
    const api = `http://localhost:8080/formations/UpdateModule/${Id}`; // Incluez l'ID de l'utilisateur dans l'URL
    const token = localStorage.getItem("userToken");

    try {
        const response = await fetch(api, {
            method: 'PUT', // Utilisez 'PUT' ou 'PATCH' selon les besoins de votre API
            headers: {
                'Authorization': ` Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(module) // userData contient les informations mises à jour de l'utilisateur
        });

        if (response.ok) {
            console.log('Module updated successfully');
            const data = await response.json(); // Récupérez la réponse de l'API si nécessaire
            console.log(data);
            return { status: 'success', message: 'Module updated successfully', data };
        } else {
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
};
export const updateSubModule = async (Id, sub) => {
    console.log(sub)
    const api = `http://localhost:8080/formations/UpdateSubModule/${Id}`; // Incluez l'ID de l'utilisateur dans l'URL
    const token = localStorage.getItem("userToken");

    try {
        const response = await fetch(api, {
            method: 'PUT', // Utilisez 'PUT' ou 'PATCH' selon les besoins de votre API
            headers: {
                'Authorization': ` Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sub) // userData contient les informations mises à jour de l'utilisateur
        });

        if (response.ok) {
            console.log('subModule updated successfully');
            const data = await response.json(); // Récupérez la réponse de l'API si nécessaire
            console.log(data);
            return { status: 'success', message: 'subModule updated successfully', data };
        } else {
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
}
export const inscription = async (nameFormation) => {
    const id = localStorage.getItem("userId");

    // Supposons que l'URL de l'API pour ajouter un utilisateur est légèrement différente
    const api = `http://localhost:8080/formations/${nameFormation}/enroll?id=${id}`;
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'POST', // Méthode HTTP pour ajouter des données
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Spécifier le type de contenu des données envoyées
            },
           // body: JSON.stringify(formation) // Convertit l'objet utilisateur en chaîne JSON pour l'envoi
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            // Succès de l'ajout
            
            const data = await response.json(); // Optionnel, dépend de si vous avez besoin de la réponse
            return { status: 'success', message: 'successfully', data : data};
        } else {
            // Gestion des réponses non réussies
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
};
export const addNote = async (note) => {
    console.log("hello"+note)
    const FormationId = localStorage.getItem("selectedTrainingId");
    const id = localStorage.getItem("userId");
    // Supposons que l'URL de l'API pour ajouter un utilisateur est légèrement différente
    const api = `http://localhost:8080/formations/addNote/${id}/${FormationId}`;
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'POST', // Méthode HTTP pour ajouter des données
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Spécifier le type de contenu des données envoyées
            },
            body: JSON.stringify(note) // Convertit l'objet utilisateur en chaîne JSON pour l'envoi
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            // Succès de l'ajout
            console.log('Note added successfully');
          //  const data = await response.json(); // Optionnel, dépend de si vous avez besoin de la réponse
            return { status: 'success', message: 'Note added successfully' };
        } else {
            // Gestion des réponses non réussies
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
};
export const getNotes= async () => {
    const userId = localStorage.getItem("userId");
    const FormationId = localStorage.getItem("selectedTrainingId");
    const api = `http://localhost:8080/formations/getNotes/${FormationId}/${userId}`;
    const token = localStorage.getItem("userToken");
    
    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.text(); // Assuming the server responds with JSON-formatted data
        console.log("yamina abidi"+data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};
export const getTest = async () => {
    const TrainingId = localStorage.getItem("selectedTrainingId");
    const api = `http://localhost:8080/formations/getTest/${TrainingId}`;
    const token = localStorage.getItem("userToken");


    if (!token) {
        console.error("Authorization token is missing.");
        throw new Error("Authorization token is not available.");
    }

    try {
        const response = await fetch(api, {


            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log("succ");

        if (!response.ok) {
            // If the HTTP status code is not in the 200-299 range,
            // we throw an error with the status and statusText
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Assuming the server responds with JSON-formatted data
        console.log(data);
        return data;  // Return the data to be used by the calling component
        
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    }
};
export const setEndFormation = async (score) => {
    const FormationId = localStorage.getItem("selectedTrainingId");
    const id = localStorage.getItem("userId");
    // Supposons que l'URL de l'API pour ajouter un utilisateur est légèrement différente
    const api = `http://localhost:8080/formations/setEndFormation/${FormationId}/${id}/${score}`;
    const token = localStorage.getItem("userToken");
    console.log(token);
    try {
        const response = await fetch(api, {
            method: 'POST', // Méthode HTTP pour ajouter des données
            headers: {
                'Authorization': `Bearer ${token}`, // En-tête d'autorisation avec le token
                'Content-Type': 'application/json' // Spécifier le type de contenu des données envoyées
            },
            //body: JSON.stringify(note) // Convertit l'objet utilisateur en chaîne JSON pour l'envoi
        });

        if (response.ok) { // Vérifie si le statut de la réponse est 2xx
            // Succès de l'ajout
            console.log('End added successfully');
          //  const data = await response.json(); // Optionnel, dépend de si vous avez besoin de la réponse
            return { status: 'success', message: 'End added successfully' };
        } else {
            // Gestion des réponses non réussies
            console.error('HTTP-Error:', response.status);
            return { status: 'error', message: `HTTP-Error: ${response.status}` };
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error fetching data:", error);
        return { status: 'error', message: `Error fetching data: ${error}` };
    }
};