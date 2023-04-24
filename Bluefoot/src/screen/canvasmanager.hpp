#pragma once
#include "raylib.h"
#include "singleton.hpp"

typedef void(*bf_draw_frame_callback)(void);

class CanvasManager : public Singleton<CanvasManager> {
    friend class Singleton<CanvasManager>;
private:
    CanvasManager() {};
    ~CanvasManager() {};

    bool isRunning = false;
    bf_draw_frame_callback frameDrawer;
    float targetWidth;
    float targetHeight;

public:
    void Init(Vector2 targetSize);
    void Resize();
    void StartLoop(bf_draw_frame_callback drawer);
    void Frame();
    void EndLoop();
};