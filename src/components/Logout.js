import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { accountsActions } from "../store/data-store";

const Logout = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(
      accountsActions.setLoginStatus({ loginStatus: false, token: null })
    );
  };
  return <div onClick={logoutHandler}>Logout</div>;
};

export default Logout;
