import { useState, useEffect, useRef } from 'react';
import ZoomIcon from '../assets/ZoomIcon';
import SatIcon from '../assets/SatIcon';

const glassSize = 100;
const offset = 50;

function Image() {
  const imgRef = useRef();
  const divRef = useRef();
  const [zoom, setZoom] = useState(2);
  const [saturation, setSaturation] = useState(100);
  const [magnifierGlassStyle, setMagnifierGlassStyle] = useState({});

  useEffect(() => {
    divRef.current.focus();
  }, []);

  const moveMagnifier = (e) => {
    const { left: imgLeft, top: imgTop, width: imgWidth, height: imgHeight } = imgRef.current.getBoundingClientRect();
    const cursorX = e.pageX - imgLeft;
    const cursorY = e.pageY - imgTop;

    const offsetX = (cursorX + offset + glassSize > imgWidth) ? -offset : offset;
    const offsetY = (cursorY + offset + glassSize > imgHeight) ? -offset : offset;

    const bgPosX = Math.min(0, Math.max(-((cursorX * zoom) - glassSize / 2), -(imgWidth * zoom - glassSize)));
    const bgPosY = Math.min(0, Math.max(-((cursorY * zoom) - glassSize / 2), -(imgHeight * zoom - glassSize)));

    const glassX = cursorX - glassSize / 2 + offsetX;
    const glassY = cursorY - glassSize / 2 + offsetY;

    setMagnifierGlassStyle({
      backgroundImage: `url(${imgRef.current.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${imgWidth * zoom}px ${imgHeight * zoom}px`,
      borderRadius: '50%',
      border: '1px solid white',
      width: `${glassSize}px`,
      height: `${glassSize}px`,
      position: 'absolute',
      left: `${glassX}px`,
      top: `${glassY}px`,
      cursor: 'none',
      backgroundPosition: `${bgPosX}px ${bgPosY}px`,
      filter: `saturate(${saturation}%)`,
    });
  };

  const handleZoomChange = (e) => {
    setZoom(e.target.value);
  };

  const handleSaturationChange = (e) => {
    setSaturation(e.target.value);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newZoom = Math.min(10, Math.max(1, zoom + e.deltaY * -0.1));
    setZoom(newZoom);
  };

  const handleKeyDown = (e) => {
    if (e.code === 'ArrowRight') {
      setSaturation(Math.min(100, saturation + 1));
    } else if (e.code === 'ArrowLeft') {
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
          {/* <h1 className="mb-4 text-2xl text-center text-gray-700">The Hague</h1> */}
          <div className="flex justify-center items-center">
              <div
                  className="w-768 h-432 relative shadow overflow-hidden mr-4"
                  onMouseMove={moveMagnifier}
              >
                  <img ref={imgRef} src="/the_hague.jpg" alt="The Hague" />
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
            <SatIcon/>
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

export default Image;
