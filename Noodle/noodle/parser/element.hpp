#pragma once
#include <string>
#include <map>
#include <vector>
#include "macros.hpp"

namespace Noodle {

template <typename T>
struct NoodleType {
    std::string name;
    std::string type;
    T defaultValue;
};

struct NoodleString : public NoodleType<std::string> {
    std::string type = "String";
};

struct NoodleExecution : public NoodleType<std::nullptr_t> {
    std::string type = "Execution";
};

struct NoodleEmpty : public NoodleType<std::nullptr_t> {
    std::string type = "Empty";
};

struct NoodleNumber : public NoodleType<double> {
    std::string type = "Number";
};

struct NoodleBoolean : public NoodleType<bool> {
    std::string type = "Boolean";
};




struct NoodleElement {
    typedef std::map<std::string, std::string> MetadataType;
    typedef std::vector<NoodleElement> ChildrenType;

    GETSETPROP(std::string, name);
    GETSETPROP(std::string, type);
    GETSETPROP(MetadataType, metadata);
    GETSETPROP(ChildrenType, children);
    
    std::vector<std::string> getMetadataKeys();
};
}