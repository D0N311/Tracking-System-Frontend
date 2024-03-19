import axios from 'axios';

export const ActivateAdmin = async (company_name, description, location, admin_id) => {
    const token = localStorage.getItem('token');
  const response = await axios.post('http://localhost:8000/api/superadmin/activateAdmin', 
    { company_name, description, location, admin_id },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  return response;
};