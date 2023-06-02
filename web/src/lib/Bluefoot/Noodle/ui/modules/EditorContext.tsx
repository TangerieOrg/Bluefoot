import { useBluefootModule } from "@Bluefoot/Bluefoot";
import { Graph } from "@Noodle/ctypes/Graph";
import { NodeID } from "@Noodle/ctypes/Interfaces";
import { createSafeContext, useSafeContext } from "@modules/SafeContext";
import { ComponentChildren } from "preact";
import { useMemo, useState } from "preact/hooks";

export interface EditorContextType {
    graph : Graph | undefined;
    state : Symbol;
    advance : () => void;
    useNodeContext: (node: NodeID) => NodeRenderContext;
    trackedNodes : Map<NodeID, NodeRenderContext>;
}

export interface NodeRenderContext {
    pins : Map<string, HTMLElement>;
}

const Context = createSafeContext<EditorContextType>();

export const EditorContextProvider = ({children} : { children : ComponentChildren}) => {
    const Module = useBluefootModule();
    const [state, setState] = useState(Symbol());

    const advance = () => setState(Symbol());

    const trackedNodes = useMemo<Map<NodeID, NodeRenderContext>>(() => new Map(), []);

    const useNodeContext = (node : NodeID) => {
        if(trackedNodes.has(node)) return trackedNodes.get(node)!;
        const n : NodeRenderContext = {
            pins: new Map()
        };
        trackedNodes.set(node, n);
        return n;
    }

    const graph = useMemo(() => {
        if(!Module) return undefined;
        const g = new Module.NoodleGraph("TestGraph");

        return g;
    }, [Module]);

    const ctxt = useMemo<EditorContextType>(() => ({
        graph, state, advance, useNodeContext, trackedNodes
    }), [graph, state, trackedNodes]);

    return <Context.Provider value={ctxt}>
        {children}
    </Context.Provider>
}

export const useEditorContext = () => useSafeContext(Context);
