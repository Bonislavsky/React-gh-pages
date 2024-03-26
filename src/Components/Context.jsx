import React, {useState, createContext } from "react";

export const CursorContext = createContext();

const Context = (props) =>{

    const [cursor, setCursor] = useState({ Color: "#adff2f" });

    const UpdateColor = (color) => {
        setCursor((prevState) => { 
            console.log("старый цвет", prevState.Color);
            console.log("новий цвет",color);
            return { ...prevState, Color: color };
        });
    };
    
    const value = { cursor, UpdateColor };

    return <CursorContext.Provider value = {value}>
        {props.children}
        </CursorContext.Provider>;
} 

export default Context;