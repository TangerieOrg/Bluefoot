import EditorViewport from "@Noodle/components/Editor/EditorViewport";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOverlayState } from "@modules/OverlayManager";

export default function NoodleEditor() {
    const { setCurrent } = useOverlayState();

    return <div class="w-screen h-screen">
        <div class="fixed top-0 left-0 right-0 px-6 py-4 bg-stone-900 flex flex-row justify-between z-50 select-none">
            <div class="flex flex-col justify-center">
                <h1 class="text-xl">Node Editor</h1>
            </div>
            <div class="flex flex-col justify-center">
                <button class="text-xl hover:opacity-80 transition-opacity" onClick={() => setCurrent(null)}>
                    <FontAwesomeIcon icon={solid("close")}/>
                </button>
            </div>
        </div>
        <EditorViewport/>
    </div>
}