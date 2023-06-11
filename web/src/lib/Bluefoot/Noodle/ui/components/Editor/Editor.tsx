import EditorViewport from "./EditorViewport";
import { useEffect, useMemo, useState } from "preact/hooks";
import { memo } from "preact/compat";
import { NodeRender } from "../Node/NodeRender";
import NodeConnectionLayer, { NodeConnectionItem } from "./NodeConntectionLayer";
import { useBluefootModule } from "@Bluefoot";

import NDL_STD_RAW from "bundle-text:~/src/resources/ndl/std.ndl";
import { CVectorToArray } from "@Bluefoot/BluefootUtil";
import { INode } from "@Noodle/ctypes/Node";
import { Graph } from "@Noodle/ctypes/Graph";
import withHOCs from "@modules/Util/withHOCs";
import { EditorContextProvider, useEditorContext } from "@Noodle/ui/modules/EditorContext";

interface GraphNode {
    x : number,
    y : number,
    node : string
}



const NodeLayer = () => {
    const { graph } = useEditorContext();
    if(!graph) return null;
    return <div class="pointer-events-none absolute top-0 left-0 w-full h-full">
        {
            CVectorToArray(graph.getNodeIDs()).map(nodeId => {
                const {node, x, y} = graph.getNode(nodeId);
                return <NodeRender node={node} position={[x, y]} key={nodeId}/>
            })
        }
</div>
};

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

function Editor() {
    const Module = useBluefootModule();

    const { graph, advance } = useEditorContext();

    useEffect(() => {
        if(!Module || !graph) return undefined;

        const pa = new Module.NoodleParser();
        pa.setData(NDL_STD_RAW);
        pa.parse();

        const parsed = CVectorToArray(pa.getElements())
            .map(el => Module.NoodleNodeDefinition.fromParserElement(el));

        const layout : GraphNode[] = [
            { node: "onKeyEvent", x: -40, y: 20 },
            { node: "stringLength", x: 200, y: 200 },
            { node: "numberToString", x: 450, y: 20 },
            { node: "logString", x: 725, y: 20 },
        ]

        const ids = layout.map(p => 
            graph.createNodeFromDefinition(
                parsed.find(x => x.type == p.node)!,
                p.x,
                p.y
            )
        );

        graph.addConnection(
            { nodeId: ids[0], pinName: "pressed" },
            { nodeId: ids[2], pinName: "execute" },
        )

        graph.addConnection(
            { nodeId: ids[0], pinName: "key" },
            { nodeId: ids[1], pinName: "string" },
        )

        graph.addConnection(
            { nodeId: ids[1], pinName: "length" },
            { nodeId: ids[2], pinName: "number" },
        )

        graph.addConnection(
            { nodeId: ids[2], pinName: "then" },
            { nodeId: ids[3], pinName: "execute" },
        )

        graph.addConnection(
            { nodeId: ids[2], pinName: "string" },
            { nodeId: ids[3], pinName: "string" },
        )
        advance();
    }, [graph]);

    return <EditorViewport 
        initialPosition={[-150, -100]} initialScale={1.2}
    >
        <NodeLayer/>
        <NodeConnectionLayer/>
    </EditorViewport>
}

export default withHOCs(Editor, EditorContextProvider);