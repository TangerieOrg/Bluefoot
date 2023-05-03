import JSONPretty from 'react-json-pretty';
// @ts-ignore
import JSONPrettyMon from "react-json-pretty/dist/acai";
import { Stringify } from './Stringify';

export const StorybookLog = console.log.bind(console, "dev");

export const JSONComponent = ({data} : {data : any}) => {
    return <JSONPretty data={Stringify(data)} theme={JSONPrettyMon} className='[&>*]:p-4'/>
}