import axios from "axios";

const url = "http://localhost:4000/api";
axios.defaults.baseURL = url;

export const signup = async (username, password) => {
  let signupResponse = {};
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  await axios
    .post("/users", params)
    .then((response) => {
      signupResponse = { response };
    })
    .catch((error) => {
      if (error) {
        signupResponse.error = error.response.data.message;
      }
    });
  return signupResponse;
};
