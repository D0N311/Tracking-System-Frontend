import axios from "axios";

export const ActivateAdminAPI = async (admin) => {
  const token = localStorage.getItem("token");
  const role = "admin";
  const response = await axios.post(
    "http://localhost:8000/api/superadmin/activateAdmin",
    { admin, role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
