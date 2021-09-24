import React, { useState, useEffect } from "react";
import "./css/SmallMessage.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Chatroom from "./Chatroom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux";
import io from "socket.io-client";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
let socket;

const SmallMessage = ({
  chatID,
  chatterName,
  chatterID,
  msgContent,
  sentTime,
  userType,
  userID,
  unreadMsgCount,
}) => {
  const ENDPOINT = process.env.REACT_APP_BASE_URL;
  socket = io(ENDPOINT, { transports: ["websocket"] });

  const [lastSent, setLastSent] = useState("");
  const [lastMsg, setlastMsg] = useState("");
  const [unreadMsg, setUnreadMsg] = useState(0);
  const dispatch = useDispatch();

  const { resetUnreadMsgThunkAction } = bindActionCreators(
    actionCreators,
    dispatch
  );

  //****************For the Chatroom********************//
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    
    console.log('unreadCount from backend','chatroomID:',chatID ,'unread:',unreadMsgCount)
    setUnreadMsg(unreadMsgCount);  
    setlastMsg(msgContent);
    setLastSent(sentTime);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  socket.on("chatroomIDrequest", () => {
    socket.emit("sendingChatroomID", chatID);
    console.log('chatroom ID',chatID)
  });

  socket.on("sendMsg", (message) => {
    console.log('message arrive')
    setlastMsg(message[0].content);
    setLastSent(message[0].created_at);
    
  });
  
  console.log('unreadMsg', unreadMsg)

  useEffect(() => {
    console.log('I run once')

    socket.on("receivedMsg", (sender, chatroomID) => {
      console.log('sender', sender)
      if (sender !== userType && !modal && chatroomID === chatID){
        setUnreadMsg((prevUnreadMsg) => Number(prevUnreadMsg) + 1);
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userType, modal, lastSent])
  


  function handleOnClick() {
    resetUnreadMsgThunkAction(chatID);
    setUnreadMsg(0)
    toggle();
  }

  function handleCancel() {
    toggle();
  }


  function changeDateFormat(date) {
    return new Date(date).toLocaleString()
  }


  return (
    <div
      className="SmallMessage"
      style={{ cursor: "pointer", display: "flex", justifyContent: "center" }}
      onClick={() => handleOnClick()}
    >
      <Card style={{  width: "80%", marginBottom: "30px", marginTop:'10px'}}>
        <CardActionArea>
          <CardContent>
            
            <Typography gutterBottom variant="h5" component="h2">
              {unreadMsg > 0 ? <span style={{color:'red'}}>{unreadMsg} New Message</span> : null}
              <br></br>
              <span>{chatterName}</span>{" "}
            </Typography>
            <Typography>
              Last Message: <br></br> 
              {lastMsg ? (
                <span>
                  {lastMsg.length < 52
                    ? lastMsg
                    : lastMsg.substring(0, 40) + " ..."}
                </span>
              ) : (
                <span>Please send your first message</span>
              )}
              
            </Typography>

            <Typography>
              {lastSent ? <span> {changeDateFormat(lastSent)}</span> : <span>Start a conversation</span>}
            </Typography>
            <Typography style={{marginTop:'5px', textDecoration:'underline'}}>
             <span>Click To Open Chat Room</span> 
            </Typography>
            
          </CardContent>
          
        </CardActionArea>
        
      </Card>
      <>
        <Modal isOpen={modal} toggle={toggle} fade={false}>
          <ModalHeader toggle={toggle} className='smallHead'>Chatroom</ModalHeader>
          <ModalBody>
            <Chatroom chatterID={chatterID} userID={userID} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => handleCancel()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    </div>
  );
};

export default SmallMessage;
