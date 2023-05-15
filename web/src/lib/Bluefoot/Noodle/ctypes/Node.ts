import { NoodleElement } from "./Parser";
import { NodeID, NodePin } from "./Interfaces";
import { NoodleMetadata } from "./Metadata";

export interface NodeDefinition {
    type : string;
    pins : CVector<NodePin>;
    tags : CVector<string>;
    metadata : NoodleMetadata;
}

export interface StaticNodeDefinitionClass {
    fromParserElement(el : NoodleElement) : NodeDefinition;
}

export interface INode {
    getId() : NodeID;
    isRegistered() : boolean;
    getPin(id : NodeID) : NodePin;
    getPinsOfType(type : string) : CVector<NodePin>;
    getPins() : CVector<NodePin>;
    getType() : string;
    getTags() : CVector<string>;
    getMetadata() : NoodleMetadata;
}

export interface StandardNode extends INode {}

export interface StaticStandardNodeClass {
    fromDefinition(def : NodeDefinition) : StandardNode;
}

export interface UserDisplayProperties {
    displayName : string;
    description : string;
}

export type OptionalUserDisplayProperties = Partial<UserDisplayProperties>;

export const PinType = {
    Empty: "Empty",
    Execution: "Execution",
    Number: "Number",
    String: "String",
    Boolean: "Boolean"
} as const;
export type PinType = typeof PinType[keyof typeof PinType];

export const PinDirection = {
    Input: "Input",
    Output: "Output"
} as const;
export type PinDirection = typeof PinDirection[keyof typeof PinDirection];


export const NodeTag = {
    Event: "Event",
    Development: "Development",
    Pure: "Pure"
} as const;
export type NodeTag = typeof NodeTag[keyof typeof NodeTag];

export type PinPath = [node : NodeID, pin : string]

export interface NodeConnection {
    id : number;
    from: PinPath; // Output of node
    to: PinPath; // Input of node
}
