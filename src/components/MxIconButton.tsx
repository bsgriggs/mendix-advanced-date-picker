import { createElement, ReactElement, CSSProperties, forwardRef } from "react";
import { WebIcon } from "mendix";
import { Icon } from "mendix/components/web/Icon";
import classNames from "classnames";

interface IconProps {
    icon: WebIcon;
    tabIndex: number;
    onClick: () => void;
    title: string;
    disabled: boolean;
    style?: CSSProperties;
}

const MxIconButton = forwardRef<HTMLButtonElement, IconProps>(
    (props, ref): ReactElement => (
        <button
            ref={ref}
            onClick={!props.disabled ? props.onClick : undefined}
            aria-label={props.title}
            title={props.title}
            tabIndex={props.tabIndex}
            style={props.style}
            aria-disabled={props.disabled}
            className={classNames("mx-icon-button", { disabled: props.disabled })}
        >
            {Icon({ icon: props.icon, altText: props.title }) as ReactElement}
        </button>
    )
);

export default MxIconButton;
