import { NodeDefinition, NodePin, PinType } from "@Noodle/types/Node";
import TitleBox from "../common/TitleBox";
import { NodeInputPin, NodeOutputPin } from "./Pins";
import { useMemo } from "preact/hooks";
import { JSX } from "preact";

interface Props {
    node : NodeDefinition;
    position : [number, number];
}

const splitOutExecutionPins = <T extends NodePin>(pins : T[]) : [execution : T[], other : T[]] => {
    const execs : T[] = [];
    const others : T[] = [];

    for(const pin of pins) {
        if(pin.type === PinType.Execution) execs.push(pin);
        else others.push(pin)
    }

    return [execs, others];
}

const useNodeContainerStyle = ({ position } : Props) => {
    return useMemo<JSX.CSSProperties>(() => ({
        left: position[0],
        top: position[1]
    }), [position[0], position[1]])
}

export function Node(props : Props) {
    const { node } = props;
    const [inputExec, inputOthers] = useMemo(() => splitOutExecutionPins(node.inputs), [node.inputs]);
    const [outputExec, outputOthers] = useMemo(() => splitOutExecutionPins(node.outputs), [node.outputs]);
    const style = useNodeContainerStyle(props);

    return (
        <div class="pointer-events-auto w-fit h-fit absolute select-none" style={style}>
            <TitleBox 
            title={<h1 class="text-base">{node.title}</h1>} 
            class="py-4 flex flex-col gap-y-4 min-w-[10rem]">
                {/* Outputs First */}
                <div class="flex flex-col space-y-2">
                    {
                        outputOthers.map((output, i) => <NodeOutputPin pin={output} key={i}/>)
                    }
                </div>
                {/* Inputs Next */}
                <div class="flex flex-col space-y-2">
                    {
                        inputOthers.map((input, i) => <NodeInputPin pin={input} key={i}/>)
                    }
                </div>
            </TitleBox>
        </div>
    )
}