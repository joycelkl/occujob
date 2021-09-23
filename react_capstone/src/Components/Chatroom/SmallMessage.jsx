import React, { useState, useEffect } from "react";
import "./css/SmallMessage.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import Chatroom from "./Chatroom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
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
}) => {
  const ENDPOINT = process.env.REACT_APP_BASE_URL;

  const [lastSent, setLastSent] = useState("");
  const [lastMsg, setlastMsg] = useState("");
  const [unreadMsg, setUnreadMsg] = useState(0);
  const unreadCount = useSelector((state) => state.unreadMsgCount);
  const dispatch = useDispatch();
  const { loadUnreadMsgThunkAction } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const { resetUnreadMsgThunkAction } = bindActionCreators(
    actionCreators,
    dispatch
  );

  //****************For the Chatroom********************//
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });

    socket.on("chatroomIDrequest", () => {
      socket.emit("sendingChatroomID", chatID);
    });

    socket.on("sendMsg", (message) => {
      console.log("in sendMsg after", modal);

      setlastMsg(message[0].content);
      setLastSent(message[0].created_at);
      setUnreadMsg((prevUnreadMsg) => Number(prevUnreadMsg) + 1);
    });

    setlastMsg(msgContent);
    setLastSent(sentTime);

    loadUnreadMsgThunkAction(chatID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUnreadMsg(unreadCount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unreadCount]);

  console.log("unreadMsg in smallMessage", unreadMsg);

  function handleOnClick() {
    resetUnreadMsgThunkAction(chatID);
    toggle();
    console.log("inchatroom after onClick", modal);
  }

  console.log("below onClick after", modal);

  function handleCancel() {
    toggle();
    console.log("inchatroom after cancel", modal);
  }
  console.log("below cancel after", modal);

  function changeDateFormat(date) {
    return new Date(date).toLocaleString()
}


  return (
    <div
      className="SmallMessage"
      style={{ cursor: "pointer", display: "flex", justifyContent: "center" }}
      onClick={() => handleOnClick()}
    >
      <Card style={{ width: "600px", width: "80%", marginBottom: "30px", marginTop:'10px'}}>
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
      {/* <div className="SmallMessage-inboxes-sentTo">
        <span>{chatterName}</span>{" "}chat
        {unreadMsg > 0 ? <span>{unreadMsg} Message Arrived</span> : null}
      </div>

      <div className="SmallMessage-inboxes-msgContent">
        {lastMsg ? (
          <span>
            {lastMsg.length < 52 ? lastMsg : lastMsg.substring(0, 40) + " ..."}
          </span>
        ) : (
          <span>Please send your first message</span>
        )}
      </div>
      <div className="SmallMessage-inboxes-sentTime">
        {lastSent ? <span>{lastSent}</span> : <span>Start a conversation</span>}
      </div> */}

      <>
        <Modal isOpen={modal} toggle={toggle} fade={false}>
          <ModalHeader toggle={toggle}>Chatroom</ModalHeader>
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
