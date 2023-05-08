cmake_minimum_required(VERSION 3.0.0)
project(
    Bluefoot 
    VERSION 0.1.0
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG "${CMAKE_SOURCE_DIR}/web/res")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE "${CMAKE_SOURCE_DIR}/web/res")
#  
set(COMMON_C_CXX_FLAGS "-sUSE_GLFW=3 -sASSERTIONS=1 -sWASM=1 -sALLOW_MEMORY_GROWTH=1 -O3 -sMODULARIZE=1 -sASYNCIFY=1 -sENVIRONMENT=web -sEXPORTED_RUNTIME_METHODS=ccall,cwrap -sEXIT_RUNTIME=0 -Wno-limited-postlink-optimizations -DPLATFORM=Web -lembind")
set(COMMON_C_CXX_FLAGS_RELEASE "")
set(COMMON_C_CXX_FLAGS_DEBUG "")

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} ${COMMON_C_CXX_FLAGS}")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${COMMON_C_CXX_FLAGS}")
set(CMAKE_EXECUTABLE_SUFFIX ".js") 

set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} ${COMMON_C_CXX_FLAGS_RELEASE}")
set(CMAKE_C_FLAGS_RELEASE "${CMAKE_C_FLAGS_RELEASE} ${COMMON_C_CXX_FLAGS_RELEASE}")

set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} ${COMMON_C_CXX_FLAGS_DEBUG}")
set(CMAKE_C_FLAGS_DEBUG "${CMAKE_C_FLAGS_DEBUG} ${COMMON_C_CXX_FLAGS_DEBUG}")

add_compile_options(
    "-Wno-unused-command-line-argument" 
    "-Wno-deprecated-enum-compare-conditional" 
    "-Wno-limited-postlink-optimizations"
    "-Wno-switch"
    "-g2"
    "--profiling"
)

add_subdirectory(lib)
add_subdirectory(Noodle)
add_subdirectory(Bluefoot)