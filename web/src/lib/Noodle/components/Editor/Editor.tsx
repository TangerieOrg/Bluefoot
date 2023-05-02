// BaklavaJS Example
// https://jyc6f.csb.app/

import { Node } from "../Node";
import EditorViewport from "./EditorViewport";
import { PinType } from "@Noodle/types/Node";

const ExampleNode = ({ x, y } : { x : number, y : number }) => <Node node={{
    title: "Add",
        inputs: [
            {
                name: "execute",
                type: PinType.Execution
            },
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
                name: "then",
                type: PinType.Execution
            },
            {
                name: "Value",
                type: PinType.Number
            }
        ]
}} position={[x, y]} />

export default function Editor() {
    return <EditorViewport>
        <ExampleNode x={20} y={20}/>
        <ExampleNode x={20} y={200}/>
        <ExampleNode x={300} y={100}/>
    </EditorViewport>
}