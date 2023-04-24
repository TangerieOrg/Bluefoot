DELAY=${1:-2.5}
echo Watching with a delay of $DELAY
npx nodemon --watch Bluefoot --watch CMakeLists.txt --exec "./scripts/build.sh" -e cpp,hpp,c,h --delay $DELAY