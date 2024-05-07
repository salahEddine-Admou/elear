import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; 

export const fetchModulesWithMedia = () => {
    return axios.get(`${API_BASE_URL}/formations/getAllModulesWithMedia`).then(response => response.data);
};
