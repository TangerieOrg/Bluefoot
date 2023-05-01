import { useOverlayState } from "@modules/OverlayManager"

const EMPTY_OVERLAY = () => null;

const useCurrentOverlay = () => {
    const { current } = useOverlayState();
    return current ?? EMPTY_OVERLAY
}

export default function Overlay() {
    const CurrentOvleray = useCurrentOverlay();
    return <div class="fixed top-0 left-0 h-screen w-screen overflow-y-auto">
        <CurrentOvleray/>
    </div>
}