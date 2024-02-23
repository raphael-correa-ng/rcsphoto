import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ServiceConfig } from './services/RcsPhotoApi';
import { ServiceConfigContext } from './contexts/ServiceConfigContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const {
  REACT_APP_IMAGE_BASE_URL: imageBaseUrl,
  REACT_APP_SERVICE_BASE_URL: serviceBaseUrl
} = process.env;

const serviceConfig: ServiceConfig = {
  imageBaseUrl,
  serviceBaseUrl
};

ReactDOM.render(
  <React.StrictMode>
    <ServiceConfigContext.Provider value={serviceConfig}>
      <App/>
    </ServiceConfigContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);