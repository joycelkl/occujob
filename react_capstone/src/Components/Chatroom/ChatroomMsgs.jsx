import React from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import './css/ChatroomMsgs.scss'

const ChatroomMsgs = ({messages, userType}) => {

    return (
        <>
        <ScrollToBottom className="ChatRoomMsgs">
        {
          messages ?
            messages.map((message, index) =>
              <div key={index}>
                {
                  message.sentby !== userType ?
  
                    <div
                      className="msgs-chatter-wrapper"
                    >
                      {/* <div className="msgs-chatter-portrait"> */}
                        <img className="msgs-chatter-portrait" src='https://capstoneuserimg.s3-ap-southeast-1.amazonaws.com/eeUsersImg/1.jpg' alt=''/>
                      {/* </div> */}
                      <div
                        className="msgs-chatter-namecontent-wrapper"
                      >
                        <div className="msgs-chatter-name">
                          <p>
                            {message.username}
                          </p>
                        </div>
                        <div className="msgs-chatter-content">
                          {message.msgcontent}
                        </div>
                      </div>
                    </div> :
  
                    // own chatter ********************
                    <div
                      className="msgs-own-wrapper"
                    >
                      <div
                        className="msgs-own-namecontent-wrapper"
                      >
                        <div className="msgs-own-content">
                          {message.msgcontent}
                        </div>
                      </div>
                      {/* <div className="msgs-own-portrait"> */}
                          <img className="msgs-own-portrait" src='https://capstoneuserimg.s3-ap-southeast-1.amazonaws.com/eeUsersImg/1.jpg' alt=''/>
                      {/* </div> */}
                    </div>
                }
              </div>
            ) :
            null
        }
        <div/>
        </ScrollToBottom>
      </>
    )
}

export default ChatroomMsgs
