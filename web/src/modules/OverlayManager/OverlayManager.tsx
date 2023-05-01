import { createSafeContext, useSafeContext } from "@modules/SafeContext";
import { ComponentChildren } from "preact";
import { useMemo, useState } from "preact/hooks";
import { ComponentWithProps } from "types/common";

export type OverlayComponent = ComponentWithProps<{}>;

export interface OverlayState {
    current : OverlayComponent | null;
    setCurrent: (c : OverlayComponent | null) => void;
}

const OverlayStateContext = createSafeContext<OverlayState>();

export const OverlayStateProvider = ({ children } : { children : ComponentChildren}) => {
    const [current, _setCurrent] = useState<OverlayComponent | null>(null);

    const setCurrent = (c : typeof current) => {
        _setCurrent(() => c)
    }

    const value = useMemo<OverlayState>(() => ({
        current, setCurrent
    }), [current]);

    return <OverlayStateContext.Provider value={value}>
        {children}
    </OverlayStateContext.Provider>
}

export const useOverlayState = () => {
    const state = useSafeContext(OverlayStateContext);
    return state;
}

