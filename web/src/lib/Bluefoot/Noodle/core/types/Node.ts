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

export interface NodeDefinition<TType extends string = string, TPinNames extends string = never> extends OptionalUserDisplayProperties {
    type : TType; // The base name of the node
    pins : Array<NodePin<TPinNames>>;
    tags : Array<NodeTag>;
}

export type NodeID = string;

export type PinPath = [node : NodeID, pin : string]

export interface NodeConnection {
    id : number;
    from: PinPath; // Output of node
    to: PinPath; // Input of node
}

export interface NodeState<TPinNames extends string = never> {
    id : NodeID;
    trackedConnections : Set<number>;
}


export interface INodeInstance<TType extends string = string, TPinNames extends string = string> {
    onRegister(id : NodeID) : void;
    onRemove() : void;
    getId() : NodeID;
    isRegistered() : boolean;
    isPure() : boolean;
    getPin<K extends TPinNames>(name : K) : NodePin<K>;
    getPinsOfType(type : PinType) : NodePin[];
    getPins() : NodePin[];
    addConnection(id : number): void;
    removeConnection(id : number) : void;
    getAllConnectionIds() : number[];
    getType() : TType;
    getTags() : NodeTag[];
    getDisplayName() : string | undefined;
    getDescription() : string | undefined;
}