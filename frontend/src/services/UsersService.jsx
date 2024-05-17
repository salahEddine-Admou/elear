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
export const addUser = async (user) => {
    // Supposons que l'URL de l'API pour ajouter un utilisateur est légèrement différente
    const api = `http://localhost:8080/users/add2`;
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

export const updateUser = async (userId, userData) => {
    const api = `http://localhost:8080/users/update/${userId}`; // Incluez l'ID de l'utilisateur dans l'URL
    const token = localStorage.getItem("userToken");

    try {
        const response = await fetch(api, {
            method: 'PUT', // Utilisez 'PUT' ou 'PATCH' selon les besoins de votre API
            headers: {
                'Authorization': ` Bearer ${token}`,
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
    const api = `http://localhost:8080/formations/getFormations/more`;
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



// export const getModules= async () => {
   
//     const api = `http://localhost:8080/formations/getModules/6630c6bccee79c13c73bcef9/6618051285577e0285bcf04f`;
//     const token = localStorage.getItem("userToken");
    
//     if (!token) {
//         console.error("Authorization token is missing.");
//         throw new Error("Authorization token is not available.");
//     }

//     try {
//         const response = await fetch(api, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             // Si le code de statut HTTP n'est pas dans la plage 200-299,
//             // nous lançons une erreur avec le code de statut et le texte de statut
//             throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();  // Supposant que le serveur répond avec des données au format JSON
//         console.log(data);
//         return data;  // Renvoyer les données à utiliser par le composant appelant

//     } catch (error) {
//         console.error("Failed to fetch data:", error);
//         // Renvoyer l'erreur pour être gérée par le composant appelant
//             method: 'GET', 
//             headers: {
//                 'Authorization': `Bearer, ${token}`, 
//                 'Content-Type': 'application/json'
//             }
//         };
//         console.log("succ");

//         if (!response.ok) {
//             // If the HTTP status code is not in the 200-299 range,
//             // we throw an error with the status and statusText
//             throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();  // Assuming the server responds with JSON-formatted data
//         console.log(data);
//         return data;  // Return the data to be used by the calling component
        
//     } catch (error) {
//         console.error("Failed to fetch data:", error);
//         // Rethrow the error to be handled by the calling component
//         throw error;
//     };

export const getModules = async () => {
    const api = `http://localhost:8080/formations/getModules/6630c6bccee79c13c73bcef9/6618051285577e0285bcf04f`;
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

        if (!response.ok) {
            // Si le code de statut HTTP n'est pas dans la plage 200-299,
            // nous lançons une erreur avec le code de statut et le texte de statut
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Supposant que le serveur répond avec des données au format JSON
        console.log(data);
        return data;  // Renvoyer les données à utiliser par le composant appelant

    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Renvoyer l'erreur pour être gérée par le composant appelant
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

        if (!response.ok) {
            // Si le code de statut HTTP n'est pas dans la plage 200-299,
            // nous lançons une erreur avec le code de statut et le texte de statut
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();  // Supposant que le serveur répond avec des données au format JSON
        console.log(data);
        return data;  // Renvoyer les données à utiliser par le composant appelant

    } catch (error) {
        console.error("Failed to fetch data:", error);
        // Renvoyer l'erreur pour être gérée par le composant appelant
        throw error;
    }
};
 