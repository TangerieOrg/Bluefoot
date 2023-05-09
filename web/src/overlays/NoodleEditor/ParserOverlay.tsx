import { useBluefootInstance } from '@modules/Bluefoot';
import { useEffect, useState } from 'preact/hooks';
import JSONPretty from 'react-json-pretty';
import { CVectorToArray, ParseNoodleElements } from "@modules/Bluefoot/BluefootUtil";
import { ComponentChildren } from 'preact';
import { useOverlayState } from '@modules/OverlayManager';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
// @Description Returns the sum of a and b
node add {
    inputs {
        // @DisplayName A
        // @Description First Number
        Number a(1);
        // @Description Second Number
        // @DisplayName B
        Number b(2);
    }
    
    outputs {
        // @DisplayName Sum Result
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



const Panel = ({children} : {children : ComponentChildren}) => <div class="w-full h-full bg-stone-800 overflow-y-auto">
    <pre class="w-full h-full p-4 overflow-x-auto">
        {children}
    </pre>
</div>

const RawNDLPanel = ({ndl} : {ndl : string}) => {
    return <Panel>{ndl}</Panel>
}

const JSONPanel = ({data} : {data : any}) => <Panel>
    <JSONPretty data={data} theme={JSON_THEME}/>
</Panel>

type ViewPanelType = "Raw" | "Token" | "Element"; 

export default function NoodleOverlay() {
    const { setCurrent } = useOverlayState();
    
    const instance = useBluefootInstance();
    const [tokens, setTokens] = useState<any[]>([]);
    const [elements, setElements] = useState<any[]>([]);
    const [viewedPanels, setViewedPanels] = useState<[ViewPanelType, ViewPanelType]>([
        "Raw",
        "Element"
    ]);
    const [currentNDL, setCurrentNDL] = useState([
        ADD_NDL,
        TEST_NDL
    ].join('\n'));

    useEffect(() => {
        if(!instance) return;
        
        const pa = instance.NoodleParser();
        pa.setData(currentNDL);
        pa.parse();

        setTokens(CVectorToArray(pa.getTokens()));
        setElements(ParseNoodleElements(pa.getElements()));
    }, [instance, currentNDL]);

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
                })
            }
        </div>
    </div> 
}