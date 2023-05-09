import { NodePin, PinType } from "@Noodle/core/types/Node";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { getPinStyle } from "@Noodle/ui/styles/PinStyles";
import { prettyCamelCaseName } from "@Noodle/ui/modules/StringUtil";

export interface PinCircleStyle {
    class?: string;
    pin : NodePin;
}

export function PinIcon({ pin, ...props } : PinCircleStyle) {
    const style = getPinStyle(pin);
    if(pin.type === PinType.Execution) {
        return <FontAwesomeIcon icon={solid('diamond')} size="sm" className={`scale-90 ${props.class} ${style}`}/>
    }
    return <FontAwesomeIcon icon={solid('circle')} size="sm" className={`scale-75  ${props.class} ${style}`}/>
}

const EXEC_PIN_NAME = ["execute", "then"];
const getPrettyPinName = (pin : NodePin) => {
    if(pin.type === PinType.Execution && EXEC_PIN_NAME.includes(pin.name)) return "";
    return pin.displayName ?? prettyCamelCaseName(pin.name);
}

export function NodeInputPin({ pin } : { pin : NodePin }) {
    return <div class="flex flex-row w-full group">
        <div class="flex flex-col justify-center">
            <PinIcon pin={pin} class="-translate-x-1/2 rotate-180 group-hover:opacity-80 transition-opacity cursor-pointer"/>
        </div>
        <span class="text-xs flex flex-col justify-center capitalize">{getPrettyPinName(pin)}</span>
    </div>
}

export function NodeOutputPin({ pin } : { pin : NodePin }) {
    return <div class="flex flex-row w-full text-right justify-end group">
        <span class="text-xs flex flex-col justify-center capitalize">{getPrettyPinName(pin)}</span>
        <div class="flex flex-col justify-center">
            <PinIcon pin={pin} class="translate-x-1/2 group-hover:opacity-80 transition-opacity cursor-pointer"/>
        </div>
    </div>
}