import { NodeInput, NodeOutput, NodePin } from "@Noodle/types/Node";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { getPinStyle } from "@Noodle/styles/PinStyles";

export interface PinCircleStyle {
    class?: string;
    pin : NodePin;
}

export function PinCircle({ pin, ...props } : PinCircleStyle) {
    const style = getPinStyle(pin);
    return <FontAwesomeIcon icon={solid('circle')} size="xs" className={`scale-75 ${props.class} ${style}`}/>
}

export function NodeInputPin({ pin } : { pin : NodeInput}) {
    return <div class="flex flex-row w-full">
        <div class="flex flex-col justify-center">
            <PinCircle pin={pin} class="-translate-x-1/2"/>
        </div>
        <span class="text-xs">{pin.name}</span>
    </div>
}

export function NodeOutputPin({ pin } : { pin : NodeOutput}) {
    return <div class="flex flex-row w-full text-right justify-end">
        <span class="text-xs">{pin.name}</span>
        <div class="flex flex-col justify-center">
            <PinCircle pin={pin} class="translate-x-1/2"/>
        </div>
    </div>
}