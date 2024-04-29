import React, { useState } from 'react';
import MyButton from './UI/MyButton';

const Layer = (props) => {

    return(
        <div className="layer" onClick={() => props.activeLayer(props.layer.id)}>
            <div>
                {props.layer.name}
            </div>
            <div> 
                <MyButton onClick = {() => props.remove(props.layer)} > удалить </MyButton> 
            </div>
      </div>
    );
}

export default Layer;
