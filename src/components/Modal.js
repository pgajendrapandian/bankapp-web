import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'
import { accountsActions } from '../store/data-store'
import { useDispatch } from 'react-redux'

export const Modal = (props) => {
    const dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(accountsActions.closeModal())
    }
    return ReactDOM.createPortal(
        <Fragment>
            <div className={classes['backdrop-container']} onClick={onClickHandler}></div>
            <div className={classes['modal-container']}>
                <button className={classes['btn-close']} onClick={onClickHandler}>❌</button>
                {props.children}
            </div>
        </Fragment>, document.getElementById('modal')
    )
}

export default Modal