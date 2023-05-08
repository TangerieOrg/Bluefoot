import { useBluefootInstance } from '@modules/Bluefoot';
import { useEffect, useState } from 'preact/hooks';
import JSONPretty from 'react-json-pretty';
import { CMapToObject, CVectorToArray } from "@modules/Bluefoot/BluefootUtil";
import { NoodleParser } from '@modules/Bluefoot/types';
import { ComponentChildren } from 'preact';

const TEST_NDL = `   
// @DisplayName ToString (Number)
node numberToString {
    /*
    Pins are defined as "<type> <name>" or "<type> <name>(<default>)"
    They can optionally have a default value by providing it in brackets.
    */
    inputs {
        Execution execute;
        Number number;
        //@DisplayName Round?
        Boolean round;
    }

    outputs {
        Execution then;
        String string;
    }

    tags [ Development ]
}
`;

const ADD_NDL = `
// @DisplayName Add
node add {
    inputs {
        Number a(1);
        Number b(2);
    }
    
    outputs {
        Number sum;
    }

    tags [
        Pure
    ]
}
`;

const JSON_THEME : Record<string, string> = {
    main: 'line-height:1.3;color:#748096;overflow:auto;',
    error: 'line-height:1.3;color:#748096;overflow:auto;',
    key: 'color:#b553bf;',
    string: 'color:#fba856;',
    value: 'color:#93a3bf;',
    boolean: 'color:#448aa9;',
}

function getParserElements(pa : NoodleParser) {
    const outputData : any[] = [];
    const els = CVectorToArray(pa.getElements());
    for(let i = 0; i < els.length; i++) {
        outputData.push({
            ...els[i], 
            metadata: CMapToObject(els[i].metadata, pa.getMetadataKeys(i)),
            children: CVectorToArray(els[i].children)
        })
    } 
    return outputData;
}

function getParserTokens(pa : NoodleParser) {
    return CVectorToArray(pa.getTokens());
}

const RawNDLPanel = ({ndl} : {ndl : string}) => {
    return <div class="w-full h-full bg-stone-800 flex flex-row overflow-y-auto">
        <pre class="h-full py-4 pl-4 pr-2 opacity-75 text-right bg-stone-700">
            {ndl.split("\n").map((x, i) => <pre>{i}</pre>)}
        </pre>
        <pre class="w-full h-full bg-stone-800 p-4 overflow-x-auto">
            {ndl}
        </pre>
    </div>
}

const Panel = ({children} : {children : ComponentChildren}) => <div class="w-full h-full bg-stone-800 overflow-y-auto">
    <pre class="w-full h-full p-4 overflow-x-auto overflow-y-auto">
        {children}
    </pre>
</div>

const JSONPanel = ({data} : {data : any}) => <Panel>
    <JSONPretty data={data} theme={JSON_THEME}/>
</Panel>

export default function NoodleOverlay() {
    const instance = useBluefootInstance();
    const [tokens, setTokens] = useState<any[]>([]);
    const [elements, setElements] = useState<any[]>([]);
    const [viewRaw, setViewRaw] = useState(false);
    const [currentNDL, setCurrentNDL] = useState(ADD_NDL);

    useEffect(() => {
        if(!instance) return;
        
        const pa = instance.NoodleParser();
        pa.setData(currentNDL);
        pa.parse();
        
        setTokens(getParserTokens(pa));
        setElements(getParserElements(pa));
    }, [instance, currentNDL]);

    return <div class="w-screen h-screen bg-stone-900 p-4 grid grid-cols-2 gap-x-4">
        {
            viewRaw ? (<>
                <RawNDLPanel ndl={currentNDL}/>
                <JSONPanel data={tokens}/>
            </>) : (<>
                <JSONPanel data={tokens}/>
                <JSONPanel data={elements}/>
            </>)
        }
    </div> 
}