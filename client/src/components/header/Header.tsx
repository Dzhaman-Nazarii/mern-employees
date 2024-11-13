import { FC } from "react";
import { Layout, Space } from "antd";
import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import css from "./Header.module.css";

export const Header: FC = () => {
	return (
		<Layout.Header className={css.header}>
			<Space>
				<Link to={Paths.home}>
					<Button type="default">
					<TeamOutlined className={css.teamIcon} />
					Employees
					</Button>
				</Link>
			</Space>
			<Space>
				<Link to={Paths.register}>
					<Button
						type="default"
						icon={<UserOutlined />}>
						Register
					</Button>
				</Link>
			</Space>
			<Space>
				<Link to={Paths.login}>
					<Button
						type="default"
						icon={<LoginOutlined />}>
						Login
					</Button>
				</Link>
			</Space>
		</Layout.Header>
	);
};
