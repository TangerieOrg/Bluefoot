#include "displaymanager.hpp"
#include <stdexcept>
#include <stdio.h>

#include <emscripten/emscripten.h>
#include <emscripten/html5.h>

#include "imgui.h"
#include "rlImGui.h"
#include "ui/imgui_theme.hpp"

EM_JS(float, get_container_width, (), {
    return (Module.container ?? document.body).clientWidth;
});

EM_JS(float, get_container_height, (), {
    return (Module.container ?? document.body).clientHeight;
});

EM_JS(float, get_window_dpi, (), {
    return window.devicePixelRatio;
});

EM_BOOL onWindowResize(int eventType, const EmscriptenUiEvent* uiEvent, void* userData) {
    DisplayManager::getInstance().resize();
    return EM_TRUE;
}

void force_canvas_resize() {
    DisplayManager::getInstance().resize();
}

void main_loop(void) {
    DisplayManager::getInstance().frame();
}

void DisplayManager::init(Vector2 size, float scale) {
    targetWidth = size.x;
    targetHeight = size.y;
    displayScale = scale;

    InitWindow(targetWidth, targetHeight, "");
    emscripten_set_resize_callback(EMSCRIPTEN_EVENT_TARGET_WINDOW, NULL, true, onWindowResize);
    this->resize();

    rlImGuiSetup(true);

    this->updateScale();
}

void DisplayManager::updateScale() {
    SetupImGuiStyle(this->displayScale);
    ImGuiIO& io = ImGui::GetIO();
    io.FontGlobalScale = BASE_FONT_SCALE * this->displayScale;
}

void DisplayManager::resize() {
    float targetAspect = targetWidth / targetHeight;
    float bodyAspect = get_container_width() / get_container_height();

    float width = targetWidth;
    float height = targetHeight;

    if(bodyAspect > targetAspect) {
        height = targetHeight * (targetAspect / bodyAspect);
    } else {
        width = targetWidth * (bodyAspect / targetAspect);
    }

    float dpi = get_window_dpi();

    SetWindowSize(
        static_cast<int>(width),
        static_cast<int>(height)
    );
}

void DisplayManager::startLoop(bf_draw_frame_callback drawer) {
    if(this->isRunning) {
        throw std::runtime_error("Canvas Manager is already running");
    }
    this->frameDrawer = drawer;
    this->isRunning = true;
    emscripten_set_main_loop(main_loop, 0, true);
}

void DisplayManager::frame() {
    BeginDrawing();
    rlImGuiBegin();
    ClearBackground(BLACK);
    this->frameDrawer();
    rlImGuiEnd();
    EndDrawing();
}

void DisplayManager::endLoop() {
    emscripten_cancel_main_loop();
    this->isRunning = false;
}

void DisplayManager::setDisplayScale(float scale) {
    if(scale != this->displayScale) {
        this->displayScale = scale;
        this->updateScale();
    }
}