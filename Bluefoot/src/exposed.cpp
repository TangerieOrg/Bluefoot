#include <emscripten/emscripten.h>
#include "entry.hpp"

// These functions should not be used internally

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    void start() {
        Entry::start();
    }

    EMSCRIPTEN_KEEPALIVE
    void end() {
        Entry::end();
    }
}