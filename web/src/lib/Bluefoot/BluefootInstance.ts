import NoodleManager from "@Noodle/core/NoodleManager";
import { rebindConsoleLog } from "./Logging";
import { BluefootModule } from "./types";

export default class BluefootInstance {
    public readonly Module : BluefootModule;

    start: BluefootModule["start"];
    end: BluefootModule["end"];
    
    NoodleParser : BluefootModule["NoodleParser"];

    manager : NoodleManager;

    constructor(Module : BluefootModule) {
        window.bluefoot.instance = this;
        this.Module = Module;
        if(process.env.NODE_ENV === "production") {
            rebindConsoleLog(this, this.console_log);
        }

        this.NoodleParser = Module.NoodleParser.bind(Module);

        this.start = Module.start.bind(Module);
        this.end = Module.end.bind(Module);

        this.manager = new NoodleManager(this.Module);
    }
    

    console_log(...data : any[]) {
        this.Module.console_log(data.map(String).join(" "));
        if(process.env.NODE_ENV === "development") console.log(...data);
    }
};