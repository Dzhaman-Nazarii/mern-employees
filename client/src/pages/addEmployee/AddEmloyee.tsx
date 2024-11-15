import { FC, useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Row } from "antd";
import { EmployeeForm } from "../../components/EmployeeForm/EmployeeForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useAddEmployeeMutation } from "../../app/services/employees";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export const AddEmloyee: FC = () => {
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const [addEmployee] = useAddEmployeeMutation();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	const handleAddEmployee = async (data: Employee) => {
		try {
			await addEmployee(data).unwrap();

			navigate(`${Paths.status}/created`);
		} catch (err) {
			const maybeError = isErrorWithMessage(err);
			if (maybeError) {
				setError(err.data.message);
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
				<EmployeeForm
					title="Add employee"
					btnText="Add"
					onFinish={handleAddEmployee}
					error={error}
				/>
			</Row>
		</Layout>
	);
};
