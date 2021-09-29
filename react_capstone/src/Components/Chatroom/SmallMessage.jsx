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

    socket.on("chatroomIDrequest", () => {
      socket.emit("sendingChatroomID", chatID);
        
      return ()=>{
        socket.disconnect()
      }
    });
    
    
    setlastMsg(msgContent);
    setLastSent(sentTime);
    if(unreadMsgCount) {
      setUnreadMsg(unreadMsgCount);  

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unreadMsgCount]);


  socket.on("sendMsg", (message) => {
    setlastMsg(message[0].content);
    setLastSent(message[0].created_at);
    
  });

  function handleOnClick() {
    resetUnreadMsgThunkAction(chatID);
    setUnreadMsg(0)
    toggle();
   
  }

 
  socket.on("receivedMsg", (sender, chatroomID) => {
       
  if (sender !== userType && modal === false && chatroomID === chatID){
    setUnreadMsg((prevUnreadMsg) => Number(prevUnreadMsg) + 1);
  }
  })
  

  function handleCancel() {
    toggle();
    setUnreadMsg(0);
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
              {unreadMsg > 0 ? <span style={{color:'red'}}>{unreadMsg} New Message(s)</span> : null}
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
