find_package(raylib 3.0 CONFIG REQUIRED)
file(GLOB SOURCE_FILES CONFIGURE_DEPENDS src/*.cpp src/**/*.cpp)

add_executable(${PROJECT_NAME} ${SOURCE_FILES}) 

add_subdirectory(lib)

include_directories(src)
target_link_libraries(${PROJECT_NAME} raylib rlImGui IMGUI)
