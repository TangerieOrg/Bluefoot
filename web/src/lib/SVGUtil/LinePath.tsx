import { memo } from "preact/compat"

interface Props {
    points: [number, number][]
}

const LinePath =  ({ points } : Props) => {
    const d : string[] = [];

    if(points.length < 2) return null;

    const [start, ...morePoints] = points;
    d.push(`M${start[0]} ${start[1]}`)

    for(const p of morePoints) {
        d.push(`L${p[0]} ${p[1]}`)
    }

    return <path d={d.join(" ")} />
}

export default memo(LinePath);