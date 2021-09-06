import axios from "axios";

const token = localStorage.getItem("token")

console.log("token", token)

const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export default authAxios;