import axios from 'axios';

export const addCompany = async (company_name, description, location, admin_id) => {
    const token = localStorage.getItem('token');
  const response = await axios.post(
    'http://localhost:8000/api/superadmin/addCompany', 
    { company_name, description, location, admin_id },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  return response;
};