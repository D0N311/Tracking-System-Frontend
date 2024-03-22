import axios from 'axios';

export const setAdmin = async (email, company_id) => {
    const token = localStorage.getItem('token');
  const response = await axios.post(
    'http://localhost:8000/api/superadmin/setAdmin', 
    { email, company_id },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  return response;
};