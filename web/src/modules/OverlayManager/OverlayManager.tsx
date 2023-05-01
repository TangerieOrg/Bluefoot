import { createSafeContext, useSafeContext } from "@modules/SafeContext";
import { ComponentChildren } from "preact";
import { useMemo } from "preact/hooks";

export interface OverlayState {

}

const OverlayStateContext = createSafeContext<OverlayState>();

export const OverlayStateProvider = ({ children } : { children : ComponentChildren}) => {
    const value = useMemo<OverlayState>(() => ({
        
    }), []);

    return <OverlayStateContext.Provider value={value}>
        {children}
    </OverlayStateContext.Provider>
}

export const useOverlayState = () => {
    const state = useSafeContext(OverlayStateContext);
    return state;
}

