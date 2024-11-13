import { FC } from "react";
import { Form, Input as AntInput } from "antd";

interface InputProps {
	name: string;
	placeholder: string;
	type: string;
}

export const Input: FC<InputProps> = ({ name, placeholder, type = "text" }) => {
	return (
		<Form.Item
			name={name}
			rules={[{ required: true, message: "Field is required" }]}
			shouldUpdate={true}>
			<AntInput
				placeholder={placeholder}
				type={type}
				size="large"
			/>
		</Form.Item>
	);
};
