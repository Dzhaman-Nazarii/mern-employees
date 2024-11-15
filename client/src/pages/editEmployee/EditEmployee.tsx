import { FC, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import {
	useEditEmployeeMutation,
	useGetEmployeeQuery,
} from "../../app/services/employees";
import { Row } from "antd";
import { EmployeeForm } from "../../components/EmployeeForm/EmployeeForm";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export const EditEmployee: FC = () => {
	const navigate = useNavigate();
	const params = useParams<{ id: string }>();
	const [error, setError] = useState("");
	const { data, isLoading } = useGetEmployeeQuery(params.id || "");
	const [editEmployee] = useEditEmployeeMutation();

	if (isLoading) {
		return <span>Loading</span>;
	}

	const handleEditUser = async (employee: Employee) => {
		try {
			const editedEmployee = {
				...data,
				...employee,
			};

			await editEmployee(editedEmployee).unwrap();
			navigate(`${Paths.status}/updated`);
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
				<EmployeeForm
					title="Edit employee"
					btnText="Edit"
					error={error}
					employee={data}
					onFinish={handleEditUser}
				/>
			</Row>
		</Layout>
	);
};
