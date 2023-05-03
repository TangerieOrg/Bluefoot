import { Meta, StoryObj } from "@storybook/preact"; 
import { Node as NodeComponent } from "@Noodle/ui/components/Node/Node";
import { ComponentProps } from "preact";
import { PinType } from "@Noodle/ui/types/Node";

type Props = ComponentProps<typeof NodeComponent>;
type StoryProps = Props["node"];
type Story = StoryObj<StoryProps>;

const RenderNode = (node : StoryProps) => <div class="relative top-0 left-0">
    <NodeComponent node={node} position={[0, 0]}/>
</div>;

const meta : Meta<StoryProps> = {
    title: "Noodle/Node",
    component: NodeComponent,
    tags: ['autodocs']
}

export default meta;

export const Node : Story = {
    render: RenderNode,
    args: {
        title: "Example Node",
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
                name: "String",
                type: PinType.String
            },
            {
                name: "Boolean",
                type: PinType.Boolean
            }
        ],
        outputs: [
            {
                name: "then",
                type: PinType.Execution
            },
            {
                name: "A",
                type: PinType.Number
            },
            {
                name: "B",
                type: PinType.Number
            }
        ]
    }
}

export const Adder : Story = {
    render: RenderNode,
    args: {
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
    }
}