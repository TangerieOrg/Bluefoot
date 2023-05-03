import { NodeDefinition, NodePinName} from "@Noodle/types/Node";

export class Node<TDef extends NodeDefinition> {
    public readonly definition : TDef;

    constructor(definition : TDef) {
        this.definition = definition;
    }

    // getPinType<K extends NodePinName<TDef["pins"]>>(key : K) {
        
    // }
}