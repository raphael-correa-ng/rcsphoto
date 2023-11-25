import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ServiceConfig } from './services/RcsPhotoApi';
import 'bootstrap/dist/css/bootstrap.min.css';

const {
  REACT_APP_IMAGE_BASE_URL: imageBaseUrl,
  REACT_APP_CLOUDANT_HOST: host,
  REACT_APP_CLOUDANT_PORT: port,
  REACT_APP_CLOUDANT_USERNAME: username,
  REACT_APP_CLOUDANT_PASSWORD: password,
} = process.env;

const serviceConfig: ServiceConfig = {
  imageBaseUrl,
  cloudantCredentials: {
    host,
    port: parseInt(port, 10),
    username,
    password
  }
};

ReactDOM.render(
  <React.StrictMode>
    <App serviceConfig={serviceConfig}/>
  </React.StrictMode>,
  document.getElementById('root')
);