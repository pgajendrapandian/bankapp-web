import React, { useEffect } from "react";
import { getAccount } from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import classes from "./AccountDetails.module.css";
import LoanItem from "./LoanItem";
import Modal from "./Modal";
import { accountsActions } from "../store/data-store";
import { FormLoan } from "./FormLoan";
import { upperFirst } from "lodash";
import { useNavigate } from "react-router-dom";

const AccountDetails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isModalLoanOpen, account, accountError } = useSelector(
    (state) => state.accounts
  );
  useEffect(() => {
    if (accountError === "JsonWebTokenError") {
      navigate("/", { replace: true });
    }
    dispatch(getAccount(props.accountID));
  }, [dispatch, props.accountID, accountError]);
  const onClickHandler = () => {
    dispatch(accountsActions.openLoanModal());
  };

  return account.length === 0 ? (
    <p>Somthing went wrong..</p>
  ) : (
    <section className={classes["accountdetails"]}>
      <h2 className={classes["loan-account-name"]}>
        {upperFirst(account.accountName)}
      </h2>
      <div className={classes["loans-container"]}>
        {account.loans.map((loan, index) => (
          <LoanItem
            loan={loan}
            accountID={props.accountID}
            key={loan["_id"]}
            loanNo={index + 1}
          />
        ))}
      </div>
      <button className={classes["btn"]} onClick={onClickHandler}>
        Add Loan
      </button>
      {isModalLoanOpen && (
        <Modal>
          <FormLoan accountID={props.accountID} />{" "}
        </Modal>
      )}
    </section>
  );
};

export default AccountDetails;
