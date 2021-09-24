import axios from "axios";

async function authAxios() {
    const token = await localStorage.getItem("token");
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default authAxios;