import axios from 'axios';

export const checkUser = async () => {
//Check User
        const token = localStorage.getItem('token'); 
        const response = axios.get('http://127.0.0.1:8000/api/checkUser/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response;
};

