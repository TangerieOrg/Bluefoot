import { throttle } from "lodash";
import { JSX } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";

type ScrollEvHandler = JSX.WheelEventHandler<HTMLDivElement>;

interface UseScrollScaleReturn {
    containerProps: {
        onWheel: ScrollEvHandler
    },
    scale : number
}

export default function useScrollScale(scrollScale : number = 0.001, maxScale : number = 2, minScale : number = 0.5) : UseScrollScaleReturn {
    const [scale, setScale] = useState<number>(1);

    const onWheel = useCallback<ScrollEvHandler>(throttle<ScrollEvHandler>((ev) => {
        setScale(
            Math.max(
                minScale,
                Math.min(
                    maxScale,
                    scale - ev.deltaY * scrollScale
                )
            )
        )
    }, 20), [scale, scrollScale]);

    const containerProps : UseScrollScaleReturn["containerProps"] = useMemo(() => ({
        onWheel
    }), [onWheel]);

    return {
        containerProps,
        scale
    }
}