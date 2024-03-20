import axios from "axios";
    
export const noRoleIndexAPI = async (page = 1) => {
    // Check User
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://127.0.0.1:8000/api/noRoleIndex?page=${page}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response;
};
    