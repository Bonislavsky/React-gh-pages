import React, { useState } from 'react';
import MyButton from './UI/MyButton';
import './Csses/Layer.css';

const Layer = (props) => {
    return(
        <div className="layer" style = {{ 
            backgroundColor: props.layer.isCurrent ? '#918d8efa' : null, 
            border: props.layer.isCurrent ? '2px solid #f6f6f600': null}} >
                
            <div onMouseDown = {() => props.activeLayer(props.layer)} >
                <div>
                    {props.layer.name}
                </div>
            </div>
            <div>
                <MyButton onClick = {() => props.remove(props.layer)} > удалить </MyButton> 
            </div>
        </div>
    );
}

export default Layer;
