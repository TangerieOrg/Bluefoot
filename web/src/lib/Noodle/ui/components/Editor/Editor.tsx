// BaklavaJS Example
// https://jyc6f.csb.app/

import EditorViewport from "./EditorViewport";
import { NodeDefinition } from "@Noodle/types/Node";
import { useMemo } from "preact/hooks";
import { memo } from "preact/compat";
import { NoodleSTD } from "@Noodle/std";
import { NodeRender } from "../Node/NodeRender";

interface NodePlacement {
    x : number,
    y : number,
    def : NodeDefinition<string, string>,
    id? : number
}

const nodesToPlace : NodePlacement[] = [
    { def: NoodleSTD.OnKeyEvent, x: -40, y: 20 },
    { def: NoodleSTD.StringLength, x: 250, y: 150 },
    { def: NoodleSTD.NumberToString, x: 600, y: 20 },
    { def: NoodleSTD.LogString, x: 825, y: 20 },
]

const NodeLayer = memo(({ nodes } : { nodes: NodePlacement[] }) => <div class="pointer-events-none absolute top-0 left-0 w-full h-full">
    {
        nodes.map(({ x, y, def, id}) => <NodeRender node={def} position={[x, y]} key={id}/>)
    }
</div>)

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
        {/* <NodeConnectionLayer connections={connections}/> */}
        <NodeLayer nodes={nodes}/>
    </EditorViewport>
}