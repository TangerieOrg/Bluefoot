import { NoodleSTD } from "@Noodle/std";
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