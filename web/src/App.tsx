import GameCanvas from "@components/GameCanvas";
import Overlay from "@components/Overlay";
import { BluefootContextProvider } from "@modules/Bluefoot";
import { OverlayStateProvider, useOverlayState } from "@modules/OverlayManager";
import withHOCs from "@modules/Util/withHOCs";
import NoodleEditor from "@overlays/NoodleEditor";
import ParserOverlay from "@overlays/NoodleEditor/ParserOverlay";
import { useEffect } from "preact/hooks";

if (process.env.NODE_ENV==='development') {
    // Must use require here as import statements are only allowed
    // to exist at top-level.
    require("preact/debug");
}

function App() {
    const { setCurrent } = useOverlayState();

    useEffect(() => {
        // setCurrent(ParserOverlay);
        setCurrent(NoodleEditor);
    }, []);

    return (
        <div class="min-h-screen w-screen">
            <div class="h-screen w-screen">
                <GameCanvas/>
            </div>
            {/* Done as overlay to keep canvas alive */}
            <Overlay/>
        </div>
    )
}

export default withHOCs(App, BluefootContextProvider, OverlayStateProvider);