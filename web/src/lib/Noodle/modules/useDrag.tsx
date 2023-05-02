import { throttle } from "lodash";
import { JSX } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";

type MouseEvHandler = (ev : JSX.TargetedMouseEvent<HTMLDivElement>) => void;

type Position = [number, number];

interface UseDragReturn {
    containerProps: {
        onMouseDown: MouseEvHandler
        onMouseUp: MouseEvHandler
        onMouseMove?: MouseEvHandler
        onfocusout: () => void;
    },
    position : Position
}

export enum MouseButton {
    Left,
    Middle,
    Right
}


export default function useDrag(button : MouseButton = MouseButton.Left) : UseDragReturn {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState<Position>([0, 0]);
    const [cursorStartPosition, setCursorStartPosition] = useState<Position>([0, 0]);
    const [positionStart, setPositionStart] = useState<Position>(position);

    const onMouseDown : MouseEvHandler = useCallback((ev) => {
        if(ev.button !== button) return;
        ev.preventDefault();
        setIsDragging(true);
        setCursorStartPosition([ev.screenX, ev.screenY]);
        setPositionStart([position[0], position[1]]);
    }, [isDragging, position]);

    const onMouseUp : MouseEvHandler = useCallback((ev) => {
        if(ev.button !== button) return;
        ev.preventDefault();
        setIsDragging(false);
    }, []);

    const onMouseMove = useMemo<MouseEvHandler | undefined>(() => {
        if(isDragging) return throttle<MouseEvHandler>((ev) => {
            ev.preventDefault();
            setPosition([positionStart[0] + cursorStartPosition[0] - ev.screenX , positionStart[1] + cursorStartPosition[1] - ev.screenY])
        }, Math.round(1 / 60));
    }, [isDragging]);

    const containerProps = useMemo<UseDragReturn["containerProps"]>(() => ({
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onfocusout: onMouseUp as () => void
    }), [onMouseDown, onMouseUp, onMouseMove]);

    return {
        containerProps,
        position
    };
}