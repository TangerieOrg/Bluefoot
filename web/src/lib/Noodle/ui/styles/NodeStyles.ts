import { INode, NodeTag } from "@Noodle/core/types/Node";

const DEFAULT_NODE_COLORS : [string, string] = ["bg-stone-800", "bg-stone-700"];

const NODE_COLORS : Record<NodeTag, [string, string]> = {
    "Event": ["bg-red-800", "bg-stone-700"],
    "Pure": ["bg-green-800", "bg-stone-700"],
    "Development": ["bg-purple-800", "bg-stone-700"]
};

export function getNodeColors(node : INode<string, string>) : [string, string] {
    const tags = node.getTags();
    if(tags.includes("Development")) return NODE_COLORS["Development"];
    if(tags.includes("Event")) return NODE_COLORS["Event"];
    if(tags.includes("Pure")) return NODE_COLORS["Pure"];
    return DEFAULT_NODE_COLORS;
}