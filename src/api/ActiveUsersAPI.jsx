import axios from 'axios';

export const activeUsers = async () => {
        const token = localStorage.getItem('token'); 
        const response = axios.get('http://localhost:8000/api/admin/userIndex', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response;
};

