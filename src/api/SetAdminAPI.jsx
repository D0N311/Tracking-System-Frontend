import axios from 'axios';

export const setAdmin = async (admin_id, company_id) => {
    const token = localStorage.getItem('token');
  const response = await axios.post(
    'http://localhost:8000/api/superadmin/setAdmin', 
    { admin_id, company_id },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  return response;
};