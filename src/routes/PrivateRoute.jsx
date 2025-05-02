/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const privateRoute = ({children, role}) => {
    const {user} = useSelector((state) => state.auth);
    const location = useLocation();
    if(!user){
      alert("You must be logged in to view this page.");
      return <Navigate to="/login" state={{from: location}} replace/>
    }
    if(role && user?.role !== role){
      alert("access denied");
      return <Navigate to="/login" state={{from: location}} replace/>
    }
  return children;
}

export default privateRoute;