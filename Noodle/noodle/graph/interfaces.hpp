#pragma once
#include <vector>
#include <string>
#include "noodle/util/metadata.hpp"

namespace Noodle {

struct NodePin {
    std::string name;
    std::string type;
    std::string direction;
};

struct PinPath {
    std::string nodeId;
    std::string pinName;
};

struct NodeConnection {
    int id;
    PinPath from;
    PinPath to;
};

struct INode {
    INode() {}
    virtual ~INode(){}
    
    virtual void onRegister(std::string id) = 0;
    virtual void onRemove() = 0;
    virtual std::string getId() = 0;
    virtual bool isRegistered() = 0;
    virtual NodePin getPin(std::string name) = 0;
    virtual std::vector<NodePin> getPinsOfType(std::string type) = 0;
    virtual std::vector<NodePin> getPins() = 0;
    virtual std::string getType() = 0;
    virtual std::vector<std::string> getTags() = 0;
    virtual Metadata getMetadata() = 0;
};

}