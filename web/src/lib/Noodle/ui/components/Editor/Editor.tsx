// BaklavaJS Example
// https://jyc6f.csb.app/

import EditorViewport from "./EditorViewport";
import { NodeDefinition } from "@Noodle/types/Node";
import { useMemo } from "preact/hooks";
import { memo } from "preact/compat";
import { NoodleSTD } from "@Noodle/std";
import { NodeRender } from "../Node/NodeRender";
import NodeConnectionLayer, { NodeConnectionItem } from "./NodeConntectionLayer";

interface NodePlacement {
    x : number,
    y : number,
    def : NodeDefinition<string, string>,
    id? : number
}

const nodesToPlace : NodePlacement[] = [
    { def: NoodleSTD.OnKeyEvent, x: -40, y: 20 },
    { def: NoodleSTD.StringLength, x: 200, y: 200 },
    { def: NoodleSTD.NumberToString, x: 450, y: 20 },
    { def: NoodleSTD.LogString, x: 725, y: 20 },
]

const NodeLayer = memo(({ nodes } : { nodes: NodePlacement[] }) => <div class="pointer-events-none absolute top-0 left-0 w-full h-full">
    {
        nodes.map(({ x, y, def, id}) => <NodeRender node={def} position={[x, y]} key={id}/>)
    }
</div>);

const W = 14;
const H = 16;

const connections : NodeConnectionItem[] = [
    {
        start: [120, 80],
        end: [468, 80]
    },
    {
        start: [120, 144],
        end: [218, 268]
    },
    {
        start: [368, 268],
        end: [468, 118]
    },
    {
        start: [636, 80],
        end: [743, 80]
    },
    {
        start: [636, 118],
        end: [743, 118]
    }
]
.map(({start, end}) => ({
    start: [start[0] - W/4, start[1] - H/2 + 6],
    end: [end[0] - W, end[1] - H/2 + 6]
}));


export default function Editor() {
    const nodes = useMemo<NodePlacement[]>(() => {
        return nodesToPlace.map((n, i) => ({
            ...n,
            id: i
        }))
    }, []);

    return <EditorViewport 
        initialPosition={[-150, -100]} initialScale={1.2}
        >
        <NodeConnectionLayer connections={connections}/>
        <NodeLayer nodes={nodes}/>
    </EditorViewport>
}