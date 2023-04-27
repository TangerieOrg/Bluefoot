file(GLOB SOURCE_FILES CONFIGURE_DEPENDS src/*.cpp src/**/*.cpp)

add_executable(${PROJECT_NAME} ${SOURCE_FILES}) 

include_directories(src)
target_link_libraries(${PROJECT_NAME} raylib rlImGui IMGUI fmt::fmt Toes)
