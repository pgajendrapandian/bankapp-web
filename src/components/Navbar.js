import classes from "./Navbar.module.css";
import logo from "../img/logo.png";
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import { useRef } from "react";
import { findAccount } from "../api/api";
import { useDispatch } from "react-redux";
import Logout from "./Logout";

const Navbar = () => {
  const searchRef = useRef();
  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(findAccount(searchRef.current.value));
    searchRef.current.value = null;
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/account">
          <img src={logo} alt="logo" className={classes["logo-img"]}></img>
        </NavLink>
      </div>
      <form
        action=""
        className={classes["search-form"]}
        onSubmit={onSubmitHandler}
      >
        <input
          name="accountName"
          id="accountName"
          className={classes["search-input"]}
          placeholder="Account Name"
          ref={searchRef}
        />
        <button className={classes["search-btn"]} type="submit">
          🔍
        </button>
      </form>
      <nav className={classes.nav}>
        <ul className={classes["nav-items"]}>
          <NavItem to="/account">Accounts</NavItem>
          <NavItem to="addAccount">Add Account</NavItem>
          <NavItem to="/">
            <Logout />
          </NavItem>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
