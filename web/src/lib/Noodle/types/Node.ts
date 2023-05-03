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

export interface NodePin<TName extends string = string> extends OptionalUserDisplayProperties {
    name : TName;
    type : PinType;
    direction: PinDirection;
}



export const NodeTag = {
    Event: "Event",
    Development: "Development",
    Pure: "Pure"
} as const;
export type NodeTag = typeof NodeTag[keyof typeof NodeTag];

export interface NodeDefinition<TPinNames extends string = never, TTags extends string = never> extends OptionalUserDisplayProperties {
    type : string; // The base name of the node
    pins : Array<NodePin<TPinNames>>;
    tags : Array<NodeTag>;
}

