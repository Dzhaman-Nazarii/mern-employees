import { FC, useEffect } from "react";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/button/Button";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import { ColumnsType } from "antd/es/table";
import { Employee } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

const columns: ColumnsType<Employee> = [
	{
		title: "Name",
		dataIndex: "firstName",
		key: "firstName",
	},
	{
		title: "Age",
		dataIndex: "age",
		key: "age",
	},
	{
		title: "Address",
		dataIndex: "address",
		key: "address",
	},
];

export const Employees: FC = () => {
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const { data, isLoading } = useGetAllEmployeesQuery();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		} else {

		}
	}, [user, navigate]);

	return (
		<Layout>
			<Button
				type="default"
				onClick={() => null}
				icon={<PlusCircleOutlined />}>
				Add
			</Button>
			<Table
				loading={isLoading}
				dataSource={data}
				pagination={false}
				columns={columns}
				rowKey={(record) => record.id}
				onRow={(record) => {
					return {
						onClick: () =>
							navigate(`${Paths.employee}/${record.id}`),
					};
				}}
			/>
		</Layout>
	);
};
