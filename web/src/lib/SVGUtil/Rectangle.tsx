import { ComponentChildren, JSX } from "preact";
import Group from "./Group";

type Props = {children? : ComponentChildren} & JSX.SVGAttributes<SVGRectElement>

export default function Rectangle({children, x, y, ...props} : Props) {
    return <>
        <rect {...props} x={x} y={y}/>
        <Group x={x} y={y}>
            {children}
        </Group>
    </>
}