#pragma once
#include "common.hpp"
#include "imgui.h"
#include <string>
#include <vector>
#include "fmt/core.h"
#include "singleton.hpp"


namespace UI {
#define debug(...) UI::ConsoleWindow::getInstance().add_line(fmt::format(__VA_ARGS__))
class ConsoleWindow: public UIElement, public Singleton<ConsoleWindow> {
    friend class Singleton<ConsoleWindow>;
private:
    ConsoleWindow() {};
    ~ConsoleWindow() {};

    std::vector<std::string> lines;
    float initialWidth = 800;
public:
    void add_line(std::string line);
    void draw();
};
} // namespace UI