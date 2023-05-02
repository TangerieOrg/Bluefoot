import LinePath from "@SVGUtil/LinePath";
import { useMemo } from "preact/hooks";

export interface NodeConnectionItem {
    start : [number, number],
    end : [number, number]
}

const lerp = (a : number, b : number, t : number) => a*(1-t)+b*t;

const STEPS : [pX : number, pY : number][] = [
    [0, 0],
    [0.3, 0],
    [0.5, 0.5],
    [0.7, 1],
    [1, 1]
]
const calcPoints = ({ start, end } : NodeConnectionItem) : [number, number][] => {
    return STEPS.map(([xPerc, yPerc]) => ([
        lerp(start[0], end[0], xPerc),
        lerp(start[1], end[1], yPerc)
    ]))
}


const NodeConnection = ({ conn } : { conn : NodeConnectionItem}) => {
    const points = useMemo(() => calcPoints(conn), [conn]);

    return <g class="hover:stroke-[3] pointer-events-auto transition-all">
        <LinePath points={points}/>
    </g>

}

interface Props {
    connections : NodeConnectionItem[]
}

export default function NodeConnectionLayer({ connections } : Props) {
    return <svg class="absolute top-0 left-0 w-full h-full stroke-white stroke-2 pointer-events-none fill-none">
        {
            connections.map(x => <NodeConnection conn={x}/>)
        }
    </svg>
}