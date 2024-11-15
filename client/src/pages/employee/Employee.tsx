import { FC, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
	useGetEmployeeQuery,
	useRemoveEmployeeMutation,
} from "../../app/services/employees";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Descriptions, Divider, Modal, Space } from "antd";
import { Button } from "../../components/button/Button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ErrorMessage } from "../../components/errorMessage/ErrorMessage";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export const Employee: FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const params = useParams<{ id: string }>();
	const { data, isLoading } = useGetEmployeeQuery(params.id || "");
	const [removeEmployee] = useRemoveEmployeeMutation();
	const user = useSelector(selectUser);

	if (isLoading) {
		return <span>Loading...</span>;
	}
	if (!data) {
		return <Navigate to="/" />;
	}

	const showModal = () => {
		setIsModalOpen(true);
	};

	const hideModal = () => {
		setIsModalOpen(false);
	};

	const handleDeleteUser = async () => {
		hideModal();
		try {
			await removeEmployee(data.id).unwrap();
			navigate(`${Paths.status}/deleted`);
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
			<Descriptions
				title="Info about employee"
				bordered={true}>
				<Descriptions.Item
					label="Name"
					span={3}>
					{`${data.firstName} ${data.lastName}`}
				</Descriptions.Item>
				<Descriptions.Item
					label="Age"
					span={3}>
					{data.age}
				</Descriptions.Item>
				<Descriptions.Item
					label="Address"
					span={3}>
					{data.address}
				</Descriptions.Item>
			</Descriptions>
			{user?.id === data.userId && (
				<>
					<Divider orientation="left">Actions</Divider>
					<Space>
						<Link to={`/employee/edit/${data.id}`}>
							<Button
								type="default"
								shape="round"
								icon={<EditOutlined />}>
								Edit
							</Button>
						</Link>
						<Button
							type="default"
							shape="round"
							danger
							onClick={showModal}
							icon={<DeleteOutlined />}>
							Delete
						</Button>
					</Space>
				</>
			)}
			<ErrorMessage message={error} />
			<Modal
				title="Accept delete"
				open={isModalOpen}
				onOk={handleDeleteUser}
				onCancel={hideModal}
				okText="Accept"
				cancelText="Cancel">
				Are you really want to delete employee from table?
			</Modal>
		</Layout>
	);
};
