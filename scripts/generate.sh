#!/bin/bash
if [[ -z "$EMSDK" ]]; then
    echo "EMSDK not current in path"
    exit 1
fi
[ -e build ] && rm -rf build
cmake -B build -S . -DPLATFORM=Web -DCMAKE_TOOLCHAIN_FILE=$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake -G Ninja