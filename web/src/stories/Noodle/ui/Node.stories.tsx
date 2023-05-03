import { Meta, StoryObj } from "@storybook/preact"; 
import { NodeRender } from "@Noodle/ui/components/Node/NodeRender";
import { ComponentProps } from "preact";
import { PinType } from "@Noodle/types/Node";
import { NoodleSTD } from "@Noodle/std";

interface Props {
    key : keyof typeof NoodleSTD;
}

type Story = StoryObj<Props>;

const RenderNode = ({ key } : Props) => <div class="relative top-0 left-0">
    <NodeRender node={NoodleSTD[key]} position={[0, 0]}/>
</div>;

const meta : Meta<Props> = {
    title: "NoodleUI/Node",
    tags: ['autodocs'],
    argTypes: {
        key: {
            name: "Definition",
            options: Object.keys(NoodleSTD),
            control: {
                type: "select"
            },
            defaultValue: Object.keys(NoodleSTD)[0]
        }
    }
}

export default meta;

const DEFAULT_KEY : Props["key"] = Object.keys(NoodleSTD)[0] as Props["key"];

export const Node : Story = {
    render: RenderNode,
    args: {
        key: DEFAULT_KEY
    }
}