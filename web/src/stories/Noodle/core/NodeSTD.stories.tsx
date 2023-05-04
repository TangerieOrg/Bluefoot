import { Node } from "@Noodle/core/Node";
import { NDLSerialize } from "@Noodle/core/serializer/Serializer";
import { NoodleSTD } from "@Noodle/std";
import { INode } from "@Noodle/core/types/Node";
import { Meta, StoryObj } from "@storybook/preact"; 
import { JSONComponent } from "@StorybookUtil";

interface Props {
    key : keyof typeof NoodleSTD;
}

type Story = StoryObj<Props>;

const meta : Meta<Props> = {
    title: "NoodleCore/NodeSTD",
    // component: Component,
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

export const JSONView : Story = {
    render: ({key}) => <JSONComponent data={NoodleSTD[key]}/>,
    args: {
        key: DEFAULT_KEY
    }
}

const NDLRender = ({ node } : {node : INode}) => <div class="p-4 bg-stone-800 text-white font-mono overflow-x-auto overflow-y-auto">
    <pre>{NDLSerialize.SerializeNode(node)}</pre>
</div>

export const NDLView : Story = {
    render: ({key}) => <NDLRender node={Node.fromDefinition(NoodleSTD[key]) as INode}/>,
    args: {
        key: DEFAULT_KEY
    }
}

export const SideBySide : Story = {
    render: ({key}) => <div class="grid grid-cols-2 gap-x-12 w-full">
        <JSONComponent data={NoodleSTD[key]}/>
        <NDLRender node={Node.fromDefinition(NoodleSTD[key]) as INode}/>
    </div>,
    args: {
        key: DEFAULT_KEY
    }
}