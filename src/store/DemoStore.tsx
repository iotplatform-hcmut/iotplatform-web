import React, { FunctionComponent, createContext, useReducer } from "react"

interface DemoContext {
    store: number,
    dispatch: React.Dispatch<string>
}

const initState = 1

const reducer = (state: number, action: string) => {
    switch (action) {
        case "increment": { state++; break}
        case "decrement": { state--; break}
    }
    return state
}

export const DemoProvider: FunctionComponent = ({ children }) => {

    const [store, dispatch] = useReducer(reducer, initState)

    return (
        <demoContext.Provider value={{store:store, dispatch:dispatch}}>{children}</demoContext.Provider>
    )
}

export const demoContext = createContext<DemoContext | null>(null)