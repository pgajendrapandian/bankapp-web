import React, { useRef, useState } from 'react'
import classes from './Form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addTransaction } from '../api/api'
import { accountsActions } from '../store/data-store'

const FormTransaction = (props) => {
    const [isFormValid, setFormValid] = useState(true)
    const { addTransactionStatus } = useSelector(state => state.accounts)
    let principalAmountRef = useRef()
    let interestAmountRef = useRef()
    let dateRef = useRef()
    const dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(accountsActions.closeTransactionModal())
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (new Date(dateRef.current.value) > new Date()) {
            setFormValid(false)
            return
        }
        dispatch(addTransaction({
            accountID: props.accountID,
            loanID: props.loanID,
            prinicipalAmount: principalAmountRef.current.value,
            interestAmount: interestAmountRef.current.value,
            transactionDate: dateRef.current.value
        }))
        principalAmountRef = interestAmountRef = dateRef = null
        dispatch(accountsActions.setSelectedLoanID(null))
    }
    return (
        <form className={classes['form']} onSubmit={onSubmitHandler}>
            <div className={classes['form-input']}>
                <label htmlFor='date'>Transaction Date: </label>
                <input type="date" id="date" className={classes["form-date"]} ref={dateRef}></input>
            </div>
            <div className={classes['form-input']}>
                <label htmlFor="prinicipal-amount">Prinicipal Amount: </label>
                <input type="number" id="prinicipal-amount" className={classes["form-amount"]} ref={principalAmountRef}></input>
            </div>
            <div className={classes['form-input']}>
                <label htmlFor="interest-amount">Interest Amount: </label>
                <input type="number" id="interest-amount" className={classes["form-amount"]} ref={interestAmountRef}></input>
            </div>
            <div className={classes['btn-container']}>
                <button className={classes['btn-cancel']} onClick={onClickHandler}>Cancel</button>
                <button className={classes['btn-submit']} type='submit'>Submit</button>
            </div>
            {!isFormValid && <p>Enter Valid Amount and Date..</p>}
            {addTransactionStatus === 'failed' && <p> Something went wrong, Loan is not added..</p>}
        </form >)
}

export default FormTransaction