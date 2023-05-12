declare module "*.css";
declare module "*.ndl";

declare interface CVector<T> {
    size() : number;
    get(i : number) : T | undefined;
    push_back(el : T) : void;
}

declare interface CMap<K, V> {
    size() : number;
    get(key : K) : V | undefined;
}

declare type ClassConstructor<T, TArgs extends unknown[] = []> = new(...args : TArgs) => T;


declare interface ChildrenProps {
    children?: import("preact").ComponentChildren
}

interface Window {
    bluefoot: import("./lib/Bluefoot/types").GlobalBluefoot
}