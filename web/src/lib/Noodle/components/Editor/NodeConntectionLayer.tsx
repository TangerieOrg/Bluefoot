export interface NodeConnectionItem {
    start : [number, number],
    end : [number, number]
}


const SmoothPath = ({ start: [startX, startY], end: [endX, endY] } : { start: [number, number], end : [number, number]}) => (
    <path d={`
        M ${startX} ${startY}
        C ${(startX + endX) / 2} ${startY} ${(startX + endX) / 2} ${endY} ${endX} ${endY}
    `}/>
)

const NodeConnection = ({ conn } : { conn : NodeConnectionItem}) => {
    return <g class="hover:stroke-[3] pointer-events-auto transition-all">
        <SmoothPath start={conn.start} end={conn.end}/>
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