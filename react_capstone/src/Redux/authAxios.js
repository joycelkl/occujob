import axios from "axios";

// const token = localStorage.getItem("token")
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkpveWNlIiwidHlwZSI6ImVyIiwiaWF0IjoxNjMwOTEzNjQ4LCJleHAiOjE2MzEwMDAwNDh9.AtZupibrK_7r3JIMMvmhf9fZFk1j53cNHNMVS_mmans'

console.log("token", token)

const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export default authAxios;