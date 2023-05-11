#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include "noodle/macros.hpp"
#include <string>
#include "noodle/parser/parser.hpp"
#include "noodle/parser/element.hpp"
#include "noodle/node/interfaces.hpp"
#include "noodle/graph/graph.hpp"
#include "noodle/util/metadata.hpp"
#include "noodle/node/definition.hpp"

using namespace emscripten;
using namespace Noodle;

EMSCRIPTEN_BINDINGS(Noodle) {
    EM_REGISTER_VECTOR(NoodleElement);
    EM_REGISTER_VECTOR(Util::Token);
    EM_REGISTER_VECTOR(std::string);
    EM_REGISTER_VECTOR(int);
    EM_REGISTER_VECTOR(NodePin);
    EM_REGISTER_VECTOR(NodeConnection);
}