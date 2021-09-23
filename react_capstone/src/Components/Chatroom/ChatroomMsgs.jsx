import React from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import './css/ChatroomMsgs.scss'


const ChatroomMsgs = ({messages, userType, chatterImg, userImg}) => {
    
    return (
        <>
        <ScrollToBottom className="ChatRoomMsgs">
        {
          messages ?
            messages.map((message, index) =>
              <div key={index}>
                {
                  message.sender_type !== userType ?
  
                    <div className="msgs-chatter-wrapper">
                      {chatterImg !== null ?  <img className="msgs-chatter-portrait" src={chatterImg} alt=''/> : <img className="msgs-chatter-portrait" src='https://capstoneuserimg.s3-ap-southeast-1.amazonaws.com/eeUsersImg/1.jpg' alt='default'/>}

                      <div
                        className="msgs-chatter-namecontent-wrapper"
                      >
                        <div className="msgs-chatter-name">
                          <p>
                            {userType === 'er' ? message.ee_name : message.er_name}
                          </p>
                        </div>
                        <div className="msgs-chatter-content">
                          {message.content}
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
                          {message.content}
                        </div>
                      </div>
                      {userImg !== null ?  <img className="msgs-own-portrait" src={userImg} alt=''/> : <img className="msgs-own-portrait" src='https://capstoneuserimg.s3-ap-southeast-1.amazonaws.com/eeUsersImg/1.jpg' alt='default'/>}
                          
                  
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
