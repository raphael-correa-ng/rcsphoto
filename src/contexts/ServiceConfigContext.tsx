import { createContext } from 'react';
import { ServiceConfig } from '../services/RcsPhotoApi';

export const ServiceConfigContext = createContext<ServiceConfig | undefined>(undefined);

export const ServiceConfigContextProvider = ({ children }) => {
  const serviceConfig: ServiceConfig = {
    imageBaseUrl: process.env.REACT_APP_IMAGE_BASE_URL,
    serviceBaseUrl: process.env.REACT_APP_SERVICE_BASE_URL
  };

  return <ServiceConfigContext.Provider value={serviceConfig}>
    {children}
  </ServiceConfigContext.Provider>;
}