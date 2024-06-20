import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [users, setUsers] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }
    
        const token = localStorage.getItem('authToken');
        console.log("Token: ", token);  // Debugging line
        if (!token) {
            alert("No auth token found, please log in first.");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const response = await axios.post('http://localhost:8080/users/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            setUsers(response.data);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("There was an error uploading the file!", error);
        }
    };
    

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept=".xlsx, .xlsm, .csv" />
            <button onClick={handleFileUpload}>Upload File</button>

            {users.length > 0 && (
                <div>
                    <h2>Uploaded Users:</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>{user.fullName} - {user.email}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
