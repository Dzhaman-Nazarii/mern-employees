import { FC } from "react";
import { Layout } from "../../components/layout/Layout";
import { Button, Card, Form, Row, Space, Typography } from "antd";
import { Input } from "../../components/input/Input";
import { PasswordInput } from "../../components/passwordInput/PasswordInput";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

export const Login: FC = () => {
	return (
		<Layout>
			<Row
				align="middle"
				justify="center">
				<Card
					title="Login form"
					style={{ width: "30rem" }}>
					<Form onFinish={() => console.log("Finish form")}>
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
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};
