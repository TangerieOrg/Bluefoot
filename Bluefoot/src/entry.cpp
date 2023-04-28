#define PLATFORM Web
#include <string> 

#include <stdexcept>
#include <stdio.h>

#include <emscripten/emscripten.h>
#include <emscripten/html5.h>
#include "raylib.h"

#include "entry.hpp"
#include "screen/displaymanager.hpp"

#include "imgui.h"
#include "rlImGui.h"
#include "ui/consolewindow.hpp"

void NullLogger(int msgType, const char *text, va_list args) {}

void drawFPS() {
    DrawText(TextFormat("FPS = %i", GetFPS()), 15, 15, 30, WHITE);
}


void draw() {
    UI::ConsoleWindow::getInstance().draw();
    drawFPS();
    // ImGui::BeginTabBar("TestTab");
    // ImGui::EndTabBar();
}


extern "C" {
    EMSCRIPTEN_KEEPALIVE
    void start() {
        SetTraceLogCallback(NullLogger);
        // Its required for some reason
        emscripten_sleep(1);
        debug("Bluefoot Starting...");

        DisplayManager::getInstance().init(Vector2{1920, 1080}, 1);
        DisplayManager::getInstance().startLoop(draw);

        CloseWindow();
    }

    EMSCRIPTEN_KEEPALIVE
    void end() {
        rlImGuiShutdown();
        DisplayManager::getInstance().endLoop();
        printf("Bluefoot Ending...\n");
    }
}