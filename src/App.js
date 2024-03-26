import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GridLayout from 'react-grid-layout';
import React, { useState } from 'react';
import ColorPicker from "./Components/ColorPicker";
import Canvas from "./Components/Canvas";
import Context from "./Components/Context";
import LayersList from "./Components/LayersList";


function App() {
  const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];
  const layoutConfig = [
    { i: 'buttons', x: 0, y: 0, w: 10, h: 1, static: true },
    { i: 'wholePicture', x: 10, y: 0, w: 2, h: 5, static: true },
    { i: 'palette', x: 0, y: 1, w: 2, h: 8, static: true },
    { i: 'custom palette', x: 0, y: 9, w: 2, h: 6, static: true },   
    { i: 'canvas', x: 2, y: 1, w: 8, h: 18, static: true },
    { i: 'canvas settings', x: 10, y: 5, w: 2, h: 5, static: true },
    { i: 'brushes', x: 0, y: 15, w: 2, h: 6, static: true },
    { i: 'list_layers', x: 10, y: 10, w: 2, h: 11, static: true },
    { i: 'frame-by-frame_motion', x: 2, y: 19, w: 8, h: 2, static: true },
    { i: 'xpen1', x: 0, y: 21, w: 12, h: 1, static: true }
  ];
  
  const modernStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgb(160, 160, 160)",
    height: "100vh", 
    flexDirection: 'column',
    gap: '10px',
  }

  return (
    <div className="App">
      <Context>
        <GridLayout className="example-layout" layout={layoutConfig} cols={12} rowHeight={30} width={window.innerWidth-15}>
          <div key="buttons" style={modernStyle}>кнопки</div>
          <div key="wholePicture" style={modernStyle}>целый рисунок</div>
          <div key="palette" style={modernStyle}><ColorPicker/></div>
          <div key="canvas" style={modernStyle}><Canvas/></div>
          <div key="canvas settings" style={modernStyle}>настройки холста</div>
          <div key="custom palette" style={modernStyle}>кастомная палитра</div>     
          <div key="brushes" style={modernStyle}>кисти</div>
          <div key="list_layers" style={modernStyle}><LayersList/></div>
          <div key="frame-by-frame_motion" style={modernStyle}>пошаговая анимация</div>
          <div key="xpen1" style={modernStyle}>пхрень снизу </div>
        </GridLayout>
      </Context>
    </div>
  );
}

export default App;
