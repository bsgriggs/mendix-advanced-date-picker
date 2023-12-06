import { createElement, ReactElement, MouseEvent, KeyboardEvent, useCallback, CSSProperties } from "react";
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

const MxIcon = (props: IconProps): ReactElement => {
    const onClickHandler = useCallback(
        (event: MouseEvent<any>): void => {
            event.stopPropagation();
            props.onClick();
        },
        [props.onClick]
    );

    const onKeyDownHandler = useCallback(
        (event: KeyboardEvent<any>): void => {
            if (event.key === "Enter" || event.key === " ") {
                event.stopPropagation();
                event.preventDefault();
                props.onClick();
            }
        },
        [props.onClick]
    );

    return (
        <div
            onClick={!props.disabled ? onClickHandler : undefined}
            onKeyDown={!props.disabled ? onKeyDownHandler : undefined}
            aria-label={props.title}
            title={props.title}
            tabIndex={props.tabIndex}
            role={"button"}
            style={props.style}
            aria-disabled={props.disabled}
            className={classNames("mx-icon-button", { disabled: props.disabled })}
        >
            {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
                    @ts-ignore */}
            <Icon icon={props.icon} />
        </div>
    );
};

export default MxIcon;
