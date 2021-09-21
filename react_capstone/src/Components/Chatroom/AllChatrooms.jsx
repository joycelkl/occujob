import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import SmallMessage from './SmallMessage';
import './css/AllChatrooms.css'


const AllChatrooms = () => {

  const type = localStorage.getItem('type')
  const userID = localStorage.getItem('userID')

  const dispatch = useDispatch();
  const { loadAllChatroomsThunkAction } = bindActionCreators(actionCreators, dispatch)

  const allChatroom = useSelector((state)=> state.allChats)

  useEffect(()=>{
      loadAllChatroomsThunkAction();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

    return (
        <div className="SmallMessages">
        {allChatroom.length === 0
          ? null
          : allChatroom.map(chat => {
            return (
                <SmallMessage
                  key={chat.chatroom_id}
                  chatID={chat.chatroom_id}
                  chatterName={type === 'er'? chat.ee_name : chat.er_name}
                  chatterID={type ==='er'? chat.chat_employee_id: chat.chat_employer_id}
                  msgContent={chat.content}
                  sentTime={chat.msgCreate}
                  // clickedChatId={this.state.clickedChatId}
                  userType={type}
                  userID={userID}
                />
            );
          })}
      </div>
    )
}

export default AllChatrooms
