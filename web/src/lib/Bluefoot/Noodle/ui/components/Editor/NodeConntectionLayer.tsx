import { CVectorIter, CVectorToArray } from "@Bluefoot/BluefootUtil"
import { useEditorContext } from "@Noodle/ui/modules/EditorContext"
import { useEffect, useMemo } from "preact/hooks"

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

const getPosition = (el : HTMLElement | null) : [number, number] => {
    if(!el) return [0, 0];
    const p = getPosition(el.parentElement as HTMLElement);
    return [
        el.offsetLeft ?? 0 + p[0],
        el.offsetTop ?? 0 + p[1],
    ]
}

export default function NodeConnectionLayer() {
    const { trackedNodes, graph, state } = useEditorContext();

    const connections : NodeConnectionItem[] = useMemo(() => {
        const conns : NodeConnectionItem[] = []
        if(!graph) return conns;
        for(const c of CVectorIter(graph.getConnections())) {
            const from = trackedNodes.get(c.from.nodeId)!.pins.get(c.from.pinName)!;
            const to = trackedNodes.get(c.to.nodeId)!.pins.get(c.to.pinName)!;
            const fromPos = graph.getNode(c.from.nodeId);
            const toPos = graph.getNode(c.to.nodeId);
            
            const conn : NodeConnectionItem = {
                start: getPosition(from),
                end: getPosition(to)
            }

            conn.start[0] += fromPos.x + from.clientWidth;
            conn.start[1] += fromPos.y + from.clientHeight / 2;

            conn.end[0] += toPos.x;
            conn.end[1] += toPos.y + from.clientHeight / 2;

            conns.push(conn);
        }

        return conns
    }, [state]);

    if(!graph) return null;

    return <svg class="absolute top-0 left-0 w-full h-full stroke-white stroke-2 pointer-events-none fill-none">
        {   
            connections.map(x => <NodeConnection conn={x}/>)
        }
    </svg>
}