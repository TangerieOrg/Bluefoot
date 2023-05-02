// BaklavaJS Example
// https://jyc6f.csb.app/

import { Node } from "../Node";
import EditorViewport from "./EditorViewport";
import { PinType } from "@Noodle/types/Node";

const AddNode = ({ x, y }: { x: number, y: number }) => <Node node={{
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
}} position={[x, y]} />

const NumberToStringNode = ({ x, y }: { x: number, y: number }) => <Node node={{
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
}} position={[x, y]} />

const EventNode = ({ x, y }: { x: number, y: number }) => <Node node={{
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
}} position={[x, y]} />

const StringLengthNode = ({ x, y }: { x: number, y: number }) => <Node node={{
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
}} position={[x, y]} />

const LogStringNode = ({ x, y }: { x: number, y: number }) => <Node node={{
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
}} position={[x, y]} />

export default function Editor() {
    return <EditorViewport initialPosition={[-100, -200]} initialScale={1.25}>
        <EventNode x={-40} y={20} />
        <StringLengthNode x={200} y={75} />
        <NumberToStringNode x={450} y={20} />
        <LogStringNode x={725} y={20} />
    </EditorViewport>
}