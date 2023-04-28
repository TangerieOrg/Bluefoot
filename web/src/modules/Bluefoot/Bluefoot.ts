import { useCallback, useEffect, useState } from "preact/hooks";
import BluefootInstance from "./BluefootInstance";

// @ts-ignore
const WasmURL = new URL(`/res/Bluefoot.wasm`, import.meta.url);
const Factory : (args : any) => Promise<any> = require(`/res/Bluefoot.js`);

let hasInstantied = false;

export function useBluefootInstance(canvas : { current: HTMLCanvasElement | null }) : BluefootInstance | undefined {
    const [instance, setInstance] = useState<BluefootInstance>();

    const print = useCallback((...data : any) => {
        if(!instance) {
            console.log(...data);
        } else {
            instance.console_log(...data);
        }
    }, [])

    useEffect(() => {
        if(hasInstantied) {
            console.error("Bluefoot game has already been created before");
            return;
        }
        if(!canvas.current) {
            console.error("Canvas not provided");
            return;
        }
        try {
            Factory({
                locateFile: () => WasmURL.toString(),
                canvas: canvas.current,
                print
            }).then(m => {
                hasInstantied = true;
                setInstance(new BluefootInstance(m));
            }).catch(() => {});
        } catch(err) {
            console.error(err);
        }
    }, []);

    return instance;
}