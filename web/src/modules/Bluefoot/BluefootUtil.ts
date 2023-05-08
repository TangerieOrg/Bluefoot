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

export function ParseNoodleElements(els : CVector<NoodleElement>, pa : NoodleParser) : Array<ParsedNoodleElement> {
    return CVectorToArray(els).map(el => ({
        ...el,
        metadata: CMapToObject(el.metadata, pa.getMetadataKeys(el)),
        children: ParseNoodleElements(el.children, pa)
    }))
}