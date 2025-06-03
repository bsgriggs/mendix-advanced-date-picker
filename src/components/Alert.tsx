import { FunctionComponent, createElement, ReactElement, ReactNode } from "react";
export interface AlertProps {
    alertStyle?: "default" | "primary" | "success" | "info" | "warning" | "danger";
    className?: string;
    children: ReactNode;
}
export const Alert: FunctionComponent<AlertProps> = ({ alertStyle, children }): ReactElement | null =>
    children ? (
        <div className={`alert alert-${alertStyle} mx-validation-message`} role="alert">
            {children}
        </div>
    ) : null;
Alert.displayName = "Alert";
Alert.defaultProps = { alertStyle: "danger" };
