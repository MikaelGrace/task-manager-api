import axios from "axios";

const API = axios.create({
    baseURL: "https://localhost:5275/api"
});

export default API;