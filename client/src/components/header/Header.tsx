import { FC } from "react";
import { Layout, Space, Typography } from "antd";
import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import css from "./Header.module.css";

export const Header: FC = () => {
	return (
		<Layout.Header className={css.header}>
			<Space>
				<TeamOutlined className={css.teamIcon} />
				<Link to={Paths.home}>
					<Button type="primary">
						<Typography.Title level={1}>Employees</Typography.Title>
					</Button>
				</Link>
			</Space>
			<Space>
				<Link to={Paths.register}>
					<Button
						type="primary"
						icon={<UserOutlined />}>
						Register
					</Button>
				</Link>
			</Space>
			<Space>
				<Link to={Paths.login}>
					<Button
						type="primary"
						icon={<LoginOutlined />}>
						Login
					</Button>
				</Link>
			</Space>
		</Layout.Header>
	);
};
