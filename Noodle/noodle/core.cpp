#include "noodle/core.hpp"

/*
#include <emscripten/emscripten.h>
#include <emscripten/val.h>
#include <emscripten/bind.h>
EM_JS(void, js_modify, (emscripten::EM_VAL val_handle), {
    const value = Emval.toValue(val_handle);
    value.type = "Modified";
});

auto v = emscripten::val(Noodle::Util::Token {
    "Type", "Value", 0, 1, 10
});

printf("[B] Type = %s\n", v.as<Noodle::Util::Token>().type.c_str());
js_modify(v.as_handle());
printf("[A] Type = %s\n", v.as<Noodle::Util::Token>().type.c_str());
js_modify(v.as_handle());
*/
