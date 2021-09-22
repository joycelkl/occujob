import React from "react";
import AllChatrooms from "../../Components/Chatroom/AllChatrooms";
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import "./applicantChatMessages.css";

const ApplicantChatMessages = () => {
  return (
    <div>
      <ApplicantNavbar />
      <section className="chatListHeader">
        <div className="chatListText-box" id="home">
          <h1>Messages</h1>
          <p>Chat With Your Future Employer!</p>
          <a href="/applicantJobSearch" className="Homebtn">
            Search Jobs
          </a>
        </div>
      </section>
      <div className="container">
        <AllChatrooms />
      </div>
    </div>
  );
};

export default ApplicantChatMessages;
