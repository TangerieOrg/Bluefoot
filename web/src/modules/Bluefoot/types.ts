import { NoodleElement, NoodleToken } from "@Noodle/core/types/Parser";

export interface NoodleParser {
    parse() : void;
    setData(data : string) : void;
    getElements() : CVector<NoodleElement>;
    getTokens() : CVector<NoodleToken>;
}