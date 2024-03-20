import axios from 'axios';

export const CompanyIndex = async (page = 1) => {
    const token = localStorage.getItem('token'); 
    const response = await axios.get(`http://localhost:8000/api/superadmin/companyIndex?page=${page}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response;
};
