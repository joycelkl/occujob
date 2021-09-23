import React from 'react'
import "./css/ChatroomTop.css";

const ChatroomTop = (props) => {

    const {chatter} = props

    return (
        <div className="ChatRoomTop">
        {chatter ?
            <div>
                {chatter.map(chatter =>
                <div
                    key={chatter.id}
                >
                <h5>{chatter.username}</h5>
                </div>
                )}
            </div> :
            null
        }
    </div>
    )
}

export default ChatroomTop
