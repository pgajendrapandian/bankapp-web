import React, { useEffect, useRef } from "react";
import classes from "./LoginForm.module.css";
import { login } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accountsActions } from "../store/data-store";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loginStatus, loginError } = useSelector(
    (state) => state.accounts
  );
  const userRef = useRef();
  const passwordRef = useRef();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      login({
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };
  useEffect(() => {
    if (token) {
      navigate("/account", { replace: true });
    }
  }, [navigate, token]);
  return (
    <div className={classes["login-container"]}>
      <div className={classes["form-container"]}>
        <form className={classes["form-login"]} onSubmit={onSubmitHandler}>
          <div className={classes["div-username"]}>
            <label htmlFor="form-username">Username</label>
            <input type="text" id="form-username" ref={userRef} />
          </div>
          <div className={classes["div-password"]}>
            <label htmlFor="form-password">Password</label>
            <input type="password" id="form-password" ref={passwordRef} />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className={classes["div-status"]}>
          {!loginStatus && <h3>{loginError}</h3>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
