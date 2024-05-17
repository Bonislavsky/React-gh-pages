import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GridLayout from 'react-grid-layout';
import React, { } from 'react';
import ColorPalette from "./Components/ColorPalette";
import Canvas from "./Components/Canvas";
import Context from "./Components/Context";
import LayersList from "./Components/LayersList";
import CustomPalette from "./Components/CustomPalette";
import WholePicture from "./Components/WholePicture";
import ButtonsList from "./Components/ButtonsList";
import './App.css';


function App() {
  // const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];
  const layoutConfig = [
    { i: 'buttons', x: 0, y: 0, w: 10, h: 1, static: true },
    { i: 'wholePicture', x: 10, y: 0, w: 2, h: 5, static: true },
    { i: 'palette', x: 0, y: 1, w: 2, h: 10, static: true },
    { i: 'canvas', x: 2, y: 1, w: 8, h: 21, static: true },
    { i: 'custom palette', x: 0, y: 11, w: 2, h: 6, static: true },   
    { i: 'brushInfo', x: 0, y: 17, w: 2, h: 8, static: true },
    { i: 'list_layers', x: 10, y: 5, w: 2, h: 21, static: true },
    { i: 'frame-by-frame_motion', x: 2, y: 22, w: 8, h: 4, static: true },
  ];
  
  return (
    <div className="app">
      <Context>
      <GridLayout className="example-layout" layout={layoutConfig} cols={12} rowHeight={30} width={window.innerWidth} margin = {[5, 5]}>
          <div key="buttons" className="grid_block"><ButtonsList/></div>
          <div key="wholePicture" className="grid_block"><WholePicture/></div>
          <div key="palette" className="grid_block"><ColorPalette/></div>
          <div key="canvas" className="grid_block"><Canvas/></div>
          <div key="custom palette" className="grid_block"><CustomPalette/></div>     
          <div key="brushInfo" className="grid_block">информация о кисти</div>
          <div key="list_layers" className="grid_block"><LayersList/></div>
          <div key="frame-by-frame_motion" className="grid_block">пошаговая анимация</div>
        </GridLayout>
      </Context>
    </div>
  );
}

export default App;
