import { NodeDefinition } from "./Node";
import { NodeConnection, NodeID, PinPath } from "./Interfaces";
import { StandardNode } from "./Node";

export interface GraphNode {
    node : StandardNode;
    x : number;
    y : number;
}

export interface Graph {
    readonly name : string;
    createNodeFromDefinition(def : NodeDefinition, x : number, y: number) : NodeID;
    getNodeIDs() : CVector<NodeID>;
    getNode(id : NodeID) : GraphNode;
    removeNode(id : NodeID) : void;
    hasNode(id : NodeID) : boolean;
    addConnection(from : PinPath, to : PinPath) : void;
    removeConnection(id : number) : void;
    getConnections() : CVector<NodeConnection>;
    clear() : void;
}

export type GraphConstructorArguments = [name : string];