#include "pin.hpp"
#include "utils.hpp"
#include <string>

namespace Noodle {

PinContainerType Pin::getContainer() { return type.container; }
PinValueType Pin::getValueType() { return type.value; }
PinValueType Pin::getKeyType() { return type.key; }

Pin Pin::createSingle(PinValueType type, void* value = nullptr) {
    if(value == nullptr) {
        value = Noodle::Utils::createDefaultForType(type);
    }
    Pin pin;
    pin.type.value = type;
    pin.value = value;
    return pin;
}

}