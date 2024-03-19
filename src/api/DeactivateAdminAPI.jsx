import axios from 'axios';

// export const deactivateAdmin = async (admin_id) => {
//     const token = localStorage.getItem('token');
//   const response = await axios.post(
//     'http://localhost:8000/api/superadmin/deactivateAdmin', 
//     { admin_id },
//     {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     }
//   );
//   return response;
// };

export const deactivateAdmin = async (admin_id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            'http://localhost:8000/api/superadmin/deactivateAdmin', 
            { admin_id },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error('Error deactivating admin:', error.response.data);
        throw error;
    }
};