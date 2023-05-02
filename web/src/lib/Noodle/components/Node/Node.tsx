import { NodeDefinition, NodePin, PinType } from "@Noodle/types/Node";
import TitleBox from "../common/TitleBox";
import { NodeInputPin, NodeOutputPin } from "./Pins";
import { useMemo } from "preact/hooks";
import { JSX } from "preact";
import { getNodeColors } from "@Noodle/styles/NodeStyles";

interface Props {
    node: NodeDefinition;
    position: [number, number];
    type? : string;
}

const splitOutExecutionPins = <T extends NodePin>(pins: T[]): [execution: T[], other: T[]] => {
    const execs: T[] = [];
    const others: T[] = [];

    for (const pin of pins) {
        if (pin.type === PinType.Execution) execs.push(pin);
        else others.push(pin)
    }

    return [execs, others];
}

export function Node(props: Props) {
    const { node } = props;
    const [inputExec, inputOthers] = useMemo(() => splitOutExecutionPins(node.inputs), [node.inputs]);
    const [outputExec, outputOthers] = useMemo(() => splitOutExecutionPins(node.outputs), [node.outputs]);
    const [ headerColor, bodyColor ] = getNodeColors(node);

    return (
        <div class="pointer-events-auto w-fit h-fit absolute select-none" style={{
            left: props.position[0],
            top: props.position[1]
        }}>
            <div class="min-h-fit w-fit shadow-lg shadow-stone-900 group/titlebox">
                <div class={`rounded-t-lg px-4 py-2 ${headerColor} cursor-grab peer border-2 border-b-0 border-transparent hover:border-blue-500 transition-all`}>
                    <h1 class="text-[0.9rem]/tight font-bold truncate">{node.title}</h1>
                </div>
                <div class={`rounded-b-lg ${bodyColor} pb-4 pt-2 flex flex-col min-w-[10rem] border-2 border-t-0 border-transparent peer-hover:border-blue-500 transition-all`}>
                {
                    (inputExec.length > 0 || outputExec.length > 0) && <div class="flex flex-row justify-between mb-4">
                        <div class="flex flex-col space-y-2">
                            {
                                inputExec.map((input, i) => <NodeInputPin pin={input} key={i}/>)
                            }
                        </div>
                        <div class="flex flex-col space-y-2">
                            {
                                outputExec.map((output, i) => <NodeOutputPin pin={output} key={i}/>)
                            }
                        </div>
                    </div>
                }
                <div class="flex flex-row justify-between mt-2">
                    <div class="flex flex-col space-y-2">
                        {
                            inputOthers.map((input, i) => <NodeInputPin pin={input} key={i} />)
                        }
                    </div>

                    <div class="flex flex-col space-y-2">
                        {
                            outputOthers.map((output, i) => <NodeOutputPin pin={output} key={i} />)
                        }
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}