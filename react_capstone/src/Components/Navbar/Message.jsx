import React, {useEffect} from 'react'
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';

const Message = (props) => {

    const {userType} = props
    const dispatch = useDispatch();
    const {loadNavbarUnreadMsgThunkAction} = bindActionCreators(actionCreators, dispatch)

    const navUnreadCount = useSelector((state)=>state.navUnreadMsgCount)
    
    useEffect(() => {
        
        const updateNavCount = setInterval(()=>{
            loadNavbarUnreadMsgThunkAction()
            
        },5000)
        return() => clearInterval(updateNavCount)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
        {userType === 'er' ? (<NavLink exact to="/employerChatMessage" activeClassName="active" style={{marginTop:'3px',textDecoration:"none", color:"#fff",  padding:"5px 10px", marginLeft:"20px", fontSize:"20px", fontWeight:"500", listStyleType:"none", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", marginBottom:"3px"}} key='message' >{navUnreadCount > 0 ? `New Messages ${navUnreadCount}` : 'Messages' }</ NavLink>) :
        (<NavLink exact to='/applicantChatMessage'  activeClassName="active" style={{marginTop:'3px', textDecoration:"none", color:"#fff",  padding:"5px 10px", marginLeft:"20px", fontSize:"20px", fontWeight:"500", listStyleType:"none", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", marginBottom:"3px"}} key='message' >{navUnreadCount > 0 ? `New Messages ${navUnreadCount}` : 'Messages' }</ NavLink>)}
        </>
    )
}

export default Message
