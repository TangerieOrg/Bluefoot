#define PLATFORM Web
#include <string> 

#include <stdexcept>
#include <stdio.h>

#include "globals.hpp"

#include <emscripten/emscripten.h>
#include <emscripten/html5.h>
#include "raylib.h"

#include "entry.hpp"
#include "screen/canvasmanager.hpp"

#include "imgui.h"
#include "rlImGui.h"

Global global;

void NullLogger(int msgType, const char *text, va_list args) {}

void setupGlobals() {
    auto canvas = CanvasManager();
    global.canvas = &canvas;
}

void drawFPS() {
    DrawText(TextFormat("FPS = %i", GetFPS()), 15, 15, 30, WHITE);
}


void testDraw() {
    ImGui::Begin("Hello World");
    ImGui::End();    
}

void draw() {
    testDraw();
    drawFPS();
}


extern "C" {
    EMSCRIPTEN_KEEPALIVE
    void start() {
        SetTraceLogCallback(NullLogger);
        // Its required for some reason
        emscripten_sleep(1);
        printf("Bluefoot Starting...\n");

        setupGlobals();
        rlImGuiSetup(true);
        global.canvas->StartLoop(draw);
        
        
        CloseWindow();
    }

    EMSCRIPTEN_KEEPALIVE
    void end() {
        rlImGuiShutdown();
        global.canvas->EndLoop();
        printf("Bluefoot Ending...\n");
    }
}