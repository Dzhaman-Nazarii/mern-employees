import { Alert } from "antd";
import { FC } from "react";

interface ErrorMessageProps {
	message?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({message}) => {
	if(!message) {
		return null;
	}
	return <Alert message={message} type="error"/>
};
