import React, { createContext, useContext, useState, useEffect } from 'react';
import RcsPhotoApi, { Album } from '../services/RcsPhotoApi';
import { ServiceConfigContext } from './ServiceConfigContext';

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

export const AlbumsContext = createContext<Album[] | null>(null);

export const AlbumsContextProvider = ({ children }) => {
  const serviceConfig = useContext(ServiceConfigContext);
  const rcsPhotoApi = new RcsPhotoApi(serviceConfig);
  const [albums, setAlbums] = useState<Album[]>(getLoadingAlbums(6));

  useEffect(() => {
    const fetchAndSet = async () => {
      const albums = await rcsPhotoApi.getAlbums();
      setAlbums(albums);
    }
    fetchAndSet();
  }, []);

  return <AlbumsContext.Provider value={albums}>
    {children}
  </AlbumsContext.Provider>;
}