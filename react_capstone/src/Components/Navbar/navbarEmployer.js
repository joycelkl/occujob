import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { FaBars } from 'react-icons/fa'
import { EmployerMenuList } from './employerMenuList';
import Logout from './Logout'

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
            <div className="navLogo">
                <font>HK</font>FREELANCER
            </div>
            <div className="navMenuIcon" onClick={handleClick}>
                <FaBars />
            </div>
            <ul className={clicked ? "navMenuList" : "navMenuList close"}>{menuList}<Logout /></ul>
        </nav>
    );
};

export default EmployerNavbar;