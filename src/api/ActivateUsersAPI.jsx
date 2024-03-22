import axios from 'axios';

// export const activateUser = async (user_id) => {
//     const token = localStorage.getItem('token');
//   const response = await axios.post('http://localhost:8000/api/admin/activateUser',{ user_id },
//     {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     }
//   );
//   return response;
// };

export const activateUser = async (user_id) => {
  try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
          'http://localhost:8000/api/admin/activateUser', 
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