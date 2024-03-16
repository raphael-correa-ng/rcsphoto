
import { useEffect, useState, useRef } from 'react';

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function ImageThumb() {
  const [placeholderHeight, setPlaceholderHeight] = useState<number>();

  const placeholderRef = useRef(null);

  useEffect(() => {
    const width = placeholderRef.current.offsetWidth;
    if (width) {
      const landscape = 2 * width / 3;
      const portrait = 4 * width / 3
      const height = [landscape, landscape, portrait][randomInt(0, 2)];
      setPlaceholderHeight(height);
    }
  }, []);

  return <div className="image-thumb-container animate-scale item-responsive-width">
    <div className="image-placeholder" ref={placeholderRef} style={{ height: placeholderHeight }}/>
  </div>
}

export default ImageThumb;