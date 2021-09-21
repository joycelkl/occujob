import React from 'react'
import AllChatrooms from '../../Components/Chatroom/AllChatrooms'
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";


const EmployerChatMessages = () => {
    return (
        <div>
            <EmployerNavbar />
            <div className='container'>
                 <AllChatrooms />
            </div>
        </div>
    )
}

export default EmployerChatMessages