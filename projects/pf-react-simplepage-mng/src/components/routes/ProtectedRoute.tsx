import { ReactNode, useEffect } from 'react';
import { useAppSelector } from '../../store/store';
import { Navigate, useLocation } from 'react-router-dom';
import { appRoute } from '../../utils/routes';
import React from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const isAuth = useAppSelector((state) => state.persist.authReducer.isAuth);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  // useEffect(() => {
  //   console.log('isAuth :>> ', isAuth);
  //   console.log('location :>> ', location);
  // }, [isAuth]);
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  if (!isAuth) {
    return <Navigate to={appRoute.login} />;
  }
  return children;
};

export default ProtectedRoute;
