import { ComponentChildren } from "preact"

interface Props {
    title : ComponentChildren;
    titleClass?: string;
    children? : ComponentChildren;
    bodyClass? : string;
}

export default function TitleBox({title, children, ...props} : Props) {
    return <div class="min-h-fit w-fit shadow-lg shadow-stone-900 group/titlebox">
        <div class={`rounded-t-lg px-4 py-2 bg-stone-800 ${props.titleClass}`}>
            <h1 class="text-lg">{title}</h1>
        </div>
        <div class={`rounded-b-lg bg-stone-700 ${props.bodyClass}`}>
            {children}
        </div>
    </div>
}