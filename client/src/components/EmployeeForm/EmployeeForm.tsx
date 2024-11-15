import { FC } from "react";
import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { Input } from "../input/Input";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import { Button } from "../button/Button";

interface EmployeeFormProps<T> {
	onFinish: (values: T) => void;
	btnText: string;
	title: string;
	error?: string;
	employee?: T;
}

export const EmployeeForm: FC<EmployeeFormProps<Employee>> = ({
	onFinish,
	btnText,
	title,
	error,
	employee,
}) => {
	return (
		<Card
			title={title}
			style={{ width: "30rem" }}>
			<Form
				name="employee-form"
				onFinish={onFinish}
				initialValues={employee}>
				<Input
					type="text"
					name="firstName"
					placeholder="Name"
				/>
				<Input
					type="text"
					name="lastName"
					placeholder="Last name"
				/>
				<Input
					type="number"
					name="age"
					placeholder="Age"
				/>
				<Input
					type="text"
					name="address"
					placeholder="Address"
				/>
				<Space>
					<ErrorMessage message={error} />
					<Button htmlType="submit">{btnText}</Button>
				</Space>
			</Form>
		</Card>
	);
};
