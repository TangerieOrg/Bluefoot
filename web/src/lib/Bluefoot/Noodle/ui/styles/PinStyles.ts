import { NodePin } from "@Noodle/ctypes/Interfaces";
import { PinType } from "@Noodle/ctypes/Node";

const DEFAULT_PIN_COLOR = "text-stone-500";

const PIN_COLOR_MAP : Record<PinType, string> = {
    [PinType.Empty]: DEFAULT_PIN_COLOR,
    [PinType.Execution]: "text-stone-200",
    [PinType.Number]: "text-yellow-500",
    [PinType.Boolean]: "text-green-500",
    [PinType.String]: "text-red-500",
} as const;

export const getPinColorFromType = (ty : PinType) => PIN_COLOR_MAP[ty] ?? DEFAULT_PIN_COLOR;

export function getPinStyle(pin : NodePin) : string {
    const styles : string[] = [];

    styles.push(getPinColorFromType(pin.type as PinType));

    return styles.join(" ");
}