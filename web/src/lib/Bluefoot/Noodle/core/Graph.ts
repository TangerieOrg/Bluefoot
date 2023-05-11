import { NodeConnection, NodeDefinition, NodeID, PinPath } from "@Noodle/core/types/Node";
import { NodeInstance } from "./NodeInstance";

export default class Graph {
    private static _instance : Graph;
    private constructor() {}

    public static get() {
        if(this._instance == null) this._instance = new Graph();
        return this._instance;
    }

    private nodeCount : number = 0;
    private nodes : Map<NodeID, NodeInstance> = new Map();

    private connectionCount : number = 0;
    private connections : Map<number, NodeConnection> = new Map();

    public clear() {
        for(const node of this.nodes.values()) {
            node.onRemove();
        }
        this.nodes.clear();
        this.nodeCount = 0;
        this.connections.clear();
        this.connectionCount = 0;
    }

    public createNode(def : NodeDefinition) {
        const node = NodeInstance.fromDefinition(def);
        this.registerNode(node);
        return node;
    }

    private registerNode(node : NodeInstance) {
        const id = (this.nodeCount++).toString();
        this.nodes.set(id, node);
        node.onRegister(id);
        return id;
    }

    public removeNode(id : NodeID) {
        const node = this.nodes.get(id);
        if(!node) return false;

        node.onRemove();
        const connections = node.getAllConnectionIds();
        connections.forEach(x => this.removeConnection(x));
        return this.nodes.delete(id);
    }

    public getNodes() {
        return Array.from(this.nodes.values())
    }

    public getNode(id : NodeID) {
        return this.nodes.get(id);
    }

    public hasNode(id : NodeID) {
        return this.nodes.has(id);
    }

    public addConnection(from : PinPath, to : PinPath) {
        const fromNode = this.getNode(from[0]);
        const toNode = this.getNode(to[0]);
        if(!fromNode || !toNode) return false;
        if(!fromNode.getPin(from[1]) || !toNode.getPin(to[1])) return false;

        const id = this.connectionCount++;
        this.connections.set(id, { id, from, to });
        fromNode.addConnection(id);
        toNode.addConnection(id);
    }

    public removeConnection(id : number) {
        const conn = this.connections.get(id);
        if(!conn) return false;
        const fromNode = this.getNode(conn.from[0]);
        const toNode = this.getNode(conn.to[0]);
        fromNode!.removeConnection(id);
        toNode!.removeConnection(id);
        this.connections.delete(id);
        return true;
    }
}