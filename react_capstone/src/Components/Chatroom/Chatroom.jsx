import React, {useEffect, useState} from 'react';
import ChatroomMsgs from './ChatroomMsgs';
import ChatroomTop from './ChatroomTop'
import ChatroomInput from './ChatroomInput';
import "./css/Chatroom.css";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import io from 'socket.io-client';

let socket

// import queryString from 'query-string';
  // const {erId, eeId} = queryString.parse(location.search)

const Chatroom = (props) => {

    const ENDPOINT = process.env.REACT_APP_BASE_URL
    const {chatterID, userID} = props
    
    const chatroomID = useSelector((state)=> state.chatroomID)
    const chatHistory = useSelector((state)=> state.chatHistory)

    const dispatch = useDispatch();
    const { loadChatroomIDThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { loadChatroomHistoryThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { addChatroomHistorySuccessAction } = bindActionCreators(actionCreators, dispatch)
    const { resetUnreadMsgThunkAction } = bindActionCreators (actionCreators, dispatch)

    const [messages, setMessages] = useState('');
    const [chatter, setChatter] = useState('');
    const [chatroomNum, setChatroomNum] = useState('');
    const type = localStorage.getItem('type')
    // const userID = localStorage.getItem('userID')

    useEffect(()=>{
        socket = io(ENDPOINT,  { transports : ['websocket'] })

        //testdata
        // const testmsg = [{username: 'Joyce', sentby:'er', msgcontent:'hello'},{username: 'ee_1', sentby:'ee', msgcontent:'what?'}]
        // setMessages(testmsg)

        console.log('IDS', chatterID, userID)

        loadChatroomIDThunkAction(chatterID, userID)
        .then(()=>{
            console.log('okay done', chatroomID)
        })
        
        socket.on('sendMsg', message=>{
            console.log('how many time running??')
            addChatroomHistorySuccessAction(message)
        })
        
        return ()=>{
            socket.disconnect()
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    useEffect(()=>{
        console.log('chatroom Id in 2nd useEffect', chatroomID)

        if(chatroomID.length >0 ){
            let id = chatroomID[0].chatroom_id
            console.log('chatroom id in useEffect', id)
            setChatroomNum(id)

            socket.on('chatroomIDrequest', ()=>{
                socket.emit('sendingChatroomID', id)
            })

            loadChatroomHistoryThunkAction(id)

            socket.on('sendMsg', () =>{
                resetUnreadMsgThunkAction(id)
            })
      

        if (type === 'er' && chatroomID[0]){
            setChatter([{username:chatroomID[0].ee_name, id:chatroomID[0].chat_employee_id }])
        } else {
            setChatter([{username:chatroomID[0].er_name, id:chatroomID[0].chat_employer_id }])
        }
        }

         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[chatroomID])


    useEffect(()=>{
        
        setMessages(chatHistory)

    },[chatHistory])



    console.log('chatroomId', chatroomID)
    console.log('chatter', chatter)
    console.log('`chat History', chatHistory)

    return (
        <div className="ChatRoom">
            <ChatroomTop chatter={chatter} />
            <ChatroomMsgs messages={messages} userType={type}/>
            <ChatroomInput chatroomID={chatroomNum} senderType={type} user_id={userID} />
        </div>
    )
}

export default Chatroom
