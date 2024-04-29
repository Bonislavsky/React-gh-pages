import React, { useState, useContext } from 'react';
import MyButton from './UI/MyButton';
import { MyContext } from "./Context";
import { toPng, toJpeg } from 'html-to-image';
import rightArrowImage from './Images/rightArrow.png';
import leftArrowImage from './Images/leftArrow.png';
import pngImage from './Images/png.png';
import jpgImage from './Images/jpg.png';

const ButtonsList = (props) => {
  const { GetNextClick, GetPreviousClick } = useContext(MyContext);

  const DownloadImagePNG = () => {
    const element = document.getElementById('Canvas');
    toPng(element)
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'image.png';
        link.href = dataUrl;
        link.click();
      });
  };

  const DownloadImageJPG = () => {
    const element = document.getElementById('Canvas');
    toJpeg(element)
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'image.jpg';
        link.href = dataUrl;
        link.click();
      });
  };

  return( 
    <div>
      <MyButton onClick={DownloadImagePNG}>
        <img src={pngImage} alt="png" style={{ width: '22px', height: '22px' }}/>
        png
      </MyButton>

      <MyButton onClick={DownloadImageJPG}>
        <img src={jpgImage} alt="jpg" style={{ width: '22px', height: '22px' }}/>
        jpg
      </MyButton>

      <MyButton onClick={() => GetPreviousClick()}>
        <img src={leftArrowImage} alt="Previous" style={{ width: '22px', height: '22px' }}/>
      </MyButton>
      
      <MyButton onClick={() => GetNextClick()}>
        <img src={rightArrowImage} alt="Next" style={{ width: '22px', height: '22px' }}/>
      </MyButton>
    </div>
  );
}

export default ButtonsList;
