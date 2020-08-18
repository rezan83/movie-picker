import React from "react";
import { IState, IAction } from "./interfaces";



const initialState: IState = {
    episodes: [],
    favorites: [],
};
export const Store = React.createContext<IState|any>(initialState);

function reducer(state: IState, action: IAction) {
    switch (action.type) {
        case "FETCH_DATA":
            return { ...state, episodes: action.payload };
        case "ADD":
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        case "REMOVE":
            let removeFavorites = [...state.favorites].filter(ep => ep.id!==action.payload.id);
            return { ...state, favorites: removeFavorites };
        default:
            return state;
    }
}

export function StoreProvider(props: any): JSX.Element {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <Store.Provider value={{ state, dispatch }}>
            {props.children}
        </Store.Provider>
    );
}
