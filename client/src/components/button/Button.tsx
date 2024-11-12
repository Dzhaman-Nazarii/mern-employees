import { FC, ReactNode } from "react";
import { Button as AntButton, Form } from "antd";

interface ButtonProps {
	children: ReactNode;
	onClick?: () => void;
	htmlType?: "button" | "submit" | "reset" | undefined;
	type?: "default" | "link" | "text" | "primary" | "dashed" | undefined;
	danger?: boolean;
	loading?: boolean;
	shape?: "default" | "circle" | "round" | undefined;
	icon?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
	children,
	onClick,
	htmlType = "button",
	type,
	danger,
	loading,
	shape,
	icon,
}) => {
	return (
		<Form.Item>
			<AntButton
				onClick={onClick}
				htmlType={htmlType}
				type={type}
				danger={danger}
				loading={loading}
				shape={shape}
				icon={icon}>
				{children}
			</AntButton>
		</Form.Item>
	);
};
