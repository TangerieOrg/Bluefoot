#pragma once
#include <vector>
#include <string>
#include "interfaces.hpp"
#include "noodle/parser/element.hpp"
#include "noodle/util/metadata.hpp"

namespace Noodle {

struct NodeDefinition {
    std::string type;
    std::vector<NodePin> pins;
    std::vector<std::string> tags;
    Metadata metadata;

    static NodeDefinition fromParserElement(NoodleElement el);
};

}