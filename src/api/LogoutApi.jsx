import axios from 'axios';

export const logoutUser = async (navigate) => {
 
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/logout', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 200) {
            // Logout successful
            localStorage.clear(); // Remove the access token from local storage
            navigate('/Login'); // Redirect to the login page
        } else {
            // Handle error response
            console.error('Logout failed:', response.data.error);
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

    