import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import BluefootInstance from "./BluefootInstance";
import { createSafeContext, useSafeContext } from "@modules/SafeContext";
import { ComponentChildren } from "preact";

export interface BluefootModuleProps {
    canvas: HTMLCanvasElement | null;
    container?: HTMLElement | null;
}

export interface BluefootContext {
    instance : BluefootInstance | undefined;
    init : (props : BluefootModuleProps) => void;
}

const Context = createSafeContext<BluefootContext>();

// @ts-ignore
const WasmURL = new URL(`/res/Bluefoot.wasm`, import.meta.url);
const Factory : (args : any) => Promise<any> = require(`/res/Bluefoot.js`);

let hasInitRun = false;

export const BluefootContextProvider = ({ children } : { children : ComponentChildren}) => {
    const [instance, setInstance] = useState<BluefootInstance>();
    const [isReady, setIsReady] = useState(false);
    const init = useCallback<BluefootContext["init"]>(async ({ canvas, container }) => {
        const print = (...data : any) => {
            if(!instance) {
                console.log(...data);
            } else {
                instance.console_log(...data);
            }
        }
        
        if(instance || hasInitRun) {
            console.error("Bluefoot game has already been created before");
            return;
        }
        
        if(!canvas) {
            console.error("Canvas not provided");
            return;
        }
        hasInitRun = true;

        const m = await Factory({
            locateFile: () => WasmURL.toString(),
            canvas,
            container,
            print,
            noInitialRun: true,
            noExitRuntime: true,
            onRuntimeInitialized: () => setIsReady(true),
        })
        
        await m.ready;
        setInstance(new BluefootInstance(m))

    }, [instance]);

    const value = useMemo<BluefootContext>(() => ({ instance: isReady ? instance : undefined, init }), [instance, init, isReady]);

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export function useBluefootContext() {
    return useSafeContext(Context);
}

export function useBluefootInstance() {
    const { instance } = useSafeContext(Context);
    return instance;
}