#pragma once
#include <string>
#include <map>
#include <vector>
#include "noodle/macros.hpp"
#include "noodle/util/metadata.hpp"

namespace Noodle {

struct NoodleElement {
    // typedef std::map<std::string, std::string> MetadataType;
    typedef std::vector<NoodleElement> ChildrenType;

    GETSETPROP(std::string, name);
    GETSETPROP(std::string, type);
    GETSETPROP(Metadata, metadata);
    GETSETPROP(ChildrenType, children);
    
    std::vector<std::string> getMetadataKeys();
};
}