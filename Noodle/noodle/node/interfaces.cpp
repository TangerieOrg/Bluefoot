#include "interfaces.hpp"
#include "noodle/macros.hpp"
namespace Noodle {
EMSCRIPTEN_BINDINGS(Noodle) {
    EM_OBJECT(NodePin)
        .field("name", &NodePin::name)
        .field("type", &NodePin::type)
        .field("direction", &NodePin::direction)
        .field("metadata", &NodePin::metadata)
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
}
}
