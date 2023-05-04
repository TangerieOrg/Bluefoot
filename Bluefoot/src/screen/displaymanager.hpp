#pragma once
#include "raylib.h"
#include "singleton.hpp"

#define BASE_FONT_SCALE 1.8

typedef void(*bf_draw_frame_callback)(void);

class DisplayManager : public Singleton<DisplayManager> {
    friend class Singleton<DisplayManager>;
private:
    DisplayManager() {};
    ~DisplayManager() {};

    bool isRunning = false;
    bf_draw_frame_callback frameDrawer;
    float targetWidth;
    float targetHeight;
    float displayScale = 1;

    void updateScale();
public:
    void init(Vector2 targetSize, float scale);
    void resize();
    void startLoop(bf_draw_frame_callback drawer);
    void frame();
    void endLoop();
    void setDisplayScale(float scale);
};

void force_canvas_resize();