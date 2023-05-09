import { ComponentChildren } from "preact";

export interface PositionedContainerProps {
    position: [number, number];
    class?: string;
    children: ComponentChildren;
}

export function PositionedContainer({ position: [left, top], children, ...props} : PositionedContainerProps) {
    return <div class={`absolute ${props.class ?? ""}`} style={{left, top}}>
        {children}
    </div>;
}