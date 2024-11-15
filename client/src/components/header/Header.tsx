import { FC } from "react";
import { Layout, Space } from "antd";
import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "../button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import css from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

export const Header: FC = () => {
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	const onLogoutClick = () => {
		dispatch(logout());
		localStorage.removeItem("token");
		navigate("/login");
	};

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
			{user ? (
				<Button
					type="default"
					icon={<LoginOutlined />}
					onClick={onLogoutClick}>
					Logout
				</Button>
			) : (
				<>
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
				</>
			)}
		</Layout.Header>
	);
};
