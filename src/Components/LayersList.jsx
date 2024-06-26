import React, { useState, useContext, useEffect} from 'react';
import Layer from './Layer';
import MyButton from './UI/MyButton';
import { MyContext } from "./Context";

const LayersList = () => {

    const myContext = useContext(MyContext);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div id = 'btn_add_layer'>
                <MyButton onClick = {() => myContext.CreateLayer()} > новый слой </MyButton> 
            </div>
            <div id = 'layer_list'>
                { 
                    myContext.layers.map((layer, ind) => 
                    <Layer remove = {myContext.RemoveLayer} activeLayer = {myContext.SetActiveLayer} layer = {layer} key = {layer.id}/>)
                }
            </div>
        </div>
    );
}

export default LayersList;