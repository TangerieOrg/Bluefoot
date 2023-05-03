import { Meta, StoryObj } from "@storybook/preact"; 
import { ComponentProps } from "preact";
import Editor from "@Noodle/ui/components/Editor/Editor";

type Props = ComponentProps<typeof Editor>;
type Story = StoryObj<Props>;

const meta : Meta<Props> = {
    title: "Noodle/Editor",
    component: Editor
}
export default meta;

export const Basic : Story = {
}