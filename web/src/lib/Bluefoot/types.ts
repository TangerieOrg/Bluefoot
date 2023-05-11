import { NoodleElement, NoodleToken } from "@Noodle/core/types/Parser";
import BluefootInstance from "./BluefootInstance";

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
}

export interface GlobalBluefoot {
    instance?: BluefootInstance;
}