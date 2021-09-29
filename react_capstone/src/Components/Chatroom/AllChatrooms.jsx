import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import SmallMessage from './SmallMessage';
import './css/AllChatrooms.css'


const AllChatrooms = () => {

  const type = localStorage.getItem('type')
  const userID = localStorage.getItem('userID')

  const [allChatInfo, setAllChatInfo] = useState('');

  const dispatch = useDispatch();
  const { loadAllChatroomsThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadAllUnreadCountThunkAction } = bindActionCreators(actionCreators, dispatch)

  const allChatroom = useSelector((state)=> state.allChats)

  const allChatUnread = useSelector((state)=> state.allUnreadCount)


  useEffect(()=>{
      loadAllChatroomsThunkAction();
      loadAllUnreadCountThunkAction();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    let chatroomUC
    if (allChatUnread.length>0) {
      chatroomUC = allChatUnread.reduce(function(allObject, object) {
          if(allObject.find(({chatroom_id})=> chatroom_id === object.chatroom_id)) {
            let index = allObject.map(obj => {return obj.chatroom_id}).indexOf(object.chatroom_id)
            allObject[index].count += 1;
          } else {
            let newobj = {}
            newobj['chatroom_id'] = object['chatroom_id'];
            newobj['count'] = 1;
            allObject.push(newobj);
          }
          return allObject;
      },[])
    }

    let newAllChatroom;
    if (allChatroom.length > 0 && chatroomUC){
      newAllChatroom = allChatroom.map(chat => {
        if (chatroomUC.findIndex(obj => obj.chatroom_id === chat.chatroom_id) !== -1){
            chat['count'] = chatroomUC[chatroomUC.findIndex(obj => obj.chatroom_id === chat.chatroom_id)].count;
            return chat;
        } else {
          chat['count'] = 0;
          return chat;
        }
      })
    } else {
      newAllChatroom = allChatroom
    }
    
    setAllChatInfo(newAllChatroom)

   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[allChatUnread,allChatroom ])


    return (
        <div className="SmallMessages">
        {Array.isArray(allChatInfo) && allChatInfo.length > 0
          ? allChatroom.map(chat => {
            return (
                <SmallMessage
                  key={chat.chatroom_id}
                  chatID={chat.chatroom_id}
                  chatterName={type === 'er'? chat.ee_name : chat.er_name}
                  chatterID={type ==='er'? chat.chat_employee_id: chat.chat_employer_id}
                  msgContent={chat.content}
                  unreadMsgCount={chat.count}
                  sentTime={chat.msgCreate}
                  userType={type}
                  userID={userID}
                />
            );
          }) : null  }
      </div>
    )
}

export default AllChatrooms
