import { NoodleMetadata } from "@Noodle/ctypes/Metadata";

export interface NoodleToken {
    name : string;
    type : string;
    start : number;
    end : number;
}

export interface NoodleElement {
    name : string;
    type : string;
    metadata: NoodleMetadata;
    children: CVector<NoodleElement>;
}

export interface ParsedNoodleElement {
    name : string;
    type : string;
    metadata: Record<string, string>;
    children: Array<ParsedNoodleElement>;
}