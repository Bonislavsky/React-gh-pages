import React, { useState } from 'react';
import Layer from './Layer';
import MyButton from './UI/MyButton';
import { v4 as uuidv4 } from 'uuid'; // импорт функции для создания UUID

const LayersList = () => {

    const [layers, setLayer] = useState([
        {id: 1, name: 'layer1', index: 1},
      ]);


    const createLayer = () => {
        const newLayer = {
            id: uuidv4(),

            name: "layer"
        };

        setLayer([...layers, newLayer])
    };
      
    const removeLayer = (deleteLayer) => {
        setLayer(layers.filter(p => p.id !== deleteLayer.id))
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div>
                <MyButton onClick = {() => createLayer()} > новый слой </MyButton> 
            </div>
            { layers.map((layer, ind) => <Layer remove = {removeLayer} layer = {layer} key = {layer.id}/>)}
        </div>
    );
}

export default LayersList;
