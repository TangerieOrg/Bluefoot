#include "element.hpp"
#include "noodle/macros.hpp"
namespace Noodle {
EMSCRIPTEN_BINDINGS(Noodle) {
    EM_CLASS(NoodleElement)
        .EM_PROPERTY(type, NoodleElement)
        .EM_PROPERTY(name, NoodleElement)
        .EM_PROPERTY_GET(metadata, NoodleElement)
        .EM_PROPERTY_GET(children, NoodleElement)
    ;
}
}