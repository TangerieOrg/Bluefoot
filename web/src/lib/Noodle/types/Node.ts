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

export interface NodePin extends OptionalUserDisplayProperties {
    name : string;
    type : PinType;
    direction: PinDirection;
}



export const NodeTag = {
    Event: "Event",
    Development: "Development",
    Pure: "Pure"
} as const;
export type NodeTag = typeof NodeTag[keyof typeof NodeTag];



// export interface NodeDefinition extends OptionalUserDisplayProperties {
//     type : string; // The base name of the node
//     pins : NodePin[];
//     tags : NodeTag[];
// }

export interface NodeDefinition<TPinName extends string = never, TTags extends string = never> extends OptionalUserDisplayProperties {
    type : string; // The base name of the node
    pins : Array<NodePin>;
    tags : Array<NodeTag>;
}