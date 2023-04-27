add_library(Toes STATIC)
file(GLOB TOES_SOURCE_FILES CONFIGURE_DEPENDS toes/*.cpp toes/**/*.cpp)

target_include_directories(Toes PUBLIC toes)
target_sources(Toes PRIVATE ${TOES_SOURCE_FILES})
target_link_libraries(Toes raylib IMGUI rlImGui)