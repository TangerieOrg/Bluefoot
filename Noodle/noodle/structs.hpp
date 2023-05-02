#pragma once

namespace Noodle {

enum PinValueType {
    Execution,
    Number,
    String, // std::string
    Boolean,
    Empty
};

enum PinContainerType {
    Single,
    List,
    Map
};

struct PinType {
    PinValueType value = PinValueType::Empty;
    PinContainerType container = PinContainerType::Single;

    // Only used in Map Container
    PinValueType key = PinValueType::Empty;

    PinType() {}
};

} // namespace Toes