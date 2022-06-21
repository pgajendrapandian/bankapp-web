import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Fragment, useEffect } from "react";
import NavbarLayout from "./pages/NavbarLayout";
import Account from "./pages/Account";
import NewAccount from "./pages/NewAccount";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { accountsActions } from "./store/data-store";

const fetchToken = () => {
  return localStorage.getItem("token");
};

function App() {
  const dispatch = useDispatch();
  const localToken = fetchToken();
  useEffect(() => {
    if (localToken) {
      dispatch(accountsActions.setToken(localToken));
    }
  }, [localToken]);
  return (
    <Fragment>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<NavbarLayout />} path="/account">
          <Route element={<Home />} path="/account" />
          <Route element={<Account />} path=":accountID" />
          <Route element={<NewAccount />} path="addAccount" />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
