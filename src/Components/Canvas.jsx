import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from "./Context";
import './Csses/Canvas.css';

const Canvas = () => {
  const { cursor, layers, AddCoordinateColor, AddNewClick } = useContext(MyContext);

  const handlerClickBlock = (layerId, row, col, prevColor) => {
    AddCoordinateColor(layerId, row, col, cursor.color);
    AddNewClick(layerId, row, col, prevColor);
  }

  const renderGrid = () => {
    const currentLayer = layers.find((layer) => layer.isCurrent);
    if (!currentLayer) return null;

    let list2Print = [];
    for(let i = layers.length-1; i >= 0; i--)
    {
      const lay = layers[i];
      for(let j = 0; j < lay.listCoordinates.length; j++)
      {
        const currentCoord = lay.listCoordinates[j];

        const coord = {
          isCurrent: lay.isCurrent,
          coordinate: {
            row: currentCoord.row, 
            col: currentCoord.col, 
            color: currentCoord.color || '#ffffff'}
        }
                
        if (coord.isCurrent) {list2Print.push(coord);} 
        else 
        {
          const ind = list2Print.findIndex((item) => item.coordinate.row === coord.row && item.coordinate.col == coord.col);
          if (ind === -1) {
            list2Print.push(coord);
          }
        }
      }
    }

    const tableRows = [];
    for(let row = 0; row < 100; row++){
      const cells = [];
      for (let col = 0; col < 100; col++) {

        const item = list2Print.find(item => item.coordinate.row === row && item.coordinate.col === col);
        const color = item !== undefined ? item.coordinate.color : "#ffffff"

        cells.push(
          <td className='block'
            key={col}
            style={{backgroundColor: color}}
            onMouseDown={() => handlerClickBlock(currentLayer.id, row, col, color)}
          ></td>
        );

      }
      tableRows.push(<tr key={row}>{cells}</tr>);
    }

    return <table><tbody>{tableRows}</tbody></table>;  
  };

  return (
  <div id='Canvas' style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      {renderGrid()}
  </div>
  );
};

export default Canvas;