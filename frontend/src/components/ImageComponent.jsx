import { useState, useEffect, useRef } from 'react';
import ZoomIcon from '../assets/ZoomIcon';
import SatIcon from '../assets/SatIcon';
import PropTypes from 'prop-types';

ImageComponent.propTypes = {
  image: PropTypes.string.isRequired,
};

const glassSize = 100;
const offset = 50;

function ImageComponent({ image }) {

  const imgRef = useRef();
  const divRef = useRef();
  const [zoom, setZoom] = useState(2);
  const [red, setRed] = useState(1);
  const [green, setGreen] = useState(1);
  const [blue, setBlue] = useState(1);
  const [focusedColor, setFocusedColor] = useState("red");
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierGlassStyle, setMagnifierGlassStyle] = useState({});

  useEffect(() => {
    const imageObj = new Image();
    imageObj.onload = function(){
      
        drawImage(this);
      };
      imageObj.src = image;
}, [image, red, green, blue]);

  function drawImage(imageObj){
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const hRatio = canvas.width / imageObj.width;
    const vRatio = canvas.height / imageObj.height;
    const ratio  = Math.min ( hRatio, vRatio );
    context.drawImage(imageObj, 0,0, imageObj.width, imageObj.height, 0,0,imageObj.width*ratio, imageObj.height*ratio);
    redrawImage(canvas, imageObj)
}

function redrawImage(canvas, imageObj){
  const hiddenCanvas = document.createElement('canvas');
  hiddenCanvas.id = "hiddenCanvas";
  hiddenCanvas.width = 768;
  hiddenCanvas.height = 432;

  const context = hiddenCanvas.getContext("2d");
  

  const hRatio = hiddenCanvas.width / imageObj.width;
  const vRatio = hiddenCanvas.height / imageObj.height;
  const ratio  = Math.min ( hRatio, vRatio );
  context.drawImage(imageObj, 0,0, imageObj.width, imageObj.height, 0,0,imageObj.width*ratio, imageObj.height*ratio);

  const imageData = context.getImageData(0, 0, hiddenCanvas.width, hiddenCanvas.height);
  const data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
      var r = data[i];
      data[i] = r * red;
      var g = data[i + 1];
      data[i + 1] = g * green;
      var b = data[i + 2];
      data[i + 2] = b * blue;
  }
  canvas.getContext("2d").putImageData(imageData, 0, 0);
}

    useEffect(() => {
        divRef.current.focus();
    }, []);

    const moveMagnifier = (e) => {
      if (!showMagnifier) return;

        const {
            left: imgLeft,
            top: imgTop,
            width: imgWidth,
            height: imgHeight,
        } = imgRef.current.getBoundingClientRect();
        
        const cursorX = e.pageX - imgLeft;
        const cursorY = e.pageY - imgTop;
        
        const offsetX =
            cursorX + offset + glassSize > imgWidth ? -offset : offset;
        const offsetY =
            cursorY + offset + glassSize > imgHeight ? -offset : offset;

        const bgPosX = Math.min(
            0,
            Math.max(
                -(cursorX * zoom - glassSize / 2),
                -(imgWidth * zoom - glassSize)
            )
        );
        const bgPosY = Math.min(
            0,
            Math.max(
                -(cursorY * zoom - glassSize / 2),
                -(imgHeight * zoom - glassSize)
            )
        );

        const glassX = cursorX - glassSize / 2 + offsetX;
        const glassY = cursorY - glassSize / 2 + offsetY;

        setMagnifierGlassStyle({
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoom}px ${imgHeight * zoom}px`,
            borderRadius: "50%",
            border: "2px solid white",
            width: `${glassSize}px`,
            height: `${glassSize}px`,
            position: "absolute",
            left: `${glassX}px`,
            top: `${glassY}px`,
            cursor: "none",
            backgroundPosition: `${bgPosX}px ${bgPosY}px`,
        });
    };

    const handleMouseEnter = () => {
      setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
      setShowMagnifier(false);
      setMagnifierGlassStyle({});
  };

    const handleZoomChange = (e) => {
        setZoom(e.target.value);
    };

    const handleColorChange = (e) => {
      if(e.target.id == "red"){
        setRed(e.target.value/100)
      }else if(e.target.id == "green"){
        setGreen(e.target.value/100)
      }else if(e.target.id == "blue"){
        setBlue(e.target.value/100)
      }
  }

    const handleWheel = (e) => {
        const newZoom = Math.min(10, Math.max(1, zoom + e.deltaY * -0.1));
        setZoom(newZoom);

        moveMagnifier(e);
    };

    const handleKeyDown = (e) => {
      if(e.code === "KeyR"){
        setFocusedColor("red");
      }
      if(e.code === "KeyG"){
        setFocusedColor("green");
      }
      if(e.code === "KeyB"){
        setFocusedColor("blue");
      }
    
      if (e.code === "ArrowRight") {
        if(focusedColor === "red"){
          setRed(Math.min(1, red + 0.01));
        }
        if(focusedColor === "green"){
          setGreen(Math.min(1, green + 0.01));
        }
        if(focusedColor === "blue"){
          setBlue(Math.min(1, blue + 0.01));
        } 
      }
      if (e.code === "ArrowLeft") {
        if(focusedColor === "red"){
          setRed(Math.max(0, red - 0.01));
        }
        if(focusedColor === "green"){
          setGreen(Math.max(0, green - 0.01));
        }
        if(focusedColor === "blue"){
          setBlue(Math.max(0, blue - 0.01));
        } 
      }
    };
    
    return (
        <div
            ref={divRef}
            className="full-viewport"
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className="flex justify-center items-center">
                <div
                    className="w-768 h-432 relative shadow overflow-hidden mr-4"
                    onMouseMove={moveMagnifier}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* <img ref={imgRef} src={image} alt="Zoomed Image" /> */}
                    <canvas id="canvas" ref={imgRef} width="768" height="432"/>
                    <div style={magnifierGlassStyle} />
                </div>
                <div className="flex flex-col ml-4">
                    <div className="flex items-center">
                        <ZoomIcon />
                        <label htmlFor="zoom" className="label m-2">
                            Zoom: {Math.round(zoom)}x
                        </label>
                    </div>
                    <input
                        id="zoom"
                        className="vertical-slider"
                        type="range"
                        min="1"
                        max="10"
                        value={zoom}
                        onChange={handleZoomChange}
                        orient="vertical"
                    />
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <SatIcon />
                <label htmlFor="red" className="label m-2">
                    Red: {Math.round(red*100)}%
                </label>
                <input
                    id="red"
                    className="horizontal-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={red*100}
                    onChange={handleColorChange}
                />
            </div>
            <div className="flex justify-center items-center mt-4">
                <SatIcon />
                <label htmlFor="green" className="label m-2">
                    Green: {Math.round(green*100)}%
                </label>
                <input
                    id="green"
                    className="horizontal-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={green*100}
                    onChange={handleColorChange}
                />
            </div>
            <div className="flex justify-center items-center mt-4">
                <SatIcon />
                <label htmlFor="blue" className="label m-2">
                    Blue: {Math.round(blue*100)}%
                </label>
                <input
                    id="blue"
                    className="horizontal-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={blue*100}
                    onChange={handleColorChange}
                />
            </div>
        </div>
    );
}

export default ImageComponent;