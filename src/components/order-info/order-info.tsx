import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientSelectors } from '../../services/slices/ingredientsSlice';
import { orderSelectors } from '../../services/slices/orderSlice';
import { useParams } from 'react-router-dom';
import { getOrderByNumber } from '../../services/thunk/order';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */

  const ingredients: TIngredient[] = useSelector(
    ingredientSelectors.getIngredients
  );
  const orders = useSelector(orderSelectors.getOrders);

  const dispatch = useDispatch();
  const { number } = useParams();

  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)));
  }, [dispatch, number]);

  const order = orders.find((order) => order.number == Number(number));

  const orderData = order
    ? {
        ...order,
        ingredients: order!.ingredients.map(
          (ingredient: TIngredient | string) =>
            typeof ingredient === 'string' ? ingredient : ingredient._id
        )
      }
    : undefined;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
