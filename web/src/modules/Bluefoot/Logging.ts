const _consolelog = console.log;
let hasBound = false;

export function rebindConsoleLog(newThis : any, newFunc : typeof console.log) {
    if(hasBound) throw new Error("Console.log has already been rebound");
    hasBound = true;
    console.log = function() {
        const args = Array.from(arguments);
        newFunc.apply(newThis, args);
        _consolelog.apply(console, args);
    }   
}

export function revertConsoleLog() {
    hasBound = false;
    console.log = _consolelog;
}