import React, { useState, useContext} from 'react';
import Layer from './Layer';
import MyButton from './UI/MyButton';
import { MyContext } from "./Context";

const LayersList = () => {

    const myContext = useContext(MyContext);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div>
                <MyButton onClick = {() => myContext.CreateLayer()} > новый слой </MyButton> 
            </div>
            { myContext.layers.map((layer, ind) => <Layer remove = {myContext.RemoveLayer} activeLayer = {myContext.SetActiveLayer} layer = {layer} key = {layer.id}/>)}
        </div>
    );
}

export default LayersList;