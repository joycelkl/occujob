import axios from "axios";

const token = localStorage.getItem("token")

export const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
});