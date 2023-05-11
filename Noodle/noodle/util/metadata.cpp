#include "metadata.hpp"
#include <stdexcept>

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

        throw std::invalid_argument("Key does not exist");
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
}