import { Meta, StoryObj } from "@storybook/preact"; 
import { ComponentProps } from "preact";
import Editor from "@Noodle/components/Editor";

type Props = ComponentProps<typeof Editor>;
type Story = StoryObj<Props>;

const meta : Meta<Props> = {
    title: "Noodle/Editor",
    component: Editor,
    tags: ['autodocs']
}
export default meta;

export const Basic : Story = {
    
}