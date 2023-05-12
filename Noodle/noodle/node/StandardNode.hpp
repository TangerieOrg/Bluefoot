#pragma once
#include "interfaces.hpp"
#include "noodle/util/metadata.hpp"
#include "definition.hpp"
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
    static StandardNode fromDefinition(NodeDefinition def) {
        StandardNode n;

        n.type = def.type;
        n.pins = def.pins;
        n.tags = def.tags;
        n.metadata = def.metadata;

        return n;
    }

};

}