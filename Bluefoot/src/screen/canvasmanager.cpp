#include "canvasmanager.hpp"
#include "imgui.h"
#include "rlImGui.h"

EM_JS(int, body_get_width, (), {
    return document.body.clientWidth;
});

EM_JS(int, body_get_height, (), {
    return document.body.clientHeight;
});

EM_BOOL onWindowResize(int eventType, const EmscriptenUiEvent* uiEvent, void* userData) {
    global.canvas->Resize();
    return EM_TRUE;
}

void main_loop(void) {
    global.canvas->Frame();
}

CanvasManager::CanvasManager() {
    InitWindow(body_get_width(), body_get_height(), "");
    emscripten_set_resize_callback(EMSCRIPTEN_EVENT_TARGET_WINDOW, NULL, true, onWindowResize);
}

void CanvasManager::Resize() {
    SetWindowSize(
        body_get_width(),
        body_get_height()
    );
}

void CanvasManager::StartLoop(bf_draw_frame_callback drawer) {
    if(this->isRunning) {
        throw std::runtime_error("Canvas Manager is already running");
    }
    this->frameDrawer = drawer;
    this->isRunning = true;
    emscripten_set_main_loop(main_loop, 0, true);
}

void CanvasManager::Frame() {
    BeginDrawing();
    rlImGuiBegin();
    ClearBackground(BLACK);
    this->frameDrawer();
    rlImGuiEnd();
    EndDrawing();
}

void CanvasManager::EndLoop() {
    emscripten_cancel_main_loop();
    this->isRunning = false;
}