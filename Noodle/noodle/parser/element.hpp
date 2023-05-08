#pragma once
#include <string>
#include <map>
#include <vector>

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
    std::string name;
    std::string type;
    std::map<std::string, std::string> metadata;
    std::vector<std::string> getMetadataKeys();
    std::vector<NoodleElement> children;
};
}