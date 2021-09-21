import React , {useState} from 'react'
import './css/ChatroomInput.scss'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';

const ChatroomInput = ({chatroomID, senderType, user_id }) => {

    const dispatch = useDispatch();
    const { sendChatroomMessageThunkAction } = bindActionCreators(actionCreators, dispatch)

    const [msgInput, setMsgInput] = useState('');

    function sendMsg(event) {
    event.preventDefault();
    console.log('msgInput', msgInput)
    //call axios to send message
    // MessagesAPI.chatroomMessage(this.props.ownId, this.props.chatroomId, this.state.msgInput, this)
    
    //checked okay
    console.log('sending data in input', chatroomID, senderType, user_id, msgInput)

    sendChatroomMessageThunkAction(chatroomID, senderType, user_id, msgInput)

    event.target.value = '';
    }
    

    return (
        <div className="ChatRoomMessager">
        <form>
          <textarea
            className="chatroom-textarea"
            placeholder="Message here"
            rows="3"
            onChange={(e) => setMsgInput(e.target.value )}
            onKeyDown={event => event.key === "Enter" ? sendMsg(event):null}
          />
        </form>
      </div>
    )
}

export default ChatroomInput
