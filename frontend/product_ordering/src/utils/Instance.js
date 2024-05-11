import axios from "axios";
const ApiUrl = import.meta.env.VITE_APP_API;

// Create an Axios instance with the API URL as baseURL
const instance = axios.create({
  baseURL: ApiUrl,
});
export default instance;
