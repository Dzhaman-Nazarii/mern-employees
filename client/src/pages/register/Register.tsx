import { FC } from "react";
import { Layout } from "../../components/layout/Layout";
import { Button, Card, Form, Row, Space, Typography } from "antd";
import { Input } from "../../components/input/Input";
import { PasswordInput } from "../../components/passwordInput/PasswordInput";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

export const Register: FC = () => {
	return (
		<Layout>
			<Row
				align="middle"
				justify="center">
				<Card
					title="Register form"
					style={{ width: "30rem" }}>
					<Form onFinish={() => console.log("Finish form")}>
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
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};
