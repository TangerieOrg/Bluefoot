#pragma once
#include <vector>
#include <utility>
#include <string>
#include <map>

namespace Noodle {

class Metadata {
public:
    Metadata() {}
    ~Metadata() {}

    std::vector<std::string> keys();
    std::string get(std::string key);
    void set(std::string key, std::string value);
    bool has(std::string key);
    void clear();

private:
    std::vector<std::pair<std::string, std::string>> data;

};

}