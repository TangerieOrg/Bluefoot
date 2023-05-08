#include "element.hpp"

namespace Noodle {
std::vector<std::string> NoodleElement::getMetadataKeys() {
    std::vector<std::string> keys;
    for(auto it = metadata.begin(); it != metadata.end(); ++it) {
        keys.push_back(it->first);
    }

    return keys;
}
}