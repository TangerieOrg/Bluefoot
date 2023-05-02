import useDrag, { MouseButton } from "@Noodle/modules/useDrag";
import useScrollScale from "@Noodle/modules/useScrollScale";
import { ComponentChildren } from "preact";
import { JSX } from "preact";
import { useMemo } from "preact/hooks";


const BASE_CONTAINER_STYLE: JSX.CSSProperties = {
    backgroundColor: "#232323",
    backgroundImage: [
        "linear-gradient(rgba(0, 0, 0, 0.1333333333) 2px, transparent 2px)",
        "linear-gradient(90deg, rgba(0, 0, 0, 0.1333333333) 2px, transparent 2px)",
        "linear-gradient(#131313 1px, transparent 1px)",
        "linear-gradient(90deg, #131313 1px, transparent 1px)"
    ].join(","),
    backgroundRepeat: "repeat"
}

interface Props {
    children?: ComponentChildren;
}

export default function EditorViewport({ children }: Props) {
    const { containerProps: containerScrollProps, scale} = useScrollScale();
    const { containerProps: containerDragProps, position } = useDrag(MouseButton.Right);

    const style = useMemo<JSX.CSSProperties>(() => {
        const largeScale = `${scale * 100}px`;
        const smallScale = `${scale * 20}px`;
        return {
            ...BASE_CONTAINER_STYLE,
            // [xScale, yScale][]
            backgroundSize: `${largeScale} ${largeScale}, ${largeScale} ${largeScale}, ${smallScale} ${smallScale}, ${smallScale} ${smallScale}`,
            backgroundPosition: `left ${-position[0]}px top ${-position[1]}px`
        }
    }, [scale, position]);

    return (
        <div
        class="w-full h-full min-h-[40rem] overflow-hidden relative top-0 left-0 pointer-events-auto"
        tabIndex={-1}
        {...containerScrollProps}
        {...containerDragProps}
        onContextMenu={(ev) => {ev.preventDefault(); return false}}
        >
            {/* Background behind nodes */}
            <div class="absolute top-0 left-0 w-full h-full pointer-events-none" 
            style={style} 
            >
            </div>
            <div class="absolute top-0 left-0 w-full h-full" style={{
                left: -position[0],
                top: -position[1],
                transformOrigin: "0px 0px 0px",
                transform: `scale(${scale})`
            }}>
                { children }
            </div>
        </div>
    );
}