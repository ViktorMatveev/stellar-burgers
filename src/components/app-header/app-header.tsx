import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userData = useSelector(userSelectors.getUser);
  const useName = userData?.name;
  return <AppHeaderUI userName={useName || ''} />;
};
