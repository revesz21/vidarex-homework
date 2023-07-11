import { useState, useRef } from 'react';

const glassSize = 100;
const zoom = 2;
const offset = 50;

function Image() {
  const imgRef = useRef();
  const [magnifierGlassStyle, setMagnifierGlassStyle] = useState({});

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
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-4 text-2xl text-center text-gray-700">The Hague</h1>
      <div 
        className="w-768 h-432 relative shadow overflow-hidden"
        onMouseMove={moveMagnifier}
      >
        <img
          ref={imgRef}
          src="/the_hague.jpg"
          alt="The Hague"
        />
        <div style={magnifierGlassStyle} />
      </div>
    </div>
  );
}

export default Image;
