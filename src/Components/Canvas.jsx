import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from "./Context";
import './Csses/Canvas.css';

const Canvas = () => {
  const { cursor, layers, AddCoordinateColor, AddNewClick } = useContext(MyContext);
  const blockSize = 50;
  
  const blockStyle = {
    width: blockSize,
    height: blockSize,
    border: '1px solid #ccc',
  };

  const handlerClickBlock = (layerId, row, col, prevColor) => {
    AddCoordinateColor(layerId, row, col, cursor.color);
    AddNewClick(layerId, row, col, prevColor);
  }

  const renderGrid = () => {
    const currentLayer = layers.find((layer) => layer.isCurrent);
    if (!currentLayer) return null;

    const grid = [];
    for (let row = 0; row < 25; row++) {
      const rowData = [];
      for (let col = 0; col < 13; col++) {
        const coordinate = currentLayer.listCoordinates.find(
          (coord) => coord.row === row && coord.col === col
        );
        const color = coordinate ? coordinate.color : "#ffffff";
        rowData.push(
          <div
            key={`${row}-${col}`}
            style={{
              ...blockStyle,
              backgroundColor: color,
            }}
            onMouseDown={() => handlerClickBlock(currentLayer.id, row, col, color)}
          ></div>
        );
      }
      grid.push(<div key={row} className="row">{rowData}</div>);
    }
    return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(25, 50px)' }}>{grid}</div>;
  };

  useEffect(() => {
    const handleLayerChange = () => {
      const currentLayer = layers.find((layer) => layer.isCurrent);
      if (currentLayer) {
        // todo: тут логика если меняестя слой
      }
    };

    handleLayerChange();
  }, [layers]);

  return (
    <div id='Canvas' style={{ width: '100%', height: '100%' }}>
      {renderGrid()}
    </div>
  );
};

export default Canvas;