import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Navigate } from 'react-router-dom';
import { appRoute } from '../../utils/routes';
import React from 'react';

const PublicRoute = ({ children }: { children: ReactNode }) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.persist.authReducer.isAuth);
  const { forceRedirectLocation } = useAppSelector((state) => state.persist.appReducer);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  if (isAuth && forceRedirectLocation !== '') {
    return <Navigate to={forceRedirectLocation} />;
  } else if (isAuth) {
    return <Navigate to={appRoute.block} />;
  }

  return children;
};

export default PublicRoute;
