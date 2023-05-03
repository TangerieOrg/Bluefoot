import { NodeDefinition, NodeTag, PinDirection, PinType } from "@Noodle/types/Node";

type StringExclude<TString, TExclude> = TString extends TExclude ? never : TString;

const createEmptyDefinition = (type : string) : NodeDefinition => ({
    type,
    pins: [],
    tags: []
})

export class NodeDefinitionBuilder<TPins extends string = never, TTags extends NodeTag = never> {
    private definition : NodeDefinition<TPins, TTags>;

    private hasOutputExec = false;
    private hasInputExec = false;

    private constructor(type : string) {
        this.definition = createEmptyDefinition(type);
    }

    public static create(type : string) {
        return new NodeDefinitionBuilder(type);
    }

    pin<TName extends string>(name : StringExclude<TName, TPins>, type : PinType, direction : PinDirection, displayName? : string, description? : string) 
    : NodeDefinitionBuilder<TPins | TName, TTags> {
        if(type === "Execution") {
            if(direction === "Input") this.hasInputExec = true;
            else this.hasOutputExec = true;
        }
        
        this.definition.pins.push({
            name,
            type,
            direction,
            displayName,
            description
        })
        return this;
    }

    input<TName extends string>(name : StringExclude<TName, TPins>, type : PinType, displayName? : string, description? : string) {
        return this.pin(name, type, PinDirection.Input, displayName, description);
    }

    output<TName extends string>(name : StringExclude<TName, TPins>, type : PinType, displayName? : string, description? : string) {
        return this.pin(name, type, PinDirection.Output, displayName, description);
    }

    tag<T extends NodeTag>(tag : StringExclude<T, TTags>) : NodeDefinitionBuilder<TPins, T | TTags> {
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

    build() : NodeDefinition<TPins, TTags> {
        if(this.definition.tags.length === 0) this.setImplicitTags();
        return Object.freeze(this.definition)
    }
}