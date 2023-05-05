import { rebindConsoleLog } from "./Logging";

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

export interface NoodleParser {
    setData(data : string) : void;
    getLineCount() : number;
}

export default class BluefootInstance {
    public readonly instance : BluefootModule;

    constructor(instance : any) {
        this.instance = instance;
        rebindConsoleLog(this, this.console_log);
    }
    
    start() {
        return this.instance._start();
    }

    end() {
        return this.instance.end();
    }

    console_log(...data : any[]) {
        const str = data.map(String).join(" ");
        this.instance.console_log(str);
    }

    NoodleParser() {
        return new this.instance['NoodleParser'] as NoodleParser;
    }
}