import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { getPinStyle } from "@Noodle/ui/styles/PinStyles";
import { prettyCamelCaseName } from "@Noodle/ui/modules/StringUtil";
import { NodePin } from "@Noodle/ctypes/Interfaces";
import { PinType } from '@Noodle/ctypes/Node';

export interface PinCircleStyle {
    class?: string;
    pin : NodePin;
    createPinRef: (name: string) => (el: HTMLElement) => Map<string, HTMLElement>;
}

export function PinIcon({ pin, createPinRef, ...props } : PinCircleStyle) {
    const style = getPinStyle(pin);
    if(pin.type === PinType.Execution) {
        return <FontAwesomeIcon ref={createPinRef(pin.name)} icon={solid('diamond')} size="sm" className={`scale-90 ${props.class} ${style}`}/>
    }
    return <FontAwesomeIcon ref={createPinRef(pin.name)} icon={solid('circle')} size="sm" className={`scale-75  ${props.class} ${style}`}/>
}

const EXEC_PIN_NAME = ["execute", "then"];
const getPrettyPinName = (pin : NodePin) => {
    if(pin.type === PinType.Execution && EXEC_PIN_NAME.includes(pin.name)) return "";
    return pin.metadata.has("DisplayName") ? pin.metadata.get("DisplayName") : prettyCamelCaseName(pin.name);
}

function NodeValueInput({ pin } : { pin : NodePin }) {
    if(pin.type === "Execution" || pin.type === "Empty") return null;

    if(pin.type === "Boolean") return (
        <input type="checkbox"/>
    );

    return <div>

    </div>
}

interface NodeIOProps {
    pin : NodePin;
    createPinRef: (name: string) => (el: HTMLElement) => Map<string, HTMLElement>;
}

export function NodeInputPin({ pin, createPinRef } : NodeIOProps) {
    return <div class="flex flex-row w-full group">
        <div class="flex flex-col justify-center">
            <PinIcon createPinRef={createPinRef} pin={pin} class="-translate-x-1/2 rotate-180 group-hover:opacity-80 transition-opacity cursor-pointer"/>
        </div>
        <span class="text-xs flex flex-col justify-center capitalize">{getPrettyPinName(pin)}</span>
    </div>
}

export function NodeOutputPin({ pin, createPinRef } : NodeIOProps) {
    return <div class="flex flex-row w-full text-right justify-end group">
        <span class="text-xs flex flex-col justify-center capitalize">{getPrettyPinName(pin)}</span>
        <div class="flex flex-col justify-center">
            <PinIcon createPinRef={createPinRef} pin={pin} class="translate-x-1/2 group-hover:opacity-80 transition-opacity cursor-pointer"/>
        </div>
    </div>
}