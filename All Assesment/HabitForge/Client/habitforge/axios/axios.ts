import axios from "axios";
import { BASE_PORT } from "../constants/constant";

// Create an Axios instance with a base URL and options
export const makeRequest = axios.create({
  baseURL: BASE_PORT,  // The base URL for all requests
  withCredentials: true, // Enable sending credentials (e.g., cookies) with cross-origin requests
});
