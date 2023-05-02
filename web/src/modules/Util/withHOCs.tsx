import { ComponentWithProps, HOCProvider } from "types/common";

export function withHoc<TProps extends {}>(Component : ComponentWithProps<TProps>, HOC : HOCProvider) {
    return (props : TProps) => <HOC>
        <Component {...props}/>
    </HOC>;
}

export default function withHOCs<TProps extends {}>(Component : ComponentWithProps<TProps>, ...hocs : HOCProvider[]) : typeof Component {
    let CombinedHoc : HOCProvider | null = null;
    for(let HOC of hocs.reverse()) {
        if(CombinedHoc === null) {
            CombinedHoc = ({children}) => <HOC>{children}</HOC>
        } else {
            // @ts-ignore
            CombinedHoc = ({children}) => <HOC><CurrentHOC>{children}</CurrentHOC></HOC>
        }
    }

    if(CombinedHoc === null) return Component;
    // @ts-ignore
    return (props : TProps) => <CombinedHoc>
        <Component {...props}/>
    </CombinedHoc>;
}