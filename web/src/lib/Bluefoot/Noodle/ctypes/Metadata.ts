export interface NoodleMetadata {
    keys() : CVector<string>;
    get(key : string) : string;
    has(key : string) : boolean;
}