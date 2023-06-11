#include <string> 

#include <stdexcept>
#include <stdio.h>

#include <emscripten/emscripten.h>
#include <emscripten/val.h>
#include <emscripten/html5.h>
#include <emscripten/bind.h>
#include "raylib.h"

#include "entry.hpp"
#include "screen/displaymanager.hpp"

#include "imgui.h"
#include "rlImGui.h"
#include "ui/consolewindow.hpp"

#include <iostream>
#include <streambuf>

#include "noodle/parser/parser.hpp"

void NullLogger(int msgType, const char *text, va_list args) {}

void drawFPS() {
    DrawText(TextFormat("%i", GetFPS()), 15, 15, 30, WHITE);
}

void draw() {
    UI::ConsoleWindow::getInstance().draw();
    drawFPS();
}

namespace Entry {
void start() {
    SetTraceLogCallback(NullLogger);
    printf("Bluefoot Starting...\n");

    DisplayManager::getInstance().init(Vector2{1920, 1080}, 1);
    
    DisplayManager::getInstance().startLoop(draw);
}

void end() {
    debug("Bluefoot Ending...\n");
    rlImGuiShutdown();
    DisplayManager::getInstance().endLoop();
    CloseWindow();
}
}