import { Meta } from "@storybook/preact"; 
import { ComponentProps } from "preact";
import Editor from "@Noodle/ui/components/Editor/Editor";

type Props = ComponentProps<typeof Editor>;

const meta : Meta<Props> = {
    title: "NoodleUI/Editor",
    component: Editor
}
export default meta;

export { Editor }; 