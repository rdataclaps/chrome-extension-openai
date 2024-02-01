import React, { useEffect, useState } from 'react';
import { json, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authAxios from '../services/authAxios';
import { loggedInUserAfterRefresh, signOut } from '../redux/actions/authActions';
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";


const ProtectedRoutes = ({ element }) => {
  let isAuth = Cookies.get('isAuthenticated')
  
  const { isAuthenticated } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(loggedInUserAfterRefresh(JSON.parse(isAuth)))
    }
  }, [])

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
