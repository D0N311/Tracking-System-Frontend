import axios from 'axios';

// export const deactivateUser = async (user_id) => {
//     const token = localStorage.getItem('token');
//   const response = await axios.post(
//     'http://localhost:8000/api/admin/deactivateUser', 
//     { user_id },
//     {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     }
//   );
//   return response;
// };

export const deactivateUser = async (user_id) => {
  try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
          'http://localhost:8000/api/admin/deactivateUser', 
          { user_id },
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