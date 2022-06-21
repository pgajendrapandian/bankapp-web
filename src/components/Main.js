import { useSelector, useDispatch } from "react-redux";
import classes from "./Main.module.css";
import AccountItem from "./AccountItem";
import { getAccounts } from "../api/api";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, accounts, accountsError } = useSelector(
    (state) => state.accounts
  );
  useEffect(() => {
    if (accountsError === "JsonWebTokenError") {
      navigate("/", { replace: true });
    }
    dispatch(getAccounts());
  }, [dispatch, accountsError]);
  return (
    <main className={classes["main"]}>
      {status === "loading" && <h3>Loading... Please wait</h3>}
      {status === "errored" && <h3>Error: {accountsError}</h3>}
      {status === "success" && (
        <Fragment>
          <section className={classes["total-section"]}>
            <div className={classes["total-section-item"]}>
              <h3>No of Loans</h3>
              <p>{accounts.length}</p>
            </div>
            <div className={classes["total-section-item"]}>
              <h3>Total Outstanding</h3>
              <p>
                {accounts.reduce(
                  (acc, account) => (acc += account.totalOutStanding),
                  0
                )}
              </p>
            </div>
            <div className={classes["total-section-item"]}>
              <h3>Total Interest</h3>
              <p>
                {accounts.reduce(
                  (acc, account) => (acc += account.totalInterest),
                  0
                )}
              </p>
            </div>
          </section>
          <section className={classes["accounts-section"]}>
            <ul className={classes["accounts-section-items"]}>
              <AccountItem
                isTitle={true}
                name={"Account Name"}
                loanAmount={"Loan Amount"}
                outStandingAmount={"Outstanding Amount"}
                interestAmount={"Interest Paid"}
              />
              {accounts.map((account) => (
                <AccountItem
                  name={account.accountName}
                  loanAmount={account.totalLoan}
                  outStandingAmount={account.totalOutStanding}
                  interestAmount={account.totalInterest}
                  key={account["_id"]}
                  id={account["_id"]}
                />
              ))}
            </ul>
          </section>
        </Fragment>
      )}
    </main>
  );
};
