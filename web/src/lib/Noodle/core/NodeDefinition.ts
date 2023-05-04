import { NodeDefinition, NodePin, NodeTag, PinDirection, PinType } from "@Noodle/core/types/Node";

type StringExclude<TString, TExclude> = TString extends TExclude ? never : TString;

const createEmptyDefinition = <T extends string>(type : T) : NodeDefinition<T> => ({
    type,
    pins: [],
    tags: []
})

export class NodeDefinitionBuilder<TType extends string, TPins extends string = never, TTags extends NodeTag = never> {
    private definition : NodeDefinition<TType, TPins>;

    private hasOutputExec = false;
    private hasInputExec = false;

    private constructor(type : TType) {
        this.definition = createEmptyDefinition<TType>(type);
    }

    public static create<T extends string>(type : T) {
        return new NodeDefinitionBuilder<T>(type);
    }

    pin<TName extends string>(name : StringExclude<TName, TPins>, type : PinType, direction : PinDirection, displayName? : string, description? : string) 
    : NodeDefinitionBuilder<TType, TPins | TName, TTags> {
        if(type === "Execution") {
            if(direction === "Input") this.hasInputExec = true;
            else this.hasOutputExec = true;
        }

        const p : NodePin<TName> = {
            name,
            type,
            direction,
            displayName,
            description
        }

        const def = this.definition as NodeDefinition<TType, TPins | TName>;
        
        def.pins.push(Object.freeze(p));
        
        return this;
    }

    input<TName extends string>(name : StringExclude<TName, TPins>, type : PinType, displayName? : string, description? : string) {
        return this.pin(name, type, PinDirection.Input, displayName, description);
    }

    output<TName extends string>(name : StringExclude<TName, TPins>, type : PinType, displayName? : string, description? : string) {
        return this.pin(name, type, PinDirection.Output, displayName, description);
    }

    tag<T extends NodeTag>(tag : StringExclude<T, TTags>) : NodeDefinitionBuilder<TType, TPins, T | TTags> {
        if(!this.definition.tags.includes(tag)) this.definition.tags.push(tag);
        return this;
    }

    displayName(displayName : string) {
        this.definition.displayName = displayName;
        return this;
    }

    description(description : string) {
        this.definition.description = description;
        return this;
    }

    private setImplicitTags() {
        if(this.hasInputExec || this.hasOutputExec) {
            if(!this.hasInputExec) this.definition.tags.push("Event")
        }  
        else this.definition.tags.push("Pure")
    }

    private freeze() {
        Object.freeze(this.definition.tags);
        Object.freeze(this.definition.pins);
    }

    build() : Readonly<NodeDefinition<TType, TPins>> {
        if(this.definition.tags.length === 0) this.setImplicitTags();
        this.freeze();
        return Object.freeze(this.definition)
    }
}