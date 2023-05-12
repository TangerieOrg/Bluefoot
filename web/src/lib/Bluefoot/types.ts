import { NoodleElement, NoodleToken } from "@Noodle/core/types/Parser";
import BluefootInstance from "./BluefootInstance";
import { NodeDefinition, StandardNode, StaticNodeDefinitionClass, StaticStandardNodeClass } from "@Noodle/ctypes/Node";
import { Graph, GraphConstructorArguments } from "@Noodle/ctypes/Graph";

export interface NoodleParser {
    parse() : void;
    setData(data : string) : void;
    getElements() : CVector<NoodleElement>;
    getTokens() : CVector<NoodleToken>;
}

export interface BluefootModule {
    start: () => void;
    end: () => void;
    console_log: (data: string) => void;
    NoodleParser: ClassConstructor<NoodleParser>;
    NoodleNodeDefinition: ClassConstructor<NodeDefinition> & StaticNodeDefinitionClass;
    NoodleStandardNode: ClassConstructor<StandardNode> & StaticStandardNodeClass;
    NoodleGraph : ClassConstructor<Graph, GraphConstructorArguments>;
}

export interface GlobalBluefoot {
    instance?: BluefootInstance;
}