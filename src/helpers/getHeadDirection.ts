import { InputDirection } from '../input/inputs';

export const getHeadDirection = (inputDirection?: InputDirection): string => {
  switch (inputDirection) {
    case InputDirection.Up:
      return 'up';
    case InputDirection.Down:
      return 'down';
    case InputDirection.Left:
      return 'left';
    case InputDirection.Right:
      return 'right';
    default:
      return '';
  }
};
