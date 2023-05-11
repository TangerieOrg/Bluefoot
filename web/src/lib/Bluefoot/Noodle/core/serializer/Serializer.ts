import { INodeInstance, NodePin } from "@Noodle/core/types/Node";

export namespace NDLSerialize {
    export function SerializePins(pins : NodePin<string>[]) : string[] {
        const lines : string[] = [];
        for(const p of pins) {
            if(p.displayName) lines.push(`// @DisplayName ${p.displayName}`);
            if(p.description) lines.push(`// @Description ${p.description}`);
            lines.push(`${p.type} ${p.name};`);
        }
        return lines;
    }
    
    export function SerializeNode(node : INodeInstance) : string {
        const lines : string[] = [];
    
        if(node.getDisplayName()) lines.push(`// @DisplayName ${node.getDisplayName()}`);
        if(node.getDescription()) lines.push(`// @Description ${node.getDescription()}`);
    
        lines.push(`node ${node.getType()} {`);
        const inputs = node.getPins().filter(x => x.direction === "Input");
        const outputs = node.getPins().filter(x => x.direction === "Output");
    
        if(inputs.length > 0) {
            lines.push(`\tinputs {`);
            
            lines.push(...SerializePins(inputs).map(x => `\t\t${x}`));
            lines.push(`\t}`);
        }
    
        if(outputs.length > 0) {
            lines.push(`\toutputs {`);
            
            lines.push(...SerializePins(outputs).map(x => `\t\t${x}`));
            lines.push(`\t}`);
        }
    
        if(node.getTags().length > 0) {
            lines.push(`\ttags [ ${node.getTags().join(", ")} ]`);
        }
    
        lines.push(`}`);
        return lines.join("\n");
    }
}