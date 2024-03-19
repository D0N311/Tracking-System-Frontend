import axios from 'axios';

export const SearchInput = async (search) => {
    const token = localStorage.getItem('token'); 
    const response = await axios.get(`http://localhost:8000/api/searchInput?search=${search}`,
     {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return response;
};


    