import React, {useEffect, useState} from 'react'
import "./css/ChatroomTop.css";

const ChatroomTop = (props) => {

    const [chatter, setChatter] = useState('');

    useEffect(() => {
       //testing data
       setChatter([{id: 1, username: 'Joyce'}])
        
    }, [props])



    return (
        <div className="ChatRoomTop">
        {chatter ?
            <div>
                {chatter.map(chatter =>
                <div
                    key={chatter.id}
                >
                {chatter.username}
                </div>
                )}
            </div> :
            null
        }
    </div>
    )
}

export default ChatroomTop
