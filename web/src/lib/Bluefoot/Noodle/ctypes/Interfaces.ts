import { NoodleMetadata } from "./Metadata";

export type NodeID = string;

export interface NodePin {
    name : string;
    type : string;
    direction : string;
    metadata : NoodleMetadata;
}

export interface PinPath {
    nodeId : NodeID;
    pinName : string;
}

export interface NodeConnection {
    id : number;
    from : PinPath;
    to : PinPath;
}