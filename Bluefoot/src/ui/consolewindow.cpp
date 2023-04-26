#include "consolewindow.hpp"
#include "imgui.h"
#include <iostream>

namespace UI {
    void ConsoleWindow::draw() {
        ImGui::SetNextWindowSize(
            size, ImGuiCond_FirstUseEver
        );
        ImGui::Begin("Console");
        ImGui::BeginChild("##log", ImVec2(0,0), true, ImGuiWindowFlags_AlwaysVerticalScrollbar | ImGuiWindowFlags_AlwaysHorizontalScrollbar);
        for(auto line : this->lines) {
            auto line_begin = line.data();
            ImGui::TextUnformatted(line_begin, line_begin + line.size());
        }
        ImGui::EndChild();
        ImGui::End();
    }

    void ConsoleWindow::add_line(std::string line) {
        lines.push_back(line);
    }
}