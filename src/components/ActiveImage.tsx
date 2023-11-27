
import React, { useEffect, useState, useCallback } from 'react';
import { Image } from '../services/RcsPhotoApi';
import { faChevronLeft, faChevronRight, faTimes, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  startIndex: number;
  images: Image[];
  onClose: () => void;
}

type TouchEndClass = 'transition-to-previous' | 'transition-to-next';

const minSwipeAmount = 20;

function ActiveImage(props: Props) {
  const { startIndex, images, onClose } = props; 

  const [ currentIndex, setCurrentIndex ] = useState<number>(startIndex);
  const [ ready, setReady ] = useState<boolean>();
  const [ startTouchX, setStartTouchX ] = useState<number>();
  const [ lastTouchX, setLastTouchX ] = useState<number>();
  const [ touchEndClass, setTouchEndClass ] = useState<TouchEndClass>();
  const [ previousReady, setPreviousReady ] = useState<boolean>();
  const [ nextReady, setNextReady ] = useState<boolean>();

  const maxWindowDimension = Math.max(window.innerWidth, window.innerHeight);
  const imageSize = maxWindowDimension > 512 ? 'medium' : 'small';

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    }
  });

  const clearReadyStates = () => {
    setReady(false);
    setPreviousReady(false);
    setNextReady(false);
  }

  const hasNext = () => {
    return currentIndex < images.length - 1;
  }

  const hasPrevious = () => {
    return currentIndex > 0;
  }

  const goToNext = () => {
    if (hasNext()) {
      clearReadyStates();
      setCurrentIndex(currentIndex + 1);
    }
  }

  const goToPrevious = () => {
    if (hasPrevious()) {
      clearReadyStates();
      setCurrentIndex(currentIndex - 1);
    }
  }

  const transitionToPrevious = async () => {
    setTouchEndClass('transition-to-previous');
    await waitForTransitionAnimation();
    setTouchEndClass(undefined);
    goToPrevious();
  }

  const transitionToNext = async () => {
    setTouchEndClass('transition-to-next');
    await waitForTransitionAnimation();
    setTouchEndClass(undefined);
    goToNext();
  }

  const handleTouchStart = (touchEvent: React.TouchEvent<HTMLDivElement>) => {
    setStartTouchX(touchEvent.targetTouches[0].clientX);
  }

  const handleTouchMove = (touchMoveEvent: React.TouchEvent<HTMLDivElement>) => {
    setLastTouchX(touchMoveEvent.targetTouches[0].clientX);
  }

  const handleTouchEnd = async () => {
    const allowTouch = ready;
    if (allowTouch) {
      const diff = lastTouchX - startTouchX;
      const isSwipingToPrevious = diff > minSwipeAmount;
      const isSwipingToNext = diff < -minSwipeAmount;
      if (isSwipingToPrevious && hasPrevious() && previousReady) {
        await transitionToPrevious();
      } else if (isSwipingToNext && hasNext() && nextReady) {
        await transitionToNext();
      }
    }
  }

  const waitForTransitionAnimation = () => {
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  const handleKeyUp = ({ code }) => {
    if (code ===  'ArrowRight') {
      goToNext();
    } else if (code === 'ArrowLeft') {
      goToPrevious();
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [previousReady, nextReady]);

  return <div id="active-image">
    <a className="top-icon-container icon-left" href={images[currentIndex].full} target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={faDownload}/>
      <small>high-res</small>
    </a>

    <div className="top-icon-container icon-right" onClick={onClose}>
      <FontAwesomeIcon icon={faTimes}/>
      <small>close</small>
    </div>

    <div className={`images-container ${touchEndClass || ''}`}> 
      <div className="image-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        
        <div className={`nav-icon-container ${!hasPrevious() ? 'visibility-hidden' : ''}`} onClick={goToPrevious}>
          <FontAwesomeIcon className="nav-icon" icon={faChevronLeft}/>
        </div>

        <img className={ready ? 'image-ready' : 'image-not-ready'}
          src={images[currentIndex][imageSize]}
          onLoad={() => setReady(true)}
          alt=""/>

        <div className={`nav-icon-container ${!hasNext() ? 'visibility-hidden' : ''}`} onClick={goToNext}>
          <FontAwesomeIcon className="nav-icon" icon={faChevronRight}/>
        </div>
      </div>

      {
        hasPrevious() &&
        <div className="image-container previous">
          <img
            src={images[currentIndex - 1][imageSize]}
            onLoad={() => setPreviousReady(true)}
            alt=""/>
        </div>
      }

      {
        hasNext() && 
        <div className="image-container next">
          <img
            src={images[currentIndex + 1][imageSize]}
            onLoad={() => setNextReady(true)}
            alt=""/>
        </div>
      }
    </div>
  </div>;
}

export default ActiveImage;