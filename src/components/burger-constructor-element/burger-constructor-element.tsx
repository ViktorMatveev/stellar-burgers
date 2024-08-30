import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { burgerConstructorActions } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(
        burgerConstructorActions.reorderConstructor({
          from: index,
          to: index + 1
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        burgerConstructorActions.reorderConstructor({
          from: index,
          to: index - 1
        })
      );
    };

    const handleClose = () => {
      dispatch(burgerConstructorActions.removeItem(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
