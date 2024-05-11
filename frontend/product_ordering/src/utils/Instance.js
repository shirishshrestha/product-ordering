import axios from "axios";
const ApiUrl = import.meta.env.VITE_APP_API;
const instance = axios.create({
  baseURL: ApiUrl,
});
export default instance;
