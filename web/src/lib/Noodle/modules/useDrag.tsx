import { throttle } from "lodash";
import { JSX } from "preact";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";

type MouseEvHandler = (ev : JSX.TargetedMouseEvent<HTMLDivElement>) => void;

type Position = [number, number];

interface UseDragReturn {
    containerProps: {
        onMouseDown: MouseEvHandler
        onMouseMove?: MouseEvHandler
    },
    position : Position
}

export enum MouseButton {
    Left,
    Middle,
    Right
}


export default function useDrag(initialValue : [number, number] = [0, 0], button : MouseButton = MouseButton.Left) : UseDragReturn {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState<Position>(initialValue);
    const [cursorStartPosition, setCursorStartPosition] = useState<Position>([0, 0]);
    const [positionStart, setPositionStart] = useState<Position>(position);

    const onMouseDown : MouseEvHandler = useCallback((ev) => {
        if(ev.button !== button) return;
        ev.preventDefault();
        setIsDragging(true);
        setCursorStartPosition([ev.screenX, ev.screenY]);
        setPositionStart([position[0], position[1]]);
    }, [isDragging, position]);

    const onMouseUp = useCallback((ev : MouseEvent) => {
        if(ev.button !== button) return;
        ev.preventDefault();
        setIsDragging(false);
    }, []);

    useEffect(() => {
        window.addEventListener("mouseup", onMouseUp);
        return () => window.removeEventListener("mouseup", onMouseUp);
    }, [onMouseUp]);


    const onMouseMove = useMemo<MouseEvHandler | undefined>(() => {
        if(isDragging) return throttle<MouseEvHandler>((ev) => {
            ev.preventDefault();
            setPosition([positionStart[0] + cursorStartPosition[0] - ev.screenX , positionStart[1] + cursorStartPosition[1] - ev.screenY])
        }, Math.round(1 / 60));
    }, [isDragging]);

    const containerProps = useMemo<UseDragReturn["containerProps"]>(() => ({
        onMouseDown,
        onMouseMove,
    }), [onMouseDown, onMouseMove]);

    return {
        containerProps,
        position
    };
}