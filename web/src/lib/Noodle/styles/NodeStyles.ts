import { NodeDefinition } from "@Noodle/types/Node";

const DEFAULT_NODE_COLORS : [string, string] = ["bg-stone-800", "bg-stone-700"];

const NODE_COLORS : Record<string, [string, string]> = {
    "Event": ["bg-red-800", "bg-stone-700"],
    "Pure": ["bg-green-800", "bg-stone-700"],
    "Development": ["bg-purple-800", "bg-stone-700"]
};

export function getNodeColors({ type } : NodeDefinition) : [string, string] {
    return !!type ? [...(NODE_COLORS[type] ?? DEFAULT_NODE_COLORS)] : [...DEFAULT_NODE_COLORS];
}