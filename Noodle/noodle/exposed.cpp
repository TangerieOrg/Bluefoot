#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <string>
#include "parser/parser.hpp"


EMSCRIPTEN_BINDINGS(bluefoot) {
    emscripten::class_<Noodle::Parser>("NoodleParser")
        .constructor()
        .function("setData", &Noodle::Parser::setData)
        .function("getLineCount", &Noodle::Parser::getLineCount)
    ;
}