#pragma once
#include "noodle/graph/interfaces.hpp"
#include "noodle/util/metadata.hpp"
#include <string>
#include <vector>
#include <map>

namespace Noodle {

class StandardNode : public INode {
public:
    StandardNode();
    ~StandardNode();

    void onRegister(std::string _id);
    void onRemove();
    std::string getId();
    std::string getType();
    std::vector<std::string> getTags();
    Metadata getMetadata();
    bool isRegistered();
    NodePin getPin(std::string name);
    std::vector<NodePin> getPinsOfType(std::string type);
    std::vector<NodePin> getPins();

private:
    std::string id;
    std::vector<NodePin> pins;
    std::vector<std::string> tags;
    Metadata metadata;

    std::string type;

public:
    static StandardNode fromDefinition(std::string type, std::vector<NodePin> pins, std::vector<std::string> tags, Metadata metadata) {
        StandardNode n;

        n.type = type;
        n.pins = pins;
        n.tags = tags;
        n.metadata = metadata;

        return n;
    }

};

}