import { createContext } from 'react';
import { ServiceConfig } from '../services/RcsPhotoApi';

export const ServiceConfigContext = createContext<ServiceConfig | undefined>(undefined);