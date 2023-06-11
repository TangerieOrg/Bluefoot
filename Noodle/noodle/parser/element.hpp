#pragma once
#include <string>
#include <map>
#include <vector>
#include "noodle/macros.hpp"
#include "noodle/util/metadata.hpp"

namespace Noodle {

struct NoodleElement {
    typedef std::vector<NoodleElement> ChildrenType;

    GETSETPROP(std::string, name);
    GETSETPROP(std::string, type);
    GETSETPROP(Metadata, metadata);
    GETSETPROP(ChildrenType, children);
};
}