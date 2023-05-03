import { NodeDefinition, NodePin} from "@Noodle/types/Node";

export class Node<TPinNames extends string> {
    public readonly definition : NodeDefinition<TPinNames, never>;

    private constructor(definition : NodeDefinition<TPinNames, never>) {
        this.definition = definition;
    }

    public static fromDefinition<TPinNames extends string>(definition : NodeDefinition<TPinNames, never>) {
        return new Node<TPinNames>(definition)
    }

    public isPure() : boolean {
        return this.definition.tags.includes("Pure");
    }

    public getPin<K extends TPinNames>(name : K) : NodePin<K> {
        return this.definition.pins.find(x => x.name === name) as NodePin<K>;
    }
}