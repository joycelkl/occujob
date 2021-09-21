import React from 'react'
import AllChatrooms from '../../Components/Chatroom/AllChatrooms'
import ApplicantNavbar from '../../Components/Navbar/navbarApplicant';

const ApplicantChatMessages = () => {
    return (
        <div>
            <ApplicantNavbar />
            <div className='container'>
                 <AllChatrooms />
            </div>
        </div>
    )
}

export default ApplicantChatMessages
