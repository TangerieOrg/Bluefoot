import { useBluefootInstance, useBluefootModule } from '@Bluefoot';
import { useEffect, useState } from 'preact/hooks';
import JSONPretty from 'react-json-pretty';
import { CVectorToArray, ParseNoodleElements } from "@Bluefoot/BluefootUtil";
import { ComponentChildren } from 'preact';
import { useOverlayState } from '@modules/OverlayManager';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NodeDefinition } from '@Noodle/core/types/Node';
import { BuildFromNoodleElement } from '@Noodle/core/NodeDefinition';
import { NodeInnerRender } from '@Noodle/ui/components/Node/NodeRender';
import { NodeInstance } from '@Noodle/core/NodeInstance';

import NDL_STD from "bundle-text:../../resources/ndl/std.ndl";

const JSON_THEME : Record<string, string> = {
    main: 'line-height:1.3;color:#748096;overflow:auto;',
    error: 'line-height:1.3;color:#748096;overflow:auto;',
    key: 'color:#b553bf;',
    string: 'color:#fba856;',
    value: 'color:#93a3bf;',
    boolean: 'color:#448aa9;',
}

const Panel = ({children} : {children : ComponentChildren}) => <div class="w-full h-full bg-stone-800 overflow-y-auto">
    <pre class="w-full h-full p-4 overflow-x-auto">
        {children}
    </pre>
</div>

const RawNDLPanel = ({ndl} : {ndl : string}) => {
    return <Panel>{ndl}</Panel>
}

const JSONPanel = ({data} : {data : any}) => <Panel>
    {/* @ts-ignore */}
    <JSONPretty data={data} theme={JSON_THEME}/>
</Panel>

type ViewPanelType = "Raw" | "Token" | "Element" | "NodeData" | "Node"; 

const NodeViewer = ({defs} : {defs : NodeDefinition[]}) => <Panel>
    <div class="grid grid-cols-2 gap-4">
        {
            defs.map((def, i) => <div class="h-full mx-auto flex flex-col justify-center">
                <NodeInnerRender node={NodeInstance.fromDefinition(def)} key={i}/>
            </div>)
        }
    </div>
</Panel>

export default function NoodleOverlay() {
    const { setCurrent } = useOverlayState();
    
    const Module = useBluefootModule();
    const [tokens, setTokens] = useState<any[]>([]);
    const [elements, setElements] = useState<any[]>([]);
    const [nodes, setNodes] = useState<NodeDefinition[]>([]);
    const [viewedPanels, setViewedPanels] = useState<[ViewPanelType, ViewPanelType]>([
        "Element",
        "NodeData"
    ]);
    const [currentNDL, setCurrentNDL] = useState<string>(NDL_STD);

    useEffect(() => {
        if(!Module) return;
        
        const pa = new Module.NoodleParser();
        pa.setData(currentNDL);
        pa.parse();

        setTokens(CVectorToArray(pa.getTokens()));
        setElements(ParseNoodleElements(pa.getElements()));
        setNodes(CVectorToArray(pa.getElements()).map(el => BuildFromNoodleElement(el)));
    }, [Module, currentNDL]);

    return <div class="w-screen h-screen bg-stone-900">
        <div class="fixed top-0 w-full px-6 py-4 bg-stone-900 flex flex-row justify-between select-none">
            <div class="flex flex-col justify-center">
                <h1 class="text-xl">Noodle Parser</h1>
            </div>
            <div class="flex flex-col justify-center">
                <button class="text-xl hover:opacity-80 transition-opacity" onClick={() => setCurrent(null)}>
                    <FontAwesomeIcon icon={solid("close")}/>
                </button>
            </div>
        </div>
        <div class="h-full p-4 pt-16 grid grid-cols-2 gap-x-4">
            {
                viewedPanels.map(x => {
                    if(x == "Raw") return <RawNDLPanel ndl={currentNDL}/>;
                    if(x == "Element") return <JSONPanel data={elements}/>;
                    if(x == "Token") return <JSONPanel data={tokens}/>;
                    if(x == "NodeData") return <JSONPanel data={nodes}/>;
                    if(x == "Node") return <NodeViewer defs={nodes}/>
                })
            }
        </div>
    </div> 
}