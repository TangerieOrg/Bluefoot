#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <string>
#include "noodle/parser/parser.hpp"
#include "noodle/parser/element.hpp"
#include "noodle/graph/interfaces.hpp"
#include "noodle/node/StandardNode.hpp"
#include "noodle/graph/graph.hpp"
#include "noodle/macros.hpp"
#include "noodle/util/metadata.hpp"

using namespace emscripten;
using namespace Noodle;

EMSCRIPTEN_BINDINGS(Noodle) {
    EM_OBJECT(Util::Token)
        .field("type", &Util::Token::type)
        .field("value", &Util::Token::value)
        .field("start", &Util::Token::start)
        .field("end", &Util::Token::end)
        .field("level", &Util::Token::level)
    ;

    EM_OBJECT(NodePin)
        .field("name", &NodePin::name)
        .field("type", &NodePin::type)
        .field("direction", &NodePin::direction)
    ;

    EM_OBJECT(PinPath)
        .field("nodeId", &PinPath::nodeId)
        .field("pinName", &PinPath::pinName)
    ;

    EM_OBJECT(NodeConnection)
        .field("id", &NodeConnection::id)
        .field("from", &NodeConnection::from)
        .field("to", &NodeConnection::to)
    ;

    EM_CLASS(Metadata)
        .function("keys", &Metadata::keys)
        .function("get", &Metadata::get)
        .function("has", &Metadata::has)
    ;

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

    EM_CLASS(NoodleElement)
        .EM_PROPERTY(type, NoodleElement)
        .EM_PROPERTY(name, NoodleElement)
        .EM_PROPERTY_GET(metadata, NoodleElement)
        .EM_PROPERTY_GET(children, NoodleElement)
    ;

    EM_CLASS(Parser)
        .constructor()
        .function("parse", &Parser::parse)
        .function("setData", &Parser::setData)
        .function("getElements", &Parser::getElements)
        .function("getTokens", &Parser::getTokens)
    ;

    EM_REGISTER_VECTOR(NoodleElement);
    EM_REGISTER_VECTOR(Util::Token);
    EM_REGISTER_VECTOR(std::string);
    EM_REGISTER_VECTOR(int);
    EM_REGISTER_VECTOR(NodePin);
}