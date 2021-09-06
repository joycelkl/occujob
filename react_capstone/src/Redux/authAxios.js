import axios from "axios";


// const token = localStorage.getItem("token")

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkpveWNlIExpbWl0ZWQiLCJ0eXBlIjoiZXIiLCJpYXQiOjE2MzA5MTMwNjUsImV4cCI6MTYzMDk5OTQ2NX0.rwzKdT-60GAvgIkbKvKzrCDXOvIPLAbcCZjfq2eBfGA'

// const authAxios = ()=> async () => {
//     try{
//         const token = await localStorage.getItem("token")
//         return axios.create({
//             baseURL: process.env.REACT_APP_BASE_URL,
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }})
//     } catch (err) {
//         console.log(err)
//     }
// }

async function authAxios() {
    const token = await localStorage.getItem("token")
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

}


// console.log("token", token)



// const authAxios = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL,
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// });

export default authAxios;