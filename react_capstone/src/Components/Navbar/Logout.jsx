import React from 'react'
import { NavLink } from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import './navbar.css'

const Logout = () => {

    const dispatch = useDispatch();

    const {logoutNowAction} = bindActionCreators(actionCreators, dispatch)

    return (
        <>
        <NavLink style={{textDecoration:"none", color:"#fff",  padding:"5px 10px", marginLeft:"20px", fontSize:"20px", fontWeight:"500", listStyleType:"none", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", marginBottom:"3px"}} key='logout' onClick={()=>logoutNowAction()}>Logout</ NavLink>
        </>
    )
}

export default Logout
