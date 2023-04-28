#include <emscripten/emscripten.h>
#include <string>

#include "entry.hpp"
#include "ui/consolewindow.hpp"
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

    EMSCRIPTEN_KEEPALIVE
    void console_log(const char *s) {
        std::string str(s);
        UI::ConsoleWindow::getInstance().add_line(str);
    }
}