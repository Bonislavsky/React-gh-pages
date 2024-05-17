import React, {useState, createContext } from "react";
import { v4 as uuidv4 } from 'uuid';

export const MyContext = createContext();

const Context = (props) =>{

    const [click, setClick] = useState([]);
    const [cursor, setCursor] = useState({ color: "#adff2f" });
    const [layers, setLayer] = useState([
        {
            id: uuidv4(),
            name: `layer 1`,
            index : 1,
            isCurrent : true,
            listCoordinates : []
        }]);
    
    const GetPreviousClick = () => {
      if(click.length === 0){console.log("кликов нет"); return;};
      const currentIndex = click.findIndex(item => item.isCurrent);
      if(currentIndex === -1){console.log("ошибка: текущий клик не найден"); return;};
      
      console.log(currentIndex);
      if(currentIndex > 0){
        const updatedClick = [...click]; 
        updatedClick[currentIndex].isCurrent = false; 
        updatedClick[currentIndex - 1].isCurrent = true; 
          
        setClick(updatedClick);
      }
      else{console.log("вы на первом клике");}

      const currentClick = click[currentIndex];
      AddCoordinateColor(currentClick.layerId, currentClick.row, currentClick.col, currentClick.prevColor);
    };
        
    const GetNextClick = () => {
      let currentIndex = click.findIndex(item => item.isCurrent);
      if(currentIndex === -1){console.log("ошибка: текущий клик не найден"); return;}
      else if(currentIndex === click.length - 1){ console.log("вы на последнем клике"); return;}

      currentIndex += 1;
      if(currentIndex < click.length) {
        const updatedClick = [...click]; 
        updatedClick[currentIndex - 1].isCurrent = false; 
        updatedClick[currentIndex].isCurrent = true; 
      
        setClick(updatedClick);
      } 
      else {console.log("вы на последнем клике"); return;}

      if(currentIndex === 1){
        const fierstClick = click[0];
        AddCoordinateColor(fierstClick.layerId, fierstClick.row, fierstClick.col, fierstClick.newColor);
      }

      const currentClick = click[currentIndex];
      AddCoordinateColor(currentClick.layerId, currentClick.row, currentClick.col, currentClick.newColor);
    };
      
    const AddNewClick = (layerId, row, col, prevColor) => {
      let currentIndex = click.findIndex(item => item.isCurrent);
      if(click.length !== 0 && currentIndex === -1){console.log('все плохо'); return;}

      const newClick = {
        id: uuidv4(),
        layerId: layerId,
        row: row,
        col: col, 
        prevColor: prevColor,
        newColor: cursor.color,
        isCurrent: true
      };      
      
      if(click.length === 0){setClick([newClick]); return;}

      const updatedClick = click.map(item => ({ ...item, isCurrent: false }));
      updatedClick.splice(currentIndex+1);
      updatedClick.push(newClick);

      setClick(updatedClick);
    }      

    const CreateLayer = () => {

      let newIndex = 1;
      let isCurrent = true;
      if(layers.length !== 0){
        const highestIndexLayer = layers.reduce((prevLayer, currentLayer) => {
          return (prevLayer.index > currentLayer.index) ? prevLayer : currentLayer;
        });

        newIndex = highestIndexLayer.index + 1;
        isCurrent = false
      }

      const newLayer = {
        id: uuidv4(),
        name: `layer ${layers.length + 1}`,
        index: newIndex,
        isCurrent: isCurrent,
        listCoordinates: [],
      };

      setLayer([...layers, newLayer]);

    };
      
    const RemoveLayer = (deleteLayer) => {
      if(!deleteLayer.isCurrent || layers.length === 1)
      {      
        setLayer(layers.filter(p => p.id !== deleteLayer.id));
        return;
      }
   
      const indToDelete = layers.findIndex(item => item.isCurrent);
      if(indToDelete <= -1){console.log('ошибка: не находится выбранный слой'); return;}

      if(layers.length !== 0)
      {
        const nextInd = indToDelete === 0 ? indToDelete + 1 : indToDelete - 1;

        const updatedLayers = [...layers]; 
        updatedLayers[nextInd].isCurrent = true; 

        setLayer(updatedLayers.filter(p => p.id !== deleteLayer.id));
      }
    };

    const SetActiveLayer = (layer) => {
      if(layer.isCurrent) {return;}
      const indNewLay = layers.findIndex(item => item.id == layer.id);
      const indCurrent = layers.findIndex(item => item.isCurrent);

      const updatedLayers = [...layers]; 
      updatedLayers[indNewLay].isCurrent = true; 
      updatedLayers[indCurrent].isCurrent = false; 
        
      setLayer(updatedLayers);
    };

    const AddCoordinateColor = (layerId, rowInd, colInd, newColor) => {
      setLayer(prevLayers => {
        return prevLayers.map(layer => {
          if (layer.id === layerId) {
            const newListCoordinates = [...layer.listCoordinates];
            const existingIndex = newListCoordinates.findIndex(coord => coord.row === rowInd && coord.col === colInd);
    
            const newCoordinate = { row: rowInd, col: colInd, color: newColor };
    
            if (existingIndex !== -1) {newListCoordinates[existingIndex] = newCoordinate;} 
            else {newListCoordinates.push(newCoordinate);}
    
            return { ...layer, listCoordinates: newListCoordinates };
          }
          return layer;
        });
      });
    };

    const UpdateColor = (color) => {
      setCursor((prevState) => { 
          return { ...prevState, color: color };
      });
   };
    
    const value = { 
        cursor, 
        layers,
        click,

        UpdateColor,

        CreateLayer,
        RemoveLayer,
        SetActiveLayer,
        AddCoordinateColor,

        AddNewClick,
        GetNextClick,
        GetPreviousClick
     };

    return <MyContext.Provider value = {value}>{props.children}</MyContext.Provider>;
} 

export default Context;