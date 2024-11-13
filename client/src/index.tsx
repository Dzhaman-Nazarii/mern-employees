import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Paths } from "./paths";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Home } from "./pages/home/Home";
import { ConfigProvider, theme } from "antd";

const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <Home />,
	},
	{
		path: Paths.login,
		element: <Login />,
	},
	{
		path: Paths.register,
		element: <Register />,
	},
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
				<RouterProvider router={router}/>
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();