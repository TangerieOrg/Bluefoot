#pragma once
#include "structs.hpp"

namespace Toes {

class Pin {
private:
    void* value;
    void* key;
    PinType type = PinType{};
    Pin() {};

public:
    PinContainerType getContainer();
    PinValueType getValueType();
    PinValueType getKeyType();

    static Pin createSingle(PinValueType type, void* value);
};

}