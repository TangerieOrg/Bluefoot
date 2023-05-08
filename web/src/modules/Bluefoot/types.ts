export interface CVector<T> {
    size() : number;
    get(i : number) : T;
}

export interface CMap<K, V> {
    size() : number;
    get(key : K) : V | undefined;
}

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
}

export interface ParsedNoodleElement {
    name : string;
    type : string;
    metadata: Record<string, string>;
    children: Array<ParsedNoodleElement>;
}

export interface NoodleParser {
    parse() : void;
    setData(data : string) : void;
    getElements() : CVector<NoodleElement>;
    getTokens() : CVector<NoodleToken>;
    getMetadataKeys(el : NoodleElement) : CVector<string>;
}