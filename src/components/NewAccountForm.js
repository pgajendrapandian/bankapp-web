import React, { useRef } from "react";
import classes from "./Form.module.css";
import { addAccount } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewAccountForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addAccountStatus } = useSelector((state) => state.accounts);
  const accountNameRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addAccount({
        accountName: accountNameRef.current.value,
        loanDate: dateRef.current.value,
        loanAmount: amountRef.current.value,
      })
    );
    accountNameRef.current.value =
      dateRef.current.value =
      amountRef.current.value =
        null;
  };
  const onClickHandler = () => {
    navigate("/", { replace: true });
  };
  return (
    <form className={classes["form"]} onSubmit={onSubmitHandler}>
      <div className={classes["form-input"]}>
        <label htmlFor="date">Loan Date: </label>
        <input
          type="date"
          id="date"
          className={classes["form-date"]}
          ref={dateRef}
        ></input>
      </div>
      <div className={classes["form-input"]}>
        <label htmlFor="date">Account Name: </label>
        <input
          type="text"
          id="accountname"
          className={classes["form-accountname"]}
          ref={accountNameRef}
        ></input>
      </div>
      <div className={classes["form-input"]}>
        <label htmlFor="amount">Loan Amount: </label>
        <input
          type="number"
          id="amount"
          className={classes["form-amount"]}
          ref={amountRef}
        ></input>
      </div>
      <div className={classes["btn-container"]}>
        <button className={classes["btn-cancel"]} onClick={onClickHandler}>
          Cancel
        </button>
        <button className={classes["btn-submit"]} type="submit">
          Submit
        </button>
      </div>
      {addAccountStatus === "errored" && (
        <h3>Something went wrong.. Loan Account already exists</h3>
      )}
      {addAccountStatus === "success" && (
        <h3>Loan Account added successfully.. 👍</h3>
      )}
    </form>
  );
};

export default NewAccountForm;
