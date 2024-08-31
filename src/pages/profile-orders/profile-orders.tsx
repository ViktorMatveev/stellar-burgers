import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { orderSelectors } from '../../services/slices/orderSlice';
import { getOrders } from '../../services/thunk/order';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orders: TOrder[] = useSelector(orderSelectors.getOrders);
  console.log(orders);

  return <ProfileOrdersUI orders={orders} />;
};
