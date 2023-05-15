import EditorViewport from "./EditorViewport";
import { useEffect, useState } from "preact/hooks";
import { memo } from "preact/compat";
import { NodeRender } from "../Node/NodeRender";
import NodeConnectionLayer, { NodeConnectionItem } from "./NodeConntectionLayer";
import { useBluefootModule } from "@Bluefoot";

import NDL_STD_RAW from "bundle-text:~/src/resources/ndl/std.ndl";
import { CVectorToArray } from "@Bluefoot/BluefootUtil";
import { INode } from "@Noodle/ctypes/Node";

interface NodePlacement {
    x : number,
    y : number,
    node : INode,
    id? : number
}

interface GraphNode {
    x : number,
    y : number,
    node : string
}

const graph : GraphNode[] = [
    { node: "onKeyEvent", x: -40, y: 20 },
    { node: "stringLength", x: 200, y: 200 },
    { node: "numberToString", x: 450, y: 20 },
    { node: "logString", x: 725, y: 20 },
]

const NodeLayer = memo(({ nodes } : { nodes: NodePlacement[] }) => <div class="pointer-events-none absolute top-0 left-0 w-full h-full">
    {
        nodes.map(({ x, y, node, id}) => <NodeRender node={node} position={[x, y]} key={id}/>)
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
    const Module = useBluefootModule();

    const [nodes, setNodes] = useState<NodePlacement[]>([]);

    useEffect(() => {
        if(!Module) return;
        const pa = new Module.NoodleParser();
        pa.setData(NDL_STD_RAW);
        pa.parse();

        const parsed = CVectorToArray(pa.getElements())
            .map(el => Module.NoodleNodeDefinition.fromParserElement(el));

        setNodes(graph.map(({ node, x, y }, id) => (
            {
                node: Module.NoodleStandardNode.fromDefinition(parsed.find(p => p.type === node)!),
                x, y, id  
            }
        )));

    }, [Module]);

    return <EditorViewport 
        initialPosition={[-150, -100]} initialScale={1.2}
    >
        <NodeConnectionLayer connections={connections}/>
        <NodeLayer nodes={nodes}/>
    </EditorViewport>
}