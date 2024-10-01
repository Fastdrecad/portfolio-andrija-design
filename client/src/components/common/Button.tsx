import { ReactNode } from "react";

import { motion, MotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonNativeProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style"
>;

// Extend the props with both MotionProps and the modified Button HTML attributes
interface ButtonProps extends MotionProps, ButtonNativeProps {
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

// Reusable Button component
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  icon,
  className,
  style,
  ...props
}) => {
  return (
    <motion.button
      className={`btn btn--${variant}  ${className ? className : ""}`}
      disabled={disabled || loading}
      style={style}
      {...props}
    >
      {loading ? (
        <span className="btn__loader"></span>
      ) : (
        <>
          {icon && <span className="btn__icon">{icon}</span>} {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
