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
