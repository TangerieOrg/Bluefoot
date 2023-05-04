#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <string>
#include "parser/parser.hpp"


EMSCRIPTEN_BINDINGS(NoodleParser) {
    emscripten::class_<Noodle::Parser>("NoodleParser")
        .constructor()
        .function("setData", &Noodle::Parser::setData)
        .function("getLineCount", &Noodle::Parser::getLineCount)
    ;
}