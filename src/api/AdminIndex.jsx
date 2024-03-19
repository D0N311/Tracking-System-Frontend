import axios from 'axios';

// export const adminIndex = async () => {
// //Check User
//         const token = localStorage.getItem('token'); 
//         const response = axios.get('http://127.0.0.1:8000/api/superadmin/adminIndex/', {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         return response;
// };

export const adminIndex = async (page = 1) => {
    // Check User
    const token = localStorage.getItem('token'); 
    const response = await axios.get(`http://127.0.0.1:8000/api/superadmin/adminIndex?page=${page}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response;
};