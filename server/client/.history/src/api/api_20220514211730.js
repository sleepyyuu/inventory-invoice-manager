import axios from "axios";

const url = "http://localhost:4000/api";
axios.defaults.baseURL = url;

export const userRequest = async (username, password, route) => {
  let apiResponse = {};
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  await axios
    .post(route, params)
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
  await axious.get("/refresh", { withCredentials: true });
};
