import React from 'react'
import classes from './Navbar.module.css'
import { NavLink } from "react-router-dom"

const NavItem = (props) => {
    return (
        <li className={classes["nav-item"]}><NavLink to={props.to} className={state => state.isActive ? [classes["nav-links"], classes["nav-item-active"]].join(' ') : classes["nav-links"]}>{props.children}</NavLink></li>
    )
}

export default NavItem