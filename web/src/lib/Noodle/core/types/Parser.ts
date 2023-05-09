export interface NoodleToken {
    name : string;
    type : string;
    start : number;
    end : number;
}

export interface NoodleElement {
    name : string;
    type : string;
    metadata: CMap<string, string>;
    children: CVector<NoodleElement>;
    getMetadataKeys : () => CVector<string>;
}

export interface ParsedNoodleElement {
    name : string;
    type : string;
    metadata: Record<string, string>;
    children: Array<ParsedNoodleElement>;
}