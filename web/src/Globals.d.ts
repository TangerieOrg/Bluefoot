declare module "*.css";
declare module "*.ndl";

declare interface CVector<T> {
    size() : number;
    get(i : number) : T | undefined;
}

declare interface CMap<K, V> {
    size() : number;
    get(key : K) : V | undefined;
}