import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AccountDetails from '../components/AccountDetails'

const Account = () => {
    const { accountID } = useParams()
    return (
        <AccountDetails accountID={accountID} />
    )
}

export default Account