#pragma once
#include "noodle/structs.hpp"
#include <string>

namespace Noodle::Utils {
void* createDefaultForType(PinValueType type) {
    void* value;
    switch(type) {
        case PinValueType::Empty: {
            value = nullptr;
            break;
        }
        case PinValueType::Boolean: {
            bool boolV = false;
            value = &boolV;
            break;
        }
        case PinValueType::Execution: {
            // Probably fine to just be a nullptr
            value = nullptr;
            break;
        }
        case PinValueType::Number: {
            double numberV = 0;
            value = &numberV;
            break;
        }
        case PinValueType::String: {
            std::string strV = "";
            value = &strV;
            break;
        }
    }

    return value;
}
}