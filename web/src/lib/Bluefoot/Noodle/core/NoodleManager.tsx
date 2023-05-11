import { useBluefootInstance } from "@Bluefoot/Bluefoot";
import { BluefootModule } from "@Bluefoot/types";

export default class NoodleManager {
    private readonly Module : BluefootModule;

    constructor(Module : BluefootModule) {
        this.Module = Module;
    }
}

export const useNoodleManager = () => useBluefootInstance()?.manager;