#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <string>

#include "entry.hpp"
#include "ui/consolewindow.hpp"
#include "screen/displaymanager.hpp"
// These functions should not be used internally

void console_log(std::string str) {
    UI::ConsoleWindow::getInstance().add_line(str);
}

EMSCRIPTEN_BINDINGS(bluefoot) {
    emscripten::function("end", &Entry::end);
    emscripten::function("console_log", &console_log);
    emscripten::function("force_canvas_resize", &force_canvas_resize);
    emscripten::function("start", &Entry::start);
}