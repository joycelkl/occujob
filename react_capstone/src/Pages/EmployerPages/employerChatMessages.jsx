import React from "react";
import AllChatrooms from "../../Components/Chatroom/AllChatrooms";
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import "../ApplicantPages/applicantChatMessages.css";

const EmployerChatMessages = () => {
  return (
    <div>
      <EmployerNavbar />
      <section className="chatListHeader">
        <div className="chatListText-box" id="home">
          <h1>Messages</h1>
          <p>Chat With Your Future Employee!</p>
          <a href="/applicantJobSearch" className="Homebtn">
            Search Applicant
          </a>
        </div>
      </section>
      <div className="container">
        <AllChatrooms />
      </div>
    </div>
  );
};

export default EmployerChatMessages;
