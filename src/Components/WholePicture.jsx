import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from "./Context";

const WholePicture = (props) => {
  const { layers } = useContext(MyContext);
  const blockSize = 12;
  const blockStyle = {
    width: blockSize,
    height: blockSize,
  };

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
          ></div>
        );
      }
      grid.push(<div key={row} className="row">{rowData}</div>);
    }
    return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(25, 12px)' }}>{grid}</div>;
  };

  return (
    <div id='MiniCanvas' style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {renderGrid()}
    </div>
  );
}

export default WholePicture;