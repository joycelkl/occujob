import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { FaBars } from 'react-icons/fa'
import { EmployerMenuList } from './employerMenuList';
import Logout from './Logout'
import logo from '../../Images/logo.png';

const EmployerNavbar = () => {
    const [clicked, setClicked] = useState(false);
    const menuList = EmployerMenuList.map(({ url, title }, index) => {
        return (
            <li key={index}>
                <NavLink exact to={url} activeClassName="active">
                {title}
                </NavLink>
            </li>
        );
    });
    const handleClick = () => {
        setClicked(!clicked);
    }

    return (
        <nav className="mainNav">
            <div className="logo">
            <a href="/employerHomePage">
            <img src={logo} alt='' width="240" height="100" />
            </a>
            </div>
            <div className="navMenuIcon" onClick={handleClick}>
                <FaBars />
            </div>
            <ul className={clicked ? "navMenuList" : "navMenuList close"}>{menuList}<Logout /></ul>
        </nav>
    );
};

export default EmployerNavbar;