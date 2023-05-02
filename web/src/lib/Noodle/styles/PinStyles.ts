import { NodePin, PinType } from "@Noodle/types/Node";

const DEFAULT_PIN_COLOR = "text-stone-500";

const PIN_COLOR_MAP : Record<PinType, string> = {
    [PinType.Empty]: DEFAULT_PIN_COLOR,
    [PinType.Execution]: "text-stone-200",
    [PinType.Number]: "text-yellow-400",
    [PinType.Boolean]: "text-green-400",
    [PinType.String]: "text-red-400",
} as const;

export const getPinColorFromType = (ty : PinType) => PIN_COLOR_MAP[ty] ?? DEFAULT_PIN_COLOR;

export function getPinStyle(pin : NodePin) : string {
    const styles : string[] = [];

    styles.push(getPinColorFromType(pin.type));

    return styles.join(" ");
}