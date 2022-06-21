import React, { Fragment } from 'react'
import classes from './AccountDetails.module.css'
import TransactionItem from './TransactionItem'
import Modal from './Modal'
import FormTransaction from './FormTransaction'
import { useDispatch, useSelector } from 'react-redux'
import { accountsActions } from '../store/data-store'

const LoanItem = (props) => {
    const dispatch = useDispatch()
    const { isModelTransactionOpen, selectedLoanID } = useSelector(state => state.accounts)
    const { loan } = props
    const loanDate = new Date(loan.loanDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
    const onClickHandler = () => {
        dispatch(accountsActions.setSelectedLoanID(loan['_id']))
        dispatch(accountsActions.openTransactionModal())
    }
    const transactionItems = (<Fragment>
        <h3 className={classes["transactions-title"]}>Transactions</h3>
        <ul className="transactions-items">
            <li className={classes["transactions-title"]}>
                <h2 className={classes["transaction-date"]}>Date</h2>
                <h2 className={classes["prinicipal-amount"]}>Prinicipal</h2>
                <h2 className={classes["interest-amount"]}>Interest</h2>
            </li>
            {loan.transactions.map(transaction => <TransactionItem transaction={transaction} key={transaction["_id"]} />)}
        </ul>
    </Fragment>)
    return (
        <div className={classes["loan-container"]}>
            <h3 className={classes["loan-number"]}>{`Loan - ${props.loanNo}`}</h3>
            <div className={classes["loan-summary"]}>
                <div className={classes["loan-date"]}>
                    <h3>Date</h3>
                    <p>{loanDate}</p>
                </div>
                <div className={classes["loan-amount"]}>
                    <h3>Loan</h3>
                    <p>{loan.loanAmount}</p>
                </div>
                <div className={classes["outstanding-amount"]}>
                    <h3>Outstanding</h3>
                    <p>{loan.outStandingAmount}</p>
                </div>
                <div className={classes["interest-amount"]}>
                    <h3>Interest</h3>
                    <p>{loan.interestAmount}</p>
                </div>
            </div>
            {loan.transactions.length > 0 ? transactionItems : <h3>No Transactions Found...</h3>}
            <button className={`${classes["btn"]}  ${classes["btn-transaction"]}`} onClick={onClickHandler}>Add Transaction</button>
            {isModelTransactionOpen && selectedLoanID === loan['_id'] && <Modal><FormTransaction accountID={props.accountID} loanID={loan['_id']} /></Modal>}
        </div>
    )
}

export default LoanItem