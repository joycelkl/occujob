import axios from "axios";

// const token = localStorage.getItem("token")


// const authAxios = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL,
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// });

async function authAxios() {
    const token = await localStorage.getItem("token");
    console.log("token in authAxios", token)
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default authAxios;