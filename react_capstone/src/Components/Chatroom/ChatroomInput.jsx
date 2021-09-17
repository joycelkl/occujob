import React , {useState} from 'react'
import './css/ChatroomInput.scss'

const ChatroomInput = () => {

    const [msgInput, setMsgInput] = useState('');

    function sendMsg(event) {
    event.preventDefault();
    console.log('msgInput', msgInput)
    //call axios to send message
    // MessagesAPI.chatroomMessage(this.props.ownId, this.props.chatroomId, this.state.msgInput, this)
    
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
