#pragma once
#include <string>
#include <vector>
#include "element.hpp"
#include "macros.hpp"

#define NDL_NEWLINE '\n'

// Ignored Lines
#define NDL_COMMENT_START '/'
#define NDL_COMMENT_MULTI_START '*'
#define NDL_COMMENT_MULTI_END "*/"

#define NDL_GROUP_START '{'
#define NDL_GROUP_END '}'
#define NDL_LIST_START '['
#define NDL_LIST_END ']'

#define NDL_VALUE_START '('
#define NDL_VALUE_END ')'

#define NDL_LINE_END ';'

#define NDL_TAG '@'

#define NOT_FOUND (int)std::string::npos

namespace Noodle {
namespace Util {
struct ConsumeResult {
    int start;
    int end;
};

enum struct EConsume {
    Empty, // Consume until first valid character
    Whitespace, // Consume next whitespace
    CommentSingle, // Until newline
    CommentMultiline, // Until */
    Word, // Until whitespace, newline or ';'
    Value, // Inside ()
    UntilEndline
};

struct Token {
    std::string type;
    std::string value;
    int start;
    int end;
    int level;
};
}

namespace TokenParser {

struct TokenParseResult {
    NoodleElement element;
    int end;
};

}

class Parser {
private:
    std::string data;
    std::vector<NoodleElement> elements;
    std::vector<Util::Token> tokens;
    int index;
    void parseTokens();
    void verifyTokens();
    void parseElements();
public:
    void parse();
    void setData(std::string data);
    std::vector<NoodleElement> getElements();
    std::vector<Util::Token> getTokens();
};
}