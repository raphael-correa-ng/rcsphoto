import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from '../services/RcsPhotoApi';
import ActiveImage from './ActiveImage';
import ImageThumb from './ImageThumb';
import ImageThumbLoading from './ImageThumbLoading';
import PageHeader from './PageHeader';
import { AlbumsContext } from '../contexts/AlbumsContext';

const getMockImages = (): Image[] => {
  return Array.from(Array(12).keys()).map(i => ({
    thumb: undefined,
    small: undefined,
    medium: undefined,
    large: undefined,
    full: undefined
  }));
}

function AlbumPage() {
  const { albumId } = useParams();
  const album = useContext(AlbumsContext).find(album => album.id === albumId);

  if (album) {
    document.title = `${album.name} | RCS Photography`;
  }

  const [ activeImageIndex, setActiveImageIndex ] = useState<number>();

  const subtitles = album
    ? [
        album.description,
        `Camera: ${album.camera}`,
        `${album.images.length} images`
    ]
    : undefined;

  return <div id="album-page">
    <div className="container">
      <PageHeader title={album?.name} subtitle={subtitles} withLoadingPlaceholders={true}/>
      {
        activeImageIndex !== undefined &&
        <ActiveImage 
          startIndex={activeImageIndex} 
          images={album.images}
          onClose={() => setActiveImageIndex(undefined)}/>
      }
      <div className="thumbs-container">
        {
          album?.images && album.images.map((image, i) =>
            <ImageThumb key={i} image={image} onClick={() => setActiveImageIndex(i)}/>
          )
        }
        {
          !album?.images && getMockImages().map((image, i) =>
            <ImageThumbLoading key={i}/>
          )
        }
      </div>
    </div>
  </div>;
}

export default AlbumPage;