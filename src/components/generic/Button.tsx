interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, variant = 'secondary', disabled }) => {
  /**
   *  TODO :
   * Update to use clsx / tailwind-merge for className merging
   *
   * */

  return (
    <button
      type="button"
      className={`game-button game-button--${variant} ${className ?? ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
