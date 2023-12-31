import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ServiceConfig } from './services/RcsPhotoApi';
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
    <App serviceConfig={serviceConfig}/>
  </React.StrictMode>,
  document.getElementById('root')
);