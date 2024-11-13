import { FC } from "react";
import { Form, Input as AntInput } from "antd";
import { NamePath } from "antd/es/form/interface";

interface PasswordInputProps {
	name: string;
	placeholder: string;
	dependencies?: NamePath[];
}

export const PasswordInput: FC<PasswordInputProps> = ({
	name,
	placeholder,
	dependencies,
}) => {
	return (
		<Form.Item
			name={name}
			dependencies={dependencies}
			hasFeedback={true}
			rules={[
				{
					required: true,
					message: "Field is required",
				},
				({ getFieldValue }) => ({
					validator(_, value) {
						if (!value) {
							return Promise.resolve();
						}
						if (name === "confirmPassword") {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error("Password must be the same")
							);
						} else {
							if (value.length < 6) {
								return Promise.reject(
									new Error(
										"Password must have more than 6 characters"
									)
								);
							}
							return Promise.resolve();
						}
					},
				}),
			]}>
			<AntInput.Password
				placeholder={placeholder}
				size="large"
			/>
		</Form.Item>
	);
};
