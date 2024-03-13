import React, { useContext } from 'react';
import AlbumThumb from './AlbumThumb';
import PageHeader from './PageHeader';
import { AlbumsContext } from '../contexts/AlbumsContext';

function AlbumList() {
  document.title = 'Albums | RCS Photography';

  const albums = useContext(AlbumsContext);

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