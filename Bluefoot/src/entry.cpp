#define PLATFORM Web
#include <string> 

#include <stdexcept>
#include <stdio.h>

#include <emscripten/emscripten.h>
#include <emscripten/html5.h>
#include "raylib.h"

#include "entry.hpp"
#include "screen/canvasmanager.hpp"

#include "imgui.h"
#include "rlImGui.h"
#include "ui.hpp"

void NullLogger(int msgType, const char *text, va_list args) {}

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

        CanvasManager::getInstance().Init(Vector2{1920, 1080});

        rlImGuiSetup(true);
        SetupImGuiStyle();

        ImGuiIO& io = ImGui::GetIO();
        io.FontGlobalScale = 2;

        CanvasManager::getInstance().StartLoop(draw);
        
        CloseWindow();
    }

    EMSCRIPTEN_KEEPALIVE
    void end() {
        rlImGuiShutdown();
        CanvasManager::getInstance().EndLoop();
        printf("Bluefoot Ending...\n");
    }
}