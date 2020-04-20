import { FunctionComponent, createElement, ReactNode } from "react"


interface ITitle {
    name: string
    icon: ReactNode
}

// const Title: FunctionComponent<ITitle> = ({ name, icon }) => {
//     return (
//         <div>
//             {createElement(icon as FunctionComponent)}
//             {name}
//         </div>
//     )
// }