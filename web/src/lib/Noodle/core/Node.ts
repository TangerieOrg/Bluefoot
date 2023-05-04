import type { INode, NodeDefinition, NodePin, NodeState, PinType} from "@Noodle/core/types/Node";

const EmptyState = <TPinNames extends string>() : NodeState<TPinNames> => ({
    id: -1,
    trackedConnections: new Set()
});

export class Node<TType extends string = string, TPinNames extends string = string> implements INode<TType, TPinNames> {
    public readonly definition : NodeDefinition<TType, TPinNames>;

    private state : NodeState<TPinNames> = EmptyState();

    private constructor(definition : NodeDefinition<TType, TPinNames>) {
        this.definition = definition;
    }

    public static fromDefinition<TType extends string, TPinNames extends string>(definition : NodeDefinition<TType, TPinNames>) {
        return new Node<TType, TPinNames>(definition);
    }

    public getType(): TType {
        return this.definition.type;
    }

    public getTags() { return this.definition.tags; }

    public getDisplayName() { return this.definition.displayName; }
    public getDescription() { return this.definition.description; }

    public onRegister(id : number) {
        this.state.id = id;
    }

    public onRemove() {
        this.state.id = -1;
        this.state.trackedConnections.clear();
    }

    public getId() {
        return this.state.id;
    }

    public isRegistered() {
        return this.state.id > -1;
    }

    public isPure() : boolean {
        return this.definition.tags.includes("Pure");
    }

    public getPin<K extends TPinNames>(name : K) : NodePin<K> {
        return this.definition.pins.find(x => x.name === name) as NodePin<K>;
    }

    public getPinsOfType(type : PinType) : NodePin[] {
        return this.definition.pins.filter(x => x.type === type);
    }

    public getPins(): NodePin<string>[] {
        return this.definition.pins;
    }

    public addConnection(id : number) {
        this.state.trackedConnections.add(id);
    }

    public removeConnection(id : number) {
        this.state.trackedConnections.delete(id);
    }

    public getAllConnectionIds() {
        return Array.from(this.state.trackedConnections.values());
    }
}