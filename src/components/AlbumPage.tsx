import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Album, Image } from '../services/RcsPhotoApi';
import ActiveImage from './ActiveImage';
import ImageThumb from './ImageThumb';
import ImageThumbLoading from './ImageThumbLoading';
import PageHeader from './PageHeader';
import { ServiceContext } from '../App';

function AlbumPage() {
  const { service } = useContext(ServiceContext);
  const { albumId } = useParams();

  const [ album, setAlbum ] = useState<Album>();
  const [ activeImageIndex, setActiveImageIndex ] = useState<number>();

  useEffect(() => {
    async function fetchAndSetAlbum() {
      const album = await service.getAlbum(albumId);
      document.title = `${album.name} | RCS Photography`;
      setAlbum(album);
    }
    fetchAndSetAlbum();
  }, [ albumId, service ]);

  const getMockImages = (): Image[] => {
    return Array.from(Array(12).keys()).map(i => ({
      thumb: undefined,
      small: undefined,
      medium: undefined,
      large: undefined,
      full: undefined
    }));
  }

  const subtitles = album
    ? [
        album.description,
        `Camera: ${album.camera}`,
        `${album.images.length} images`
    ]
    : [];

  return <div id="album-page">
    <div className="container">
      <PageHeader title={album?.name} subtitle={subtitles}/>
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