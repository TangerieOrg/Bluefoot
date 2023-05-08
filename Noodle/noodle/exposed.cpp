#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <string>
#include "parser/parser.hpp"
#include "parser/element.hpp"

using namespace emscripten;
using namespace Noodle;

EMSCRIPTEN_BINDINGS(Noodle) {
    value_object<NoodleString>("NoodleString")
        .field("name", &NoodleString::name)
        .field("type", &NoodleString::type)
        .field("defaultValue", &NoodleString::defaultValue)
    ;

    value_object<NoodleExecution>("NoodleExecution")
        .field("name", &NoodleExecution::name)
        .field("type", &NoodleExecution::type)
        .field("defaultValue", &NoodleExecution::defaultValue)
    ;

    value_object<NoodleEmpty>("NoodleEmpty")
        .field("name", &NoodleEmpty::name)
        .field("type", &NoodleEmpty::type)
        .field("defaultValue", &NoodleExecution::defaultValue)
    ;

    value_object<NoodleNumber>("NoodleNumber")
        .field("name", &NoodleNumber::name)
        .field("type", &NoodleNumber::type)
        .field("defaultValue", &NoodleNumber::defaultValue)
    ;

    value_object<NoodleBoolean>("NoodleBoolean")
        .field("name", &NoodleBoolean::name)
        .field("type", &NoodleBoolean::type)
        .field("defaultValue", &NoodleBoolean::defaultValue)
    ;

    value_object<Util::Token>("NoodleToken")
        .field("type", &Util::Token::type)
        .field("value", &Util::Token::value)
        .field("start", &Util::Token::start)
        .field("end", &Util::Token::end)
        .field("level", &Util::Token::level)
    ;

    value_object<NoodleElement>("NoodleElement")
        .field("type", &NoodleElement::type)
        .field("name", &NoodleElement::name)
        .field("metadata", &NoodleElement::metadata)
        .field("children", &NoodleElement::children)
    ;

    class_<Parser>("NoodleParser")
        .constructor()
        .function("parse", &Parser::parse)
        .function("setData", &Parser::setData)
        .function("getElements", &Parser::getElements)
        .function("getMetadataKeys", &Parser::getMetadataKeys)
        .function("getTokens", &Parser::getTokens)
    ;

    register_vector<NoodleElement>("VectorNoodleElement");
    register_vector<Util::Token>("VectorNoodleToken");
    register_vector<std::string>("VectorString");
    register_map<std::string, std::string>("MapStringString");
}