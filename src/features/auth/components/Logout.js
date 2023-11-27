import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navigate} from 'react-router-dom'
import { selectLoggedInUser, signOutAsync } from '../authSlice'

const Logout = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(() => {
        dispatch(signOutAsync(user._id));
    }, [])
    
  return (
    <>
        {!user && <Navigate to={"/login"} replace={true} />} {/* navigating if the signOutAsync is fulfilled */}
    </>
  )
}

export default Logout;