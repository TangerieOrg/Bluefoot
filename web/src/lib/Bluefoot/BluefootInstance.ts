import { rebindConsoleLog } from "./Logging";
import { NoodleParser } from "./types";

type EmptyFunction = () => void;

type CArgs = [
    name : string,
    returnType : string | null,
    argumentTypes : string[],
    args : any[]
];

export interface BluefootModule {
    _start: EmptyFunction;
    end: EmptyFunction;
    console_log: (...data : any[]) => void;
    ccall: (...args : CArgs) => any;
    [key : string] : any;
}

export default class BluefootInstance {
    public readonly instance : BluefootModule;

    constructor(instance : any) {
        this.instance = instance;
        if(process.env.NODE_ENV === "production") {
            rebindConsoleLog(this, this.console_log);
        }
    }
    
    start() {
        return this.instance._start();
    }

    end() {
        return this.instance.end();
    }

    console_log(...data : any[]) {
        this.instance.console_log(data.map(String).join(" "));
    }

    NoodleParser() {
        return new this.instance['NoodleParser'] as NoodleParser;
    }
}