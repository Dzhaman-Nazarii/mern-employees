import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Paths } from "./paths";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { ConfigProvider, theme } from "antd";
import { Auth } from "./features/auth/Auth";
import "./index.css";
import { Employees } from "./pages/employees/Employees";
import { AddEmloyee } from "./pages/addEmployee/AddEmloyee";
import { Status } from "./pages/status/Status";
import { Employee } from "./pages/employee/Employee";
import { EditEmployee } from "./pages/editEmployee/EditEmployee";

const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <Employees />,
	},
	{
		path: Paths.login,
		element: <Login />,
	},
	{
		path: Paths.register,
		element: <Register />,
	},
	{
		path: Paths.employeeAdd,
		element: <AddEmloyee />,
	},
	{
		path: `${Paths.status}/:status`,
		element: <Status />,
	},
	{
		path: `${Paths.employee}/:id`,
		element: <Employee />,
	},
	{
		path: `${Paths.employeeEdit}/:id`,
		element: <EditEmployee />,
	},
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
				<Auth>
					<RouterProvider router={router} />
				</Auth>
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
