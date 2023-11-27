
import { useEffect, useState } from 'react';
import { Image } from '../services/RcsPhotoApi';

interface Props {
  image?: Image;
  onClick: () => void;
}

function ImageThumb(props: Props) {
  const { image, onClick } = props; 
  
  const [ready, setReady] = useState<boolean>();

  return <div className="image-thumb-container animate-scale item-responsive-width">
    <img
      className={ready ? 'image-ready' : 'image-not-ready'}
      src={image.thumb}
      onClick={onClick}
      onLoad={() => setReady(true)}
      alt=""/>
  </div>
}

export default ImageThumb;