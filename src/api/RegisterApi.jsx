import axios from "axios";

export const registerUser = async (name, email, password, c_password) => {
    const response = await axios.post('http://127.0.0.1:8000/api/register/', {
      name,
      email,
      password,
      c_password,
    });
    return response;
  };