function replacer(key: string, value: any) {
    if (value instanceof Map) {
        const d : Record<string, any> = {};
        for(const [k, v] of value.entries()) d[k] = v;
        return d;
    } else {
        return value;
    }
}

export const Stringify = (data: any) => {
    return JSON.stringify(data, replacer)
}