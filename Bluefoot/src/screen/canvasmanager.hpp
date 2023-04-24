#pragma once
#define PLATFORM Web

#include <stdexcept>
#include <stdio.h>

#include "globals.hpp"

#include <emscripten/emscripten.h>
#include <emscripten/html5.h>
#include "raylib.h"

typedef void(*bf_draw_frame_callback)(void);

class CanvasManager {
private:
    bool isRunning = false;
    bf_draw_frame_callback frameDrawer;

public:

    CanvasManager();
    void Resize();
    void StartLoop(bf_draw_frame_callback drawer);
    void Frame();
    void EndLoop();
};