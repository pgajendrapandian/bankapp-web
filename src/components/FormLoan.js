import React, { useRef, useState } from "react";
import classes from "./Form.module.css";
import { accountsActions } from "../store/data-store";
import { useDispatch, useSelector } from "react-redux";
import { addLoan } from "../api/api";

export const FormLoan = (props) => {
  const dispatch = useDispatch();
  // dispatch(accountsActions.resetAddLoanStatus());
  const { addLoanStatus, addLoanError } = useSelector(
    (state) => state.accounts
  );
  const [isFormValid, setFormValid] = useState(true);
  const amountRef = useRef();
  const dateRef = useRef();
  const onClickHandler = () => {
    dispatch(accountsActions.closeLoanModal());
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const loanDate = dateRef.current.value;
    const loanAmount = amountRef.current.value;
    if (loanAmount <= 0 || new Date(loanDate) > new Date()) {
      setFormValid(false);
      return;
    }
    dateRef.current.value = amountRef.current.value = null;
    dispatch(addLoan({ accountID: props.accountID, loanDate, loanAmount }));
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
      {!isFormValid && <p>Enter Valid Amount and Date..</p>}
      {addLoanStatus === "failed" && (
        <p> Something went wrong, {addLoanError} Loan is not added..</p>
      )}
      {addLoanStatus === "success" && <p>Loan added successfully 👍..</p>}
    </form>
  );
};
