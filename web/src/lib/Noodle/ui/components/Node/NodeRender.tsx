import { NodeDefinition, NodePin, PinType } from "@Noodle/types/Node";
import { NodeInputPin, NodeOutputPin } from "./Pins";
import { useMemo } from "preact/hooks";
import { JSX } from "preact";
import { getNodeColors } from "@Noodle/ui/styles/NodeStyles";

interface Props {
    node: NodeDefinition<string, string>;
    position: [number, number];
}

const splitPins = (pins : NodePin[]) => {
    const inExec : NodePin[] = [], inPins : NodePin[] = [], outExec : NodePin[] = [], outPins : NodePin[] = [];
    
    for(const pin of pins) {
        const isOutput = pin.direction === "Output";
        const d = pin.type === "Execution" ? (isOutput ? outExec : inExec) : (isOutput ? outPins : inPins);
        d.push(pin);
    }

    return [inExec, inPins, outExec, outPins] as const;
}

export function NodeRender(props: Props) {
    const { node } = props;
    const [inExec, inPins, outExec, outPins] = useMemo(() => splitPins(node.pins), [node.pins]);
    const [headerColor, bodyColor] = getNodeColors(node);
    return (
        <div class="pointer-events-auto w-fit h-fit absolute select-none" style={{
            left: props.position[0],
            top: props.position[1]
        }}>
            <div class="min-h-fit w-fit shadow-lg shadow-stone-900 group/titlebox">
                <div class={`rounded-t-lg px-4 py-2 ${headerColor} cursor-grab peer border-2 border-b-0 border-transparent hover:border-blue-500 transition-all`}>
                    <span class="inline">
                        <h1 class="inline text-[0.9rem]/tight font-bold truncate capitalize">{node.displayName ?? node.type}</h1>
                        {/* {
                            node.displayName != null && <h2 class="inline text-xs/tight truncate pl-2">{node.type}</h2>
                        } */}
                    </span>
                </div>
                <div class={`rounded-b-lg ${bodyColor} pb-4 pt-2 min-w-[10rem] border-2 border-t-0 border-transparent peer-hover:border-blue-500 transition-all`}>
                    <div class="-mx-[2px] flex flex-col">
                        {
                            (inExec.length > 0 || outExec.length > 0) && <div class="flex flex-row justify-between mb-4">
                                <div class="flex flex-col space-y-2">
                                    {
                                        inExec.map((input, i) => <NodeInputPin pin={input} key={i} />)
                                    }
                                </div>
                                <div class="flex flex-col space-y-2">
                                    {
                                        outExec.map((output, i) => <NodeOutputPin pin={output} key={i} />)
                                    }
                                </div>
                            </div>
                        }
                        <div class="flex flex-row justify-between mt-2">
                            <div class="flex flex-col space-y-2">
                                {
                                    inPins.map((input, i) => <NodeInputPin pin={input} key={i} />)
                                }
                            </div>

                            <div class="flex flex-col space-y-2">
                                {
                                    outPins.map((output, i) => <NodeOutputPin pin={output} key={i} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}