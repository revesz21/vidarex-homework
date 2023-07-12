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

  useEffect(() => {
    var imageObj = new Image();
    imageObj.onload = function(){
      
        drawImage(this);
      };
      imageObj.src = image;
}, [image]);

  function drawImage(imageObj){
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const hRatio = canvas.width / imageObj.width    ;
    const vRatio = canvas.height / imageObj.height  ;
    const ratio  = Math.min ( hRatio, vRatio );
    context.drawImage(imageObj, 0,0, imageObj.width, imageObj.height, 0,0,imageObj.width*ratio, imageObj.height*ratio);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];
    }

    context.putImageData(imageData, 0, 0);
}

    const imgRef = useRef();
    const divRef = useRef();
    const [zoom, setZoom] = useState(2);
    const [saturation, setSaturation] = useState(100);
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [magnifierGlassStyle, setMagnifierGlassStyle] = useState({});

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
            filter: `saturate(${saturation}%)`,
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

    const handleSaturationChange = (e) => {
        setSaturation(e.target.value);
    };

    const handleWheel = (e) => {
        const newZoom = Math.min(10, Math.max(1, zoom + e.deltaY * -0.1));
        setZoom(newZoom);
    };

    const handleKeyDown = (e) => {
        if (e.code === "ArrowRight") {
            setSaturation(Math.min(100, saturation + 1));
        } else if (e.code === "ArrowLeft") {
            setSaturation(Math.max(0, saturation - 1));
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
                <label htmlFor="saturation" className="m-2">
                    Saturation: {saturation}%
                </label>
                <input
                    id="saturation"
                    className="horizontal-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={saturation}
                    onChange={handleSaturationChange}
                />
            </div>
        </div>
    );
}

export default ImageComponent;