import { ComponentChildren, JSX } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { getSVGBounds } from "./Bounds";

interface ExtraProps {
    fitContent? : boolean;
}

type Props = ExtraProps & JSX.SVGAttributes<SVGSVGElement>;

const resizeSVG = (svg : SVGSVGElement) => {
    const { xMin, xMax, yMin, yMax } = getSVGBounds(svg);
    const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
    svg.setAttribute("viewbox", viewbox);
}

export default function SVG({fitContent, ...props} : Props) {
    const svgRef = useRef<SVGSVGElement>();

    useEffect(() => {
        if(!svgRef.current || !fitContent) return;
        resizeSVG(svgRef.current);
    }, [fitContent]);

    // @ts-ignore
    return <svg {...props} ref={svgRef}>
        {props.children}
    </svg>
}