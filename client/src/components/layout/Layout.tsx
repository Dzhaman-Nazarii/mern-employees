import { Layout as AntLayout } from "antd";
import { FC, ReactNode } from "react";
import css from "./Layout.module.css";
import { Header } from "../header/Header";

interface LayoutProps {
	children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<div className={css.main}>
			<Header/>
				<AntLayout.Content style={{ height: "100%" }}>
					{children}
				</AntLayout.Content>
		</div>
	);
};
