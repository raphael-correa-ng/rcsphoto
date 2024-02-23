import React, { useEffect, useContext } from 'react';
import AlbumThumb from './AlbumThumb';
import PageHeader from './PageHeader';
import { AlbumsContext } from '../contexts/AlbumsContext';

function AlbumList() {
  const albums = useContext(AlbumsContext);

  useEffect(() => {
    document.title = 'Albums | RCS Photography';
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