import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { userSelectors, userSlice } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getUser } from '../../services/thunk/user';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};
export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(userSelectors.getUser);
  const isAuthCheked = useSelector(userSelectors.getIsAuthChecked);

  // if (!isAuthCheked) {
  //   return <Preloader />;
  // }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to={'/login'} state={{ from: location }} />;
  }

  return children;
};
