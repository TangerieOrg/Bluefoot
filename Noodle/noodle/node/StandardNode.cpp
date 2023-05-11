#include "StandardNode.hpp"
#include <stdexcept>
#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include "noodle/macros.hpp"

namespace Noodle {

StandardNode::StandardNode() {};
StandardNode::~StandardNode() {};

void StandardNode::onRegister(std::string _id) { id = _id; }
void StandardNode::onRemove() { id.clear(); }

std::string StandardNode::getId() { return id; };
std::string StandardNode::getType() { return type; };
std::vector<std::string> StandardNode::getTags() { return tags;};
Metadata StandardNode::getMetadata() { return metadata; };

bool StandardNode::isRegistered() { return id.empty(); };

NodePin StandardNode::getPin(std::string name) {
    for(auto p : pins) {
        if(p.name == name) return p;
    }
    throw std::invalid_argument("Pin with name does not exist");
};

std::vector<NodePin> StandardNode::getPinsOfType(std::string type) {
    std::vector<NodePin> out;
    for(auto p : pins) {
        if(p.type == type) out.push_back(p);
    }
    return out;
};

std::vector<NodePin> StandardNode::getPins() { return pins; };



EMSCRIPTEN_BINDINGS(Noodle) {
    EM_CLASS(StandardNode)
        .function("getId", &StandardNode::getId)
        .function("isRegistered", &StandardNode::isRegistered)
        .function("getPin", &StandardNode::getPin)
        .function("getPinsOfType", &StandardNode::getPinsOfType)
        .function("getPins", &StandardNode::getPins)
        .function("getType", &StandardNode::getType)
        .function("getTags", &StandardNode::getTags)
        .function("getMetadata", &StandardNode::getMetadata)
    ;
}

}