import { useEffect, useRef } from "preact/hooks";
import { useBluefootContext } from "@modules/Bluefoot"
import { revertConsoleLog } from "@modules/Bluefoot/Logging";

export default function GameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { init, instance } = useBluefootContext();
    useEffect(() => {
        init({
            canvas: canvasRef.current,
            container: canvasRef.current?.parentElement
        })
    }, []);

    useEffect(() => {
        if(!instance) return;
        instance.start();

        return () => {
            revertConsoleLog();
            console.log("Instance Removed");
            instance.end()
        };
    }, [instance]);

    return <canvas 
    ref={canvasRef} 
    key="canvas"
    id="canvas"
    onContextMenu={ev => ev.preventDefault()}
    class="w-screen h-screen"
    ></canvas>
}