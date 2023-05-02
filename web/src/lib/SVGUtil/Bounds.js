/**
 * 
 * @param {SVGSVGElement} svg 
 * @returns {{
 *  xMin : number
 *  xMax : number
 *  yMin : number
 *  yMax : number
 * }}
 */
export const getSVGBounds = (svg) => {
    return Array(...svg.children).reduce((acc, el) => {
        const { x, y, width, height } = el.getBBox();
        if (!acc.xMin || x < acc.xMin) acc.xMin = x;
        if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
        if (!acc.yMin || y < acc.yMin) acc.yMin = y;
        if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
        return acc;
    }, {});
}