import axios from "axios";

//"http://localhost:5000/api"
const url = process.env.APIADDRESS
axios.defaults.baseURL = url;
axios.defaults.withCredentials = true;
export const axiosPrivate = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const userRequest = async (username, password, route) => {
  let apiResponse = {};
  await axios
    .post(route, JSON.stringify({ username, password }), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      apiResponse = { response };
    })
    .catch((error) => {
      if (error) {
        console.log(error);
        apiResponse.error = error.response.data.message;
      }
    });
  return apiResponse;
};

export const refreshToken = async () => {
  const response = await axios.get("/refresh", { withCredentials: true }).catch((error) => {
    if (error) {
      console.log(error);
    }
  });
  return response;
};

export const logoutEndpoint = async () => {
  const response = await axios.get("/auth/logout").catch((error) => {
    if (error) {
      console.log(error);
    }
  });
  return response;
};
