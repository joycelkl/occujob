import React, {useEffect, useState} from 'react';
// import queryString from 'query-string';
import io from 'socket.io-client';
import ChatroomMsgs from './ChatroomMsgs';
import ChatroomTop from './ChatroomTop'
import ChatroomInput from './ChatroomInput';
// import axios from 'axios'
import "./css/Chatroom.css";

let socket;

const Chatroom = (props) => {

    const ENDPOINT = process.env.REACT_APP_BASE_URL
    const {erId, eeId} = props
    
    const [messages, setMessages] = useState('');
    const [userType, setUserType] = useState('')


    useEffect(()=>{
        socket = io(ENDPOINT,  { transports : ['websocket'] })

        const type = localStorage.getItem('type')
        setUserType(type)

        //testdata
        const testmsg = [{username: 'Joyce', sentby:'er', msgcontent:'hello'},{username: 'ee_1', sentby:'ee', msgcontent:'what?'}]
        setMessages(testmsg)

 
        console.log('IDS', erId, eeId)
            
        
        // const {erId, eeId} = queryString.parse(location.search)

        return ()=>{
            socket.disconnect()
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    return (
        <div className="ChatRoom">
            <ChatroomTop />
            <ChatroomMsgs messages={messages} userType={userType}/>
            <ChatroomInput />
        </div>
    )
}

export default Chatroom
