import React, { createContext, useContext, useState, useEffect } from 'react';
import { Album } from '../services/RcsPhotoApi';
import { ServiceContext } from './ServiceContext';

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

export const AlbumsContext = createContext<Album[] | undefined>(undefined);

export const AlbumsContextProvider = ({ children }) => {
  const service = useContext(ServiceContext);
  const [albums, setAlbums] = useState<Album[]>(getLoadingAlbums(6));

  useEffect(() => {
    const fetchAndSet = async () => {
      const albums = await service.getAlbums();
      setAlbums(albums);
    }
    fetchAndSet();
  }, []);

  return <AlbumsContext.Provider value={albums}>
    {children}
  </AlbumsContext.Provider>;
}