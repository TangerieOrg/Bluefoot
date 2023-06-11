#!/bin/bash
if [[ -z "$EMSDK" ]]; then
    echo "EMSDK not current in path"
    exit 1
fi
[ -e build ] && rm -rf build
emcmake cmake -B build -S . -G "Ninja Multi-Config" 