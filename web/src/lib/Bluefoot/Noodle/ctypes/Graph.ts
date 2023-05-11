import { PinPath } from "@Noodle/core/types/Node";
import { NodeConnection, NodeID } from "./Interfaces";
import { StandardNode } from "./Node";

export interface GraphNode {
    node : StandardNode;
    x : number;
    y : number;
}

export interface Graph {
    readonly name : string;
    getNodeIDs() : CVector<string>;
    getNode(id : NodeID) : GraphNode;
    removeNode(id : NodeID) : void;
    hasNode(id : NodeID) : boolean;
    addConnection(from : PinPath, to : PinPath) : void;
    removeConnection(id : number) : void;
    getConnections() : CVector<NodeConnection>;
    clear() : void;
}

export type GraphConstructorArguments = [name : string];