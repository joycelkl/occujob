import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { FaBars } from 'react-icons/fa'
import { LoginMenuList } from "./MenuList"
import logo from '../../Images/logo.png';

const Navbar = () => {
    const [clicked, setClicked] = useState(false);
    const menuList = LoginMenuList.map(({ url, title }, index) => {
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
            <a href="/">
            <img src={logo} width="240" height="100" alt='logo'/>
            </a>
            </div>
            <div className="navMenuIcon" onClick={handleClick}>
                <FaBars />
            </div>
            <ul className={clicked ? "navMenuList" : "navMenuList close"}>{menuList}</ul>
        </nav>
    );
};

export default Navbar;