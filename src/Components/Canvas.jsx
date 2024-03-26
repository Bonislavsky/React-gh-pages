import React, { useState, useContext } from 'react';
import { CursorContext } from "./Context";
import UseAltWheelScroll from './Effects/UseAltWheelScroll';

const Canvas = () => {
    
    const initialMatrix = (rows, cols) => {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row[j] ={
                    Color: "#ffffff",
                    IsBackgroundColor: true,
                }          
            }
            matrix[i] = row;
        }
        return matrix;
    };

    const { cursor } = useContext(CursorContext);
    const [matrix, setMatrix] = useState(initialMatrix(13, 25));
    const blockSize = 50; // Размер каждого блока матрицы
    const altPressed = UseAltWheelScroll();

    const blockStyle = {
        width: blockSize,
        height: blockSize,
        border: '1px solid #ccc',
    };

    const MatrixGrid = () => {
        return (
            <div style={{ overflow: 'auto', width: '100%', height: '100%' }}>
                <div style={{ width: matrix[0].length * blockSize, height: matrix.length * blockSize }}>
                    {matrix.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex' }}>
                            {row.map((cell, colIndex) => (
                                <div
                                    key={colIndex}
                                    style={{
                                        ...blockStyle,
                                        backgroundColor: cell.Color,
                                      }}
                                    onClick={() => UpdateMatrix(rowIndex, colIndex)}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const UpdateMatrix = (rowIndex, colIndex) => {
        setMatrix(prevMatrix => {
          console.log('попытка обновить матрицу', cursor.Color);
          const updatedMatrix = [...prevMatrix];
          updatedMatrix[rowIndex][colIndex] = {
            Color: cursor.Color,
            IsBackgroundColor: false 
        };
          return updatedMatrix;
        });
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MatrixGrid/>
        </div>
    );
}

export default Canvas;
