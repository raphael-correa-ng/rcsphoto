import { useState } from 'react';
import { Image } from '../services/RcsPhotoApi';
import LazyLoadedImage from './LazyLoadedImage';

interface Props {
  image?: Image;
  onClick: () => void;
}

function ImageThumb(props: Props) {
  const { image, onClick } = props;

  const [ready, setReady] = useState<boolean>();

  // default height for not-yet-loaded images
  const width = document.getElementsByClassName("image-thumb-container")[0]?.clientWidth;
  const landscapeHeight = 2 * width / 3;

  return <div className="image-thumb-container animate-scale item-responsive-width">
    <LazyLoadedImage
      threshold={100}
      width={width}
      height={landscapeHeight}
      className={ready ? 'image-ready' : 'image-not-ready'}
      src={image.thumb}
      onClick={onClick}
      onLoad={() => setReady(true)}/>
  </div>
}

export default ImageThumb;