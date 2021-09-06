import React from 'react'
import { NavLink } from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';

const Logout = () => {

    const dispatch = useDispatch();

    const {logoutNowAction} = bindActionCreators(actionCreators, dispatch)

    return (
        <>
        <NavLink key='logout' onClick={()=>logoutNowAction()}>Logout</ NavLink>
        </>
    )
}

export default Logout
