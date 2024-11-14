import { FC, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Button, Card, Form, Row, Space, Typography } from "antd";
import { Input } from "../../components/input/Input";
import { PasswordInput } from "../../components/passwordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useLoginMutation, UserData } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/errorMessage/ErrorMessage";

export const Login: FC = () => {
	const navigate = useNavigate();
	const [loginUser] = useLoginMutation();
	const [error, setError] = useState("");

	const onLoginForm = async (data: UserData) => {
		try {
			await loginUser(data).unwrap();
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
					title="Login form"
					style={{ width: "30rem" }}>
					<Form onFinish={onLoginForm}>
						<Input
							type="email"
							name="email"
							placeholder="Enter email"
						/>
						<PasswordInput
							name="password"
							placeholder="Enter password"
						/>
						<Button
							type="default"
							htmlType="submit">
							Log in
						</Button>
					</Form>
					<Space
						direction="vertical"
						size="large">
						<Typography.Text>
							Don't have an account?{" "}
							<Link to={Paths.register}>Register</Link>
						</Typography.Text>
						<ErrorMessage message={error} />
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};
