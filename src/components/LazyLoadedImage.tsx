import { useEffect, useState, useRef } from 'react';
import { Image } from '../services/RcsPhotoApi';

interface Props {
  className: string;
  src: string;
  onClick: () => void;
  onLoad: () => void;
  threshold?: number;
  width?: number;
  height?: number;
}

function LazyLoadedImage(props: Props) {
  const { className, src, onClick, onLoad, threshold, width, height } = props;

  const [isInViewPort, setIsInViewPort] = useState<boolean>();
  const [ready, setReady] = useState<boolean>();

  const imgRef = useRef(null);

  const checkViewport = (threshold = 100) => {
    if (!imgRef?.current) return false;
    const top = imgRef.current.getBoundingClientRect().top;
    return top >= 0 && top <= window.innerHeight + threshold;
  }

  const handleScroll = () => {
    if (checkViewport()) {
      setIsInViewPort(true);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return <div style={{
      width: isInViewPort ? 'auto' : width,
      height: isInViewPort ? 'auto' : height
    }}>
    <img
      className={className}
      ref={imgRef}
      onClick={onClick}
      src={isInViewPort && src}
      onLoad={onLoad}
      alt=""/>
  </div>
}

export default LazyLoadedImage;