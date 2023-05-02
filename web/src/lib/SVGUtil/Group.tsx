import { ComponentChildren, JSX } from "preact";

type SVGProps = JSX.SVGAttributes<SVGElement>;

interface Props {
    children?: ComponentChildren;
    class?: string;
    x: SVGProps["x"];
    y: SVGProps["y"];
}

export default function Group({x, y, children, ...props} : Props) {
    return <svg x={x} y={y}>
        <g class={props.class}>
            {children}
        </g>
    </svg>
}