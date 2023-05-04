#pragma once
#include <string>
#include <vector>

namespace Noodle {
class Parser {
private:
    std::string data;
public:
    void setData(std::string data);
    int getLineCount();
};
}