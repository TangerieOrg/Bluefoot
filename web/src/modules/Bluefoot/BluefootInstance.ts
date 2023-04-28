import { rebindConsoleLog } from "./Logging";

export default class BluefootInstance {
    private instance : any;

    private _console_log : (data : string) => void;

    constructor(instance : any) {
        this.instance = instance;
        this._console_log = this.instance.cwrap("console_log", null, ["string"]);
        rebindConsoleLog(this, this.console_log);
    }
    
    start() {
        return this.instance._start();
    }

    end() {
        return this.instance._end();
    }

    console_log(...data : any[]) {
        const str = data.map(String).join(" ");
        this._console_log(str);
    }
}