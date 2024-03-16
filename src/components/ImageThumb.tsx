import { useState, useRef, useEffect } from 'react';
import { Image } from '../services/RcsPhotoApi';
import LazyLoadedImage from './LazyLoadedImage';

interface Props {
  image?: Image;
  onClick: () => void;
}

function ImageThumb(props: Props) {
  const { image, onClick } = props;

  const [ready, setReady] = useState<boolean>();
  const [defaultWidth, setDefaultWidth] = useState<number>();
  const [defaultHeight, setDefaultHeight] = useState<number>();

  const imgRef = useRef(null);

  useEffect(() => {
    const width = imgRef.current.offsetWidth;
    if (width) {
      const portraitHeight = 4 * width / 3;
      setDefaultWidth(width)
      setDefaultHeight(portraitHeight);
    }
  }, []);

  return <div ref={imgRef} className="image-thumb-container animate-scale item-responsive-width">
    {
      defaultWidth && defaultHeight &&
      <LazyLoadedImage
        threshold={350}
        width={defaultWidth}
        height={defaultHeight}
        className={ready ? 'image-ready' : 'image-not-ready'}
        src={image.thumb}
        onClick={onClick}
        onLoad={() => setReady(true)}/>
    }
  </div>
}

export default ImageThumb;