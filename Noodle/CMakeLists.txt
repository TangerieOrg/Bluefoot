add_library(Noodle STATIC)
file(GLOB NOODLE_SOURCE_FILES CONFIGURE_DEPENDS noodle/*.cpp noodle/**/*.cpp)

target_include_directories(Noodle PUBLIC .)
target_sources(Noodle PUBLIC ${NOODLE_SOURCE_FILES})
target_link_libraries(Noodle raylib IMGUI rlImGui)