#include "parser.hpp"

namespace Noodle {
void Parser::setData(std::string d) {
    data = d;
}

int Parser::getLineCount() {
    int count = 1;
    
    for(int i = 0; i < data.size(); i++) {
        if(data.at(i) == '\n') count++;
    }

    return count;
}
}