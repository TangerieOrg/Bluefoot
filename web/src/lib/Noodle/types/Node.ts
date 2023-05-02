export interface NodeDefinition {
    title : string;
    inputs: NodeInput[];
    outputs : NodeOutput[];
}

// Filler
export enum PinType {
    Empty,
    Execution,
    Number,
    String,
    Boolean
}

interface NodePinBase {
    name : string;
    type : PinType;
}

export interface NodeInput extends NodePinBase {
}

export interface NodeOutput extends NodePinBase {
}

export type NodePin = NodeInput | NodeOutput;