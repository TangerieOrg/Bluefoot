# IMGUI
set(IMGUI_DIR ${CMAKE_CURRENT_SOURCE_DIR}/imgui)
add_library(IMGUI STATIC)

target_sources(IMGUI PRIVATE
    ${IMGUI_DIR}/imgui_demo.cpp
    ${IMGUI_DIR}/imgui_draw.cpp
    ${IMGUI_DIR}/imgui_tables.cpp
    ${IMGUI_DIR}/imgui_widgets.cpp
    ${IMGUI_DIR}/imgui.cpp
)

target_include_directories(IMGUI PUBLIC ${IMGUI_DIR} ${IMGUI_DIR}/backends)

# rlImGui
set(R_IMGUI_DIR ${CMAKE_CURRENT_SOURCE_DIR}/rlImGui)
add_library(rlImGui STATIC)

target_sources(rlImGui PRIVATE ${R_IMGUI_DIR}/rlImGui.cpp)
target_link_libraries(rlImGui raylib IMGUI)
target_include_directories(rlImGui PUBLIC ${R_IMGUI_DIR})