#include "definition.hpp"
#include "noodle/macros.hpp"

namespace Noodle {

inline NodePin pinFromEl(NoodleElement el, std::string direction) {
    // TODO => Default Values

    return NodePin {
        el.name,
        el.type,
        direction,
        el.metadata
    };
}

void parseIOChildren(NodeDefinition *def, NoodleElement *map, std::string direction) {
    for(auto el : map->children) {
        def->pins.push_back(
            pinFromEl(
                el,
                direction
            )
        );
    }
}

NodeDefinition NodeDefinition::fromParserElement(NoodleElement el) {
    NodeDefinition def;
    def.type = el.name;
    def.metadata.copy(el.metadata);


    for(auto child : el.children) {
        if(child.type == "Map") {
            if(child.name == "inputs") parseIOChildren(&def, &child, "Input");
            else if (child.name == "outputs") parseIOChildren(&def, &child, "Output");
        }
        else if(child.type == "List") {
            if(child.name == "tags") {
                for(auto tagChild : child.children) {
                    def.tags.push_back(tagChild.name);
                }
            }
        }
    }

    return def;
}

EMSCRIPTEN_BINDINGS(Noodle) {
    EM_CLASS(NodeDefinition)
        .class_function("fromParserElement", &NodeDefinition::fromParserElement)
        .property("type", &NodeDefinition::type)
        .property("pins", &NodeDefinition::pins)
        .property("tags", &NodeDefinition::tags)
        .property("metadata", &NodeDefinition::metadata)
    ;
}

}