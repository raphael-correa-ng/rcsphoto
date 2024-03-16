import { createContext } from 'react';
import { ServiceConfig } from '../services/RcsPhotoApi';
import RcsPhotoApi from '../services/RcsPhotoApi';

export const ServiceContext = createContext<RcsPhotoApi | undefined>(undefined);

export const ServiceContextProvider = ({ children }) => {
  const serviceConfig: ServiceConfig = {
    imageBaseUrl: process.env.REACT_APP_IMAGE_BASE_URL,
    serviceBaseUrl: process.env.REACT_APP_SERVICE_BASE_URL
  };

  const service = new RcsPhotoApi(serviceConfig)

  return <ServiceContext.Provider value={service}>
    {children}
  </ServiceContext.Provider>;
}