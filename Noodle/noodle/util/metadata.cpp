#include "metadata.hpp"
#include <stdexcept>
#include "noodle/macros.hpp"

namespace Noodle {
std::vector<std::string> Metadata::keys() {
    std::vector<std::string> ks;

    for(auto p : data) {
        ks.push_back(p.first);
    }

    return ks;
}

std::string Metadata::get(std::string key) {
    for(auto p : data) {
        if(p.first == key) return p.second;
    }
    std::string ret;
    return ret;
}

void Metadata::set(std::string key, std::string value) {
    for(auto p : data) {
        if(p.first == key) {
            p.second.assign(value);
            return;
        }
    }

    data.push_back(std::make_pair(key, value));
}

bool Metadata::has(std::string key) {
    for(auto p : data) {
        if(p.first == key) return true;
    }
    return false;
}

void Metadata::clear() {
    data.clear();
}

void Metadata::copy(Metadata m) {
    for(auto k : m.keys()) {
        set(k, m.get(k));
    }
}

EMSCRIPTEN_BINDINGS(Noodle) {
    EM_CLASS(Metadata)
        .function("keys", &Metadata::keys)
        .function("get", &Metadata::get)
        .function("has", &Metadata::has)
    ;
}
}