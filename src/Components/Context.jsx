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
            isCurrent : true,
            listCoordinates : []
        }]);
    
    const GetPreviousClick = () => {
      const currentIndex = click.findIndex(item => item.isCurrent);
      if(currentIndex === -1){console.log("ошибка: текущий клик не найден")};
      
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
        const newLayer = {
            id: uuidv4(),
            name: `layer ${layers.length + 1}`,
            listCoordinates: [],
            isCurrent: false
        };

        setLayer([...layers, newLayer])
    };
      
    const RemoveLayer = (deleteLayer) => {
        setLayer(layers.filter(p => p.id !== deleteLayer.id))
    };

    const SetActiveLayer = (layerId) => {
        const updatedLayers = layers.map(layer => {
            if (layer.id === layerId) {return { ...layer, isCurrent: true };} 
            else                      {return { ...layer, isCurrent: false };}
        });
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