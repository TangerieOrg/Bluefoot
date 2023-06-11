
import { NodeInputPin, NodeOutputPin } from "./Pins";
import { useEffect, useMemo } from "preact/hooks";
import { getNodeColors } from "@Noodle/ui/styles/NodeStyles";
import { prettyCamelCaseName } from "@Noodle/ui/modules/StringUtil";
import { PositionedContainer } from "../common/Positioning";
import { INode } from "@Noodle/ctypes/Node";
import { NodePin } from "@Noodle/ctypes/Interfaces";
import { CVectorIter } from "@Bluefoot/BluefootUtil";
import { useEditorContext } from "@Noodle/ui/modules/EditorContext";

interface Props {
    node: INode;
    position: [number, number];
}

const splitPins = (pins: CVector<NodePin>) => {
    const inExec: NodePin[] = [], inPins: NodePin[] = [], outExec: NodePin[] = [], outPins: NodePin[] = [];

    for (const pin of CVectorIter(pins)) {
        const isOutput = pin.direction === "Output";
        const d = pin.type === "Execution" ? (isOutput ? outExec : inExec) : (isOutput ? outPins : inPins);
        d.push(pin);
    }

    return [inExec, inPins, outExec, outPins] as const;
}

interface InnerProps extends Pick<Props, "node"> {
    createPinRef: (name: string) => (el: HTMLElement) => Map<string, HTMLElement>;
}

export function NodeInnerRender({ node, createPinRef }: InnerProps) {
    const [inExec, inPins, outExec, outPins] = useMemo(() => splitPins(node.getPins()), [node.getPins()]);
    const [headerColor, bodyColor] = getNodeColors(node);
    const nodeName = node.getMetadata().has("DisplayName") ? node.getMetadata().get("DisplayName") : prettyCamelCaseName(node.getType());

    return <div class="h-fit w-fit shadow-lg shadow-stone-900 group/titlebox">
        <div class={`rounded-t-lg px-4 py-2 ${headerColor} cursor-grab peer border-2 border-b-0 border-transparent hover:border-blue-500 transition-all`}>
            <span class="inline">
                <h1 class="inline text-[0.9rem]/tight font-bold truncate capitalize">{nodeName}</h1>
            </span>
        </div>
        <div class={`rounded-b-lg ${bodyColor} pb-4 pt-2 min-w-[10rem] border-2 border-t-0 border-transparent peer-hover:border-blue-500 transition-all`}>
            <div class="-mx-[2px] flex flex-col">
                {
                    (inExec.length > 0 || outExec.length > 0) && <div class="flex flex-row justify-between mb-4">
                        <div class="flex flex-col space-y-2">
                            {
                                inExec.map((input, i) => <NodeInputPin pin={input} key={i} createPinRef={createPinRef}/>)
                            }
                        </div>
                        <div class="flex flex-col space-y-2">
                            {
                                outExec.map((output, i) => <NodeOutputPin pin={output} key={i} createPinRef={createPinRef}/>)
                            }
                        </div>
                    </div>
                }
                <div class="flex flex-row justify-between mt-2">
                    <div class="flex flex-col space-y-2">
                        {
                            inPins.map((input, i) => <NodeInputPin pin={input} key={i} createPinRef={createPinRef}/>)
                        }
                    </div>

                    <div class="flex flex-col space-y-2">
                        {
                            outPins.map((output, i) => <NodeOutputPin pin={output} key={i} createPinRef={createPinRef}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export function NodeRender({ node, position }: Props) {
    const { useNodeContext, advance } = useEditorContext();
    const { pins } = useNodeContext(node.getId());
    const createPinRef = (name : string) => (el : HTMLElement) => { pins.set(name, el); };
    return (
        <PositionedContainer position={position} class="pointer-events-auto w-fit h-fit select-none">
            {/* @ts-ignore */}
            <NodeInnerRender node={node} createPinRef={createPinRef}/>
        </PositionedContainer>
    )
}