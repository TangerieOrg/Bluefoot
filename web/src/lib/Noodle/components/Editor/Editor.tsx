// BaklavaJS Example
// https://jyc6f.csb.app/

import { Node } from "../Node";
import EditorViewport from "./EditorViewport";
import { NodeDefinition, PinType } from "@Noodle/types/Node";
import NodeConnectionLayer, { NodeConnectionItem } from "./NodeConntectionLayer";
import { ComponentWithProps } from "types/common";
import { useMemo } from "preact/hooks";
import { memo } from "preact/compat";

const AddNode : NodeDefinition = {
    title: "Add",
    inputs: [
        {
            name: "A",
            type: PinType.Number
        },
        {
            name: "B",
            type: PinType.Number
        },
    ],
    outputs: [
        {
            name: "Value",
            type: PinType.Number
        }
    ]
}

const NumberToStringNode : NodeDefinition = {
    title: "ToString (Number)",
    inputs: [
        {
            name: "execute",
            type: PinType.Execution
        },
        {
            name: "Number",
            type: PinType.Number
        },
        {
            name: "Round?",
            type: PinType.Boolean
        },
    ],
    outputs: [
        {
            name: "then",
            type: PinType.Execution
        },
        {
            name: "String",
            type: PinType.String
        }
    ]
}

const EventNode : NodeDefinition = {
    title: "On Key Event",
    inputs: [],
    outputs: [
        {
            name: "Pressed",
            type: PinType.Execution
        },
        {
            name: "Released",
            type: PinType.Execution
        },
        {
            name: "Key",
            type: PinType.String
        },
    ],
    type: "Event"
}

const StringLengthNode : NodeDefinition = {
    title: "Length (String)",
    type: "Pure",
    inputs: [
        {
            name: "String",
            type: PinType.String
        }
    ],
    outputs: [
        {
            name: "Length",
            type: PinType.Number
        }
    ]
}

const LogStringNode : NodeDefinition = {
    title: "Log String",
    type: "Development",
    inputs: [
        {
            name: "execute",
            type: PinType.Execution
        },
        {
            name: "String",
            type: PinType.String
        }
    ],
    outputs: [
        {
            name: "then",
            type: PinType.Execution
        },
    ]
}

interface NodePlacement {
    x : number,
    y : number,
    def : NodeDefinition,
    id? : number
}

const nodesToPlace : NodePlacement[] = [
    { def: EventNode, x: -40, y: 20 },
    { def: StringLengthNode, x: 200, y: 200 },
    { def: NumberToStringNode, x: 450, y: 20 },
    { def: LogStringNode, x: 725, y: 20 },
]

const NodeLayer = memo(({ nodes } : { nodes: NodePlacement[] }) => <div class="pointer-events-none absolute top-0 left-0 w-full h-full">
    {
        nodes.map(({ x, y, def, id}) => <Node node={def} position={[x, y]} key={id}/>)
    }
</div>)

// 14x16
// x => +- W/2

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
    start: [start[0] - W/4, start[1] - H/2],
    end: [end[0] - W, end[1] - H/2]
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