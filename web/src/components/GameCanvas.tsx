import { useEffect, useRef } from "preact/hooks";
import { useBluefootInstance } from "@modules/Bluefoot"

export default function GameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const instance = useBluefootInstance(canvasRef);

    useEffect(() => {
        if(!instance) return;

        instance.start();

        return () => instance.end();
    }, [instance]);

    return <canvas 
    ref={canvasRef} 
    key="canvas"
    id="canvas"
    onContextMenu={ev => ev.preventDefault()}
    class="w-screen h-screen"
    ></canvas>
}