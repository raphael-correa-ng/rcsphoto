import React, { useState, useEffect, useContext } from 'react';
import { Album } from '../services/RcsPhotoApi'
import AlbumThumb from './AlbumThumb';
import PageHeader from './PageHeader';
import { ServiceContext } from '../App';

const getLoadingAlbums = (count: number): Album[] => {
  return Array.from(Array(count).keys())
    .map(i => ({
      id: undefined,
      sortOrder: undefined,
      name: undefined,
      description: undefined,
      camera: undefined,
      images: undefined,
      coverImage: undefined
    }));
}

function AlbumList() {
  const { service } = useContext(ServiceContext);
  const [ albums, setAlbums ] = useState<Album[]>(getLoadingAlbums(6));

  useEffect(() => {
    document.title = 'Albums | RCS Photography';
    const fetchAndSet = async () => {
      const albums = await service.getAlbums();
      setAlbums(albums);
    }
    fetchAndSet();
  }, []);

  return <div id="album-list">
    <div className="container">
      <div className="album-thumbs-container">
        <PageHeader title="Albums" subtitle={"by Raphael Corrêa"}/>
        {
          albums.map((album, index) =>
            <AlbumThumb album={album} key={index}/>
          )
        }
      </div>
    </div>
  </div>;
}

export default AlbumList;