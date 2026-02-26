import axios from "axios";

export const createUser = async (userData) => {
  const response = await axios.post(
    "https://api.murrvy.com/api/v1/user/",
    userData
  );
  return response.data;
};



export const loginUser = async (data) => {
  const response = await axios.post(
    'https://api.murrvy.com/api/v1/login/',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};