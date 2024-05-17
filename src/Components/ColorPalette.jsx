import React, { useState, useContext } from 'react';
import { MyContext } from "./Context";
import Sketch from '@uiw/react-color-sketch';
import MyButton from './UI/MyButton';

const ColorPalette = () => {
  const { UpdateColor } = useContext(MyContext);
  const [hex, setHex] = useState("#fff");
  const [mode, setMode] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setMode(buttonNumber);
  };

  const renderPalette = () => {
    const colorsCase3 = [
      ['#FF0000', '#FF2800', '#FF5000', '#FF7800', '#FFA000', '#FFC800', '#FFF000'],
      ['#E00000', '#E02400', '#E04800', '#E06C00', '#E09000', '#E0B400', '#E0D800'],
      ['#C00000', '#C02000', '#C04000', '#C06000', '#C08000', '#C0A000', '#C0C000'],
      ['#A00000', '#A02000', '#A04000', '#A06000', '#A08000', '#A0A000', '#A0C000'],
      ['#800000', '#802000', '#804000', '#806000', '#808000', '#80A000', '#80C000'],
      ['#600000', '#602000', '#604000', '#606000', '#608000', '#60A000', '#60C000'],
      ['#400000', '#402000', '#404000', '#406000', '#408000', '#40A000', '#40C000'],
      ['#200000', '#202000', '#204000', '#206000', '#208000', '#20A000', '#20C000'],
      ['#000000', '#002000', '#004000', '#006000', '#008000', '#00A000', '#00C000'],
      ['#000020', '#002020', '#004020', '#006020', '#008020', '#00A020', '#00C020'],
      ['#000040', '#002040', '#004040', '#006040', '#008040', '#00A040', '#00C040'],
      ['#000060', '#002060', '#004060', '#006060', '#008060', '#00A060', '#00C060'],
      ['#000080', '#002080', '#004080', '#006080', '#008080', '#00A080', '#00C080'],
      ['#0000A0', '#0020A0', '#0040A0', '#0060A0', '#0080A0', '#00A0A0', '#00C0A0'],
      ['#0000C0', '#0020C0', '#0040C0', '#0060C0', '#0080C0', '#00A0C0', '#00C0C0'],
      ['#0000E0', '#0020E0', '#0040E0', '#0060E0', '#0080E0', '#00A0E0', '#00C0E0']
    ];

    switch (mode) {
      case 1:
        return (
          <Sketch
            style={{ width: '100%', height: '100%', backgroundColor: 'rgb(200, 200, 200)' }}
            color={hex}
            onChange={(color) => {
              setHex(color.hex);
              UpdateColor(color.hex);
            }}
          />
        );
      case 2:
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff'];
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {colors.map((color, index) => (
              <div
                key={index}
                style={{
                  width: '20%',
                  height: '100px',
                  backgroundColor: color,
                  border: '1px solid black',
                  boxSizing: 'border-box',
                }}
              />
            ))}
          </div>
        );
      case 3:
        return (
          <table>
          <tbody>
            {colorsCase3.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((color, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    style={{ backgroundColor: color, width: 41, height: 15.7 }}
                    onClick={() => UpdateColor(color)}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <MyButton style={{ width: '33.33%', height: '28px' }} onClick={() => handleButtonClick(1)}>
        1
      </MyButton>
      <MyButton style={{ width: '33.33%', height: '28px' }} onClick={() => handleButtonClick(2)}>
        2
      </MyButton>
      <MyButton style={{ width: '33.33%', height: '28px' }} onClick={() => handleButtonClick(3)}>
        3
      </MyButton>
      {renderPalette()}
    </div>
  );
};

export default ColorPalette;