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

const Chatroom = (props) => {

    const ENDPOINT = process.env.REACT_APP_BASE_URL
    const {chatterID, userID} = props
    
    const chatroomID = useSelector((state)=> state.chatroomID)
    const chatHistory = useSelector((state)=> state.chatHistory)
    const erProfileState = useSelector((state) => state.erProfile);
    const eeProfileState = useSelector((state) => state.EEProfile);


    const dispatch = useDispatch();
    const { loadChatroomIDThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { loadChatroomHistoryThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { addChatroomHistorySuccessAction } = bindActionCreators(actionCreators, dispatch)
    const { resetUnreadMsgThunkAction } = bindActionCreators (actionCreators, dispatch)
    //for collecting the img
    const { loadErProfileThunkAction } = bindActionCreators (actionCreators, dispatch)
    const { loadEEProfileThunkAction } = bindActionCreators (actionCreators, dispatch)

    const [messages, setMessages] = useState('');
    const [chatter, setChatter] = useState('');
    const [chatroomNum, setChatroomNum] = useState('');
    const [chatterImg, setChatterImg] = useState('');
    const [userImg, setUserImg] = useState('')
    const type = localStorage.getItem('type')
    // const userID = localStorage.getItem('userID')

    useEffect(()=>{
        socket = io(ENDPOINT,  { transports : ['websocket'] })

        loadChatroomIDThunkAction(chatterID, userID)
                
        socket.on('sendMsg', message=>{
            addChatroomHistorySuccessAction(message)
        })
        
        if(type === 'er') {
            loadErProfileThunkAction(userID)
            loadEEProfileThunkAction(chatterID)
        } else {
            loadErProfileThunkAction(chatterID)
            loadEEProfileThunkAction(userID)
        }


        return ()=>{
            socket.disconnect()
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    useEffect(()=>{
       

        if(chatroomID.length >0 ){
            let id = chatroomID[0].chatroom_id
          
            setChatroomNum(id)

            socket.on('chatroomIDrequest', ()=>{
                socket.emit('sendingChatroomID', id)
            })

            loadChatroomHistoryThunkAction(id)
            resetUnreadMsgThunkAction(id)

            socket.on('sendMsg', () =>{
                resetUnreadMsgThunkAction(id)
            })

        if (type === 'er' && chatroomID[0]){
            setChatter([{username:chatroomID[0].ee_name, id:chatroomID[0].chat_employee_id }])
        } else {
            setChatter([{username:chatroomID[0].er_name, id:chatroomID[0].chat_employer_id }])
        }
        }

        if(erProfileState && eeProfileState){ 
            const { ee_img_data } = eeProfileState
            const { er_img_data } = erProfileState
         
            if(type === 'er') {
                setUserImg(er_img_data)
                setChatterImg(ee_img_data)
            } else {
                setUserImg(ee_img_data)
                setChatterImg(er_img_data)
            }
        }

         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[chatroomID, erProfileState, eeProfileState])

    useEffect(()=>{
        
        setMessages(chatHistory)

    },[chatHistory])


    return (
        <div className="ChatRoom">
            <ChatroomTop chatter={chatter} />
            <ChatroomMsgs messages={messages} userType={type} chatterImg={chatterImg} userImg={userImg}/>
            <ChatroomInput chatroomID={chatroomNum} senderType={type} user_id={userID} />
        </div>
    )
}

export default Chatroom
