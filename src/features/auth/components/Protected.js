import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import {Navigate} from 'react-router-dom'
import { selectLoggedInUser } from '../authSlice'

// to protect all the routes
const ProtecteRoute = ({children}) => {
    const user = useSelector(selectLoggedInUser);
    if (!user) {
        return <Navigate to="/login" replace={true}></Navigate>
    }
  return children;
}

export default ProtecteRoute;