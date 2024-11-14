import { ReactElement } from "react";
import { useCurrentQuery } from "../../app/services/auth";

export const Auth = ({ children }: { children: ReactElement }) => {
	const { isLoading } = useCurrentQuery();
	if (isLoading) {
		return <span>Loading...</span>;
	}
	return children;
};
