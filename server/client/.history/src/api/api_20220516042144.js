import axios from "axios";

const url = "http://localhost:4000/api";
axios.defaults.baseURL = url;
axios.defaults.withCredentials = true;
export const axiosPrivate = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const userRequest = async (username, password, route) => {
  let apiResponse = {};
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  await axios
    .post(route, params, { withCredentials: true })
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

export const logout = async () => {
  const response = await axios.get("/logout").catch((error) => {
    if (error) {
      console.log(error);
    }
  });
  return response;
};
