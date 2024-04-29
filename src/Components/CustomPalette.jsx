import React, { useState, useContext, useEffect} from 'react';
import { MyContext } from "./Context";
import MyButton from './UI/MyButton';
import { v4 as uuidv4 } from 'uuid';


const CustomPalette = () => {  

    const { cursor, UpdateColor } = useContext(MyContext);
    const [isWatchingColor, setIsWatchingColor] = useState(true);
    const [palette, setPalette] = useState([]);

    const addNewColorToPalatte = (color) => {
        const newColor = {
            id: uuidv4(),
            color: color
        };
        setPalette([...palette, newColor])
    }; 
    
    const removeColorFromPalette = (colorToRemove) => {
        setPalette(palette.filter(item => item.color !== colorToRemove));
    };
    
    useEffect(() => {
        if (isWatchingColor && !palette.some(item => item.color === cursor.color)) {
          addNewColorToPalatte(cursor.color);
        }
    }, [cursor.color, isWatchingColor]);

    const toggleWatchingColor = () => {
        setIsWatchingColor(prevState => !prevState);
    };

    const handleColorClick = (event, color) => {
        if (event.altKey) {
            removeColorFromPalette(color);
        } 
        else {
            UpdateColor(color);
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='AddCollor' style={{ marginBottom: '5px' }}>
                    <MyButton onClick={toggleWatchingColor}>{isWatchingColor ? 'Stop Watching' : 'Start Watching'}</MyButton>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {palette.map((item, index) => (
                        <div
                            key={item.id}
                            style={{
                                width: '22px',
                                height: '22px',
                                backgroundColor: item.color,
                                margin: '1px',
                                cursor: 'pointer',
                            }}
                            onClick={(event) => {
                                handleColorClick(event, item.color);
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
  };
  
  export default CustomPalette;