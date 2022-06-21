import React from 'react'
import classes from './AccountDetails.module.css'

const TransactionItem = (props) => {
    const { transaction } = props
    const transactionDate = new Date(transaction.transactionDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
    return (
        <li className={classes["transactions-item"]}>
            <p className={classes["transaction-date"]}>{transactionDate}</p>
            <p className={classes["prinicipal-amount"]}>{transaction.prinicipalAmount}</p>
            <p className={classes["interest-amount"]}>{transaction.interestAmount}</p>
        </li>
    )
}

export default TransactionItem