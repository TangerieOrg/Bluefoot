export interface NoodleToken {
    name : string;
    type : string;
    start : number;
    end : number;
}

export interface NoodleMetadata {
    keys() : CVector<string>;
    get(key : string) : string;
    has(key : string) : boolean;
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