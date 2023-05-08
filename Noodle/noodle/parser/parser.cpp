#include "parser.hpp"

namespace Noodle::Util {
bool isEmpty(const char c) {
    return c == NDL_NEWLINE || c == ' ' || c == '\t';
}

bool isEmptyOrEnd(const char c) {
    return isEmpty(c) || c == NDL_LINE_END;
}

bool isWordChar(const char c) {
    return !(isEmpty(c) || c == NDL_LINE_END || c == NDL_VALUE_START || c == NDL_VALUE_END);
}

// Returns the end index of the current task
ConsumeResult consume(EConsume task, std::string data, int start) {
    ConsumeResult result {
        start, NOT_FOUND
    };

    int i = start;
    switch(task) {
    case EConsume::Empty:
        while(i < data.size() && isEmpty(data.at(i))) i++;
        return ConsumeResult { start, i };

    case EConsume::Whitespace:
        while(i < data.size() && data.at(i) == ' ') i++;
        return ConsumeResult { start, i };

    case EConsume::CommentSingle:
        while(i < data.size() && data.at(i) != NDL_NEWLINE) i++;
        return ConsumeResult { 
            consume(EConsume::Empty, data, start + 1).end, 
            i
        };

    case EConsume::CommentMultiline:
        return ConsumeResult { 
            consume(EConsume::Empty, data, start + 1).end, 
            (int)data.find(NDL_COMMENT_MULTI_END, start) 
        };

    case EConsume::Word:
        while(i < data.size() && isWordChar(data.at(i))) i++;
        return ConsumeResult { start, i };

    case EConsume::Value:
        return ConsumeResult {
            start,
            (int)data.find(NDL_VALUE_END, start)
        };

    case EConsume::UntilEndline:
        return ConsumeResult {
            start,
            (int)data.find(NDL_LINE_END, start)
        };
    }


    // Not found means EOF
    if(result.end == NOT_FOUND) result.end = data.size();
    return result;
}
}

namespace Noodle {
void Parser::setData(std::string d) { data = d; }
std::vector<NoodleElement> Parser::getElements() { return elements; }
std::vector<Util::Token> Parser::getTokens() { return tokens; }
std::vector<std::string> Parser::getMetadataKeys(int index) { return elements[index].getMetadataKeys(); }

void Parser::parseTokens() {
    auto result = Util::consume(Util::EConsume::Empty, data, index);
    int level = 0;
    index = result.end;
    while(index < data.size()) {
        auto cur = data.at(index);
        if(Util::isEmpty(cur)) {
            // Consume until start of next token
            result = Util::consume(Util::EConsume::Empty, data, index);
            index = result.end;
            continue;  
        }

        switch (cur) {
        case NDL_COMMENT_START: {
            auto next = data.at(index + 1);
            if(next == NDL_COMMENT_START) {
                result = Util::consume(Util::EConsume::CommentSingle, data, index);
                int tagPos = data.find(NDL_TAG, result.start);
                if(tagPos != NOT_FOUND && tagPos < result.end) {
                    // Parse metadata key and value
                    auto metaKeyResult = Util::consume(Util::EConsume::Word, data, tagPos + 1);

                    tokens.push_back(Util::Token {
                        "MetaKey", 
                        data.substr(metaKeyResult.start, metaKeyResult.end - metaKeyResult.start), 
                        metaKeyResult.start, 
                        metaKeyResult.end,
                        level
                    });

                    auto whitespaceResult = Util::consume(Util::EConsume::Whitespace, data, metaKeyResult.end);

                    tokens.push_back(Util::Token {
                        "MetaValue", 
                        data.substr(whitespaceResult.end, result.end - whitespaceResult.start - 1), 
                        whitespaceResult.end, 
                        result.end,
                        level
                    });
                } else {
                    tokens.push_back(Util::Token {
                        "Comment", 
                        data.substr(result.start + 2, result.end - result.start - 2), 
                        result.start, 
                        result.end,
                        level
                    });
                }
                index = result.end;
            } else if (next == NDL_COMMENT_MULTI_START) {
                result = Util::consume(Util::EConsume::CommentMultiline, data, index);
                tokens.push_back(Util::Token {
                    "Comment", 
                    data.substr(result.start + 2, result.end - result.start - 2), 
                    result.start, 
                    result.end,
                        level
                });
                index = result.end;
            }
            break;
        }
        case NDL_GROUP_START:
            tokens.push_back(Util::Token { 
                "GroupStart",
                std::string(1, cur), 
                index, 
                index + 1,
                level
            });
            level++;
            break;
        case NDL_GROUP_END:
            level--;
            tokens.push_back(Util::Token { 
                "GroupEnd", 
                std::string(1, cur), 
                index, 
                index + 1,
                level
            });
            break;
        case NDL_LIST_START:
            tokens.push_back(Util::Token { 
                "ListStart", 
                std::string(1, cur), 
                index, 
                index + 1,
                level
            });
            level++;
            break;
        case NDL_LIST_END: 
            level--;
            tokens.push_back(Util::Token { 
                "ListEnd", 
                std::string(1, cur), 
                index,
                index + 1,
                level
            });
            break;
        case NDL_VALUE_START:
            printf("Value Start\n");
            result = Util::consume(Util::EConsume::Value, data, index);
            tokens.push_back(Util::Token {
                "Value", 
                data.substr(result.start + 1, result.end - result.start - 1),
                result.start, 
                result.end,
                level
            });
            result = Util::consume(Util::EConsume::UntilEndline, data, result.end);
            index = result.end;
            break;

        default: {
            result = Util::consume(Util::EConsume::Word, data, index);
            tokens.push_back(Util::Token {
                "Word", 
                data.substr(result.start, result.end - result.start), 
                result.start, 
                result.end,
                level
            });
            index = result.end;
            if(data.at(index) == NDL_VALUE_START) index--;
            break;
        }

        }
        index++;
    }
}

void Parser::verifyTokens() {

}

namespace TokenParser {

TokenParseResult node(std::vector<Noodle::Util::Token> tokens, int start) {
    NoodleElement current;
    current.type = "node";
    current.name = tokens.at(start + 1).value;

    // Next token is a group start
    int index = start + 3;

    while(index < tokens.size()) {
        auto token = tokens.at(index);
        printf("(%s) [%s] %s\n", current.name.c_str(), token.type.c_str(), token.value.c_str());
        index++;
    }

    return TokenParseResult { current, index };
}

}


void Parser::parseElements() {
    std::map<std::string, std::string> metadata;

    for(int i = 0; i < tokens.size(); i++) {
        auto token = tokens.at(i);
        if(token.type == "Comment") {
            continue;    
        }
        printf("[%s] %s\n", token.type.c_str(), token.value.c_str());
        if(token.type == "MetaKey") {
            auto valueToken = tokens.at(i + 1);
            metadata[token.value] = valueToken.value;
            i++;
        } 
        else if (token.type == "Word") {
            // Here's the hard stuff
            // if(current.type.empty()) {
            //     current.type = token.value;
            //     auto next = tokens.at(i + 1);
            //     current.name = next.value;
            //     i++;
            // }
            if(token.value == "node") {
                printf("Entering Node\n");
                auto result = TokenParser::node(tokens, i);
                i = result.end;
                result.element.metadata = metadata;
                elements.push_back(result.element);
                metadata.clear();
            }
        }
    }
}




void Parser::parse() {
    elements.clear();
    tokens.clear();
    index = 0;
    parseTokens();
    verifyTokens();
    parseElements();
}

}