import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import st from "./style.module.scss";

type ButtonProps = {
	children: ReactNode;
	className?: string;
} & ComponentPropsWithoutRef<"button">;

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
	return (
		<button className={`${st.btn} ${className}`} {...props}>
			{children}
		</button>
	);
};

export default Button;
