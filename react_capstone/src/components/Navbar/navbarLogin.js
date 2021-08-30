import React, { useState } from 'react';
import "./navbar.css";
import { FaBars } from 'react-icons/fa'
import { LoginMenuList } from "./MenuList"

const Navbar = () => {
    const [clicked, setClicked] = useState(false);
    const menuList = LoginMenuList.map(({ url, title }, index) => {
        return (
            <li key={index}>
                <a href={url}>{title}</a>
            </li>
        );
    });
    const handleClick = () => {
        setClicked(!clicked);
    }

    return (
        <nav>
            <div className="logo">
                <font>HK</font>FREELANCER
            </div>
            <div className="menu-icon" onClick={handleClick}>
                <FaBars />
            </div>
            <ul className={clicked ? "menu-list" : "menu-list close"}>{menuList}</ul>
        </nav>
    )
};

export default Navbar;