import { CMap, CVector, NoodleElement, NoodleParser, ParsedNoodleElement } from "./types";

export function CVectorToArray<T>(vec : CVector<T>) {
    const arr : T[] = [];

    for(let i = 0; i < vec.size(); i++) arr.push(vec.get(i));

    return arr;
}


export function CMapToObject<K extends string, V>(map : CMap<K, V>, keys : CVector<K>) : Record<K, V> {
    const out : Record<K, V> = {} as Record<K, V>;
    
    for(let i = 0; i < keys.size(); i++) {
        const key = keys.get(i);
        out[key] = map.get(key)!;
    }

    return out;
}

export function getCGetterKeys<T extends Object>(obj : T) {
    return Object.keys(Object.getPrototypeOf(obj)) as unknown as (keyof T)[];
}

export function CClassToObject<T extends Object>(obj : T) {
    const out = {};

    // @ts-ignore
    for(const key of getCGetterKeys(obj)) out[key] = obj[key];
    // @ts-ignore
    for(const key of Object.keys(obj)) out[key] = obj[key];

    return out as T;
}

export function ParseNoodleElements(els : CVector<NoodleElement>) : Array<ParsedNoodleElement> {
    return CVectorToArray(els).map(el => ({
        ...CClassToObject(el),
        metadata: CMapToObject(el.metadata, el.getMetadataKeys()),
        children: ParseNoodleElements(el.children)
    }))
}