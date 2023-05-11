import { NoodleElement } from "@Noodle/core/types/Parser";
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