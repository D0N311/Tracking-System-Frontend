import axios from 'axios';

export const CompanyIndex = async () => {
        const token = localStorage.getItem('token'); 
        const response = axios.get('http://localhost:8000/api/superadmin/companyIndex', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response;
};

