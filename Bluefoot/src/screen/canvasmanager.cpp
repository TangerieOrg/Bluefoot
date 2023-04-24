#include "canvasmanager.hpp"
#include "imgui.h"
#include "rlImGui.h"
#include <stdexcept>
#include <stdio.h>

#include <emscripten/emscripten.h>
#include <emscripten/html5.h>

EM_JS(float, body_get_width, (), {
    return document.body.clientWidth;
});

EM_JS(float, body_get_height, (), {
    return document.body.clientHeight;
});

EM_JS(float, get_window_dpi, (), {
    return window.devicePixelRatio;
});

EM_BOOL onWindowResize(int eventType, const EmscriptenUiEvent* uiEvent, void* userData) {
    CanvasManager::getInstance().Resize();
    return EM_TRUE;
}

void main_loop(void) {
    CanvasManager::getInstance().Frame();
}

void CanvasManager::Init(Vector2 size) {
    targetWidth = size.x;
    targetHeight = size.y;
    
    InitWindow(targetWidth, targetHeight, "");
    emscripten_set_resize_callback(EMSCRIPTEN_EVENT_TARGET_WINDOW, NULL, true, onWindowResize);
    this->Resize();
}

void CanvasManager::Resize() {
    float targetAspect = targetWidth / targetHeight;
    float bodyAspect = body_get_width() / body_get_height();

    float width = targetWidth;
    float height = targetHeight;

    if(bodyAspect > targetAspect) {
        height = targetHeight * (targetAspect / bodyAspect);
    } else {
        width = targetWidth * (bodyAspect / targetAspect);
    }

    float dpi = get_window_dpi();

    SetWindowSize(
        static_cast<int>(width * dpi),
        static_cast<int>(height * dpi)
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