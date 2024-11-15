import { FC, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Button, Card, Form, Row, Space, Typography } from "antd";
import { Input } from "../../components/input/Input";
import { PasswordInput } from "../../components/passwordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/errorMessage/ErrorMessage";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register: FC = () => {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [registerUser] = useRegisterMutation();

	const handleRegister = async (data: RegisterData) => {
		try {
			await registerUser(data).unwrap();
			navigate("/");
		} catch (error) {
			const maybeError = isErrorWithMessage(error);
			if (maybeError) {
				setError(error.data.message);
			} else {
				setError("Something went wrong");
			}
		}
	};

	return (
		<Layout>
			<Row
				align="middle"
				justify="center">
				<Card
					title="Register form"
					style={{ width: "30rem" }}>
					<Form onFinish={handleRegister}>
						<Input
							type="text"
							name="name"
							placeholder="Enter name"
						/>
						<Input
							type="email"
							name="email"
							placeholder="Enter email"
						/>
						<PasswordInput
							name="password"
							placeholder="Enter password"
						/>
						<PasswordInput
							name="confirmPassword"
							placeholder="Confirm password"
						/>
						<Button
							type="default"
							htmlType="submit">
							Register
						</Button>
					</Form>
					<Space
						direction="vertical"
						size="large">
						<Typography.Text>
							Have an account?{" "}
							<Link to={Paths.login}>Log in</Link>
						</Typography.Text>
						<ErrorMessage message={error} />
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};
