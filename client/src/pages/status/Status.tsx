import { Button, Result, Row } from "antd";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";

const STATUSES: Record<string, string> = {
	created: "User created successfully",
	updated: "User updated successfully",
	deleted: "User deleted successfully",
};

export const Status: FC = () => {
	const { status } = useParams();

	return (
		<Row
			align="middle"
			justify="center"
			style={{ width: "100%" }}>
			<Result
				status={status ? "success" : 404}
				title={status ? STATUSES[status] : "Not found"}
				extra={
					<Button key="dashboard">
						<Link to={"/"} >Home</Link>
					</Button>
				}
			/>
		</Row>
	);
};
