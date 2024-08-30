import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  burgerConstructorActions,
  burgerConstructorSelectors
} from '../../services/slices/burgerConstructorSlice';
import { orderSelectors, resetOrder } from '../../services/slices/orderSlice';
import { userSelectors } from '../../services/slices/userSlice';
import { orderBurger } from '../../services/thunk/order';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorBun = useSelector(
    burgerConstructorSelectors.getBun
  ) as TConstructorIngredient;
  const constructorIngredients = useSelector(
    burgerConstructorSelectors.getIngredients
  ) as TConstructorIngredient[];

  const constructorItems = {
    bun: constructorBun,
    ingredients: constructorIngredients
  };

  const orderRequestStatus = useSelector(orderSelectors.getOrderRequestStatus);
  const orderRequest = orderRequestStatus === 'Loading' ? true : false;
  const orderModalData = useSelector(orderSelectors.getOrder);
  const user = useSelector(userSelectors.getUser);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsIds = [
      constructorBun._id,
      ...constructorIngredients.map((ingredient) => ingredient._id),
      constructorBun._id
    ];

    dispatch(orderBurger(ingredientsIds));
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(burgerConstructorActions.resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

function resetConstructor(): any {
  throw new Error('Function not implemented.');
}
// function resetConstructor(): any {
//   throw new Error('Function not implemented.');
// }
