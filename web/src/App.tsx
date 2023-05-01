import GameCanvas from "@components/GameCanvas";
import Overlay from "@components/Overlay";
import { OverlayStateProvider, useOverlayState } from "@modules/OverlayManager";
import withHOCs from "@modules/Util/withHOCs";
import NoodleEditor from "@overlays/NoodleEditor";
import { useEffect } from "preact/hooks";

function App() {
    const { setCurrent } = useOverlayState();

    useEffect(() => {
        setCurrent(NoodleEditor);
    }, []);

    return (
        <div class="min-h-screen w-screen bg-gray-800 text-white">
            <div class="h-screen w-screen">
                <GameCanvas/>
            </div>
            {/* Done as overlay to keep canvas alive */}
            <Overlay/>
        </div>
    )
}

export default withHOCs(App, OverlayStateProvider);