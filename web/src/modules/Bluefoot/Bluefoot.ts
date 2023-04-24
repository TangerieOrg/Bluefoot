import { useEffect, useState } from "preact/hooks";
import BluefootInstance from "./BluefootInstance";

// @ts-ignore
const WasmURL = new URL(`/res/Bluefoot.wasm`, import.meta.url);
const Factory : (args : any) => Promise<any> = require(`/res/Bluefoot.js`);

let hasInstantied = false;

export function useBluefootInstance(canvas : { current: HTMLCanvasElement | null }) : BluefootInstance | undefined {
    const [instance, setInstance] = useState<BluefootInstance>();

    useEffect(() => {
        if(hasInstantied) {
            console.error("Bluefoot game has already been created before");
            return;
        }

        Factory({
            locateFile: () => WasmURL.toString(),
            canvas: canvas.current
        }).then(m => {
            hasInstantied = true;
            setInstance(new BluefootInstance(m));
        }).catch(() => {});
    }, []);

    return instance;
}