import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ServiceConfig } from './services/RcsPhotoApi';
import 'bootstrap/dist/css/bootstrap.min.css';

const {
  REACT_APP_IMAGE_BASE_URL,
  REACT_APP_DB_CREDENTIALS,
  REACT_APP_DB_USERNAME,
  REACT_APP_DB_PASSWORD,
} = process.env;

const credentials = {
  ...JSON.parse(REACT_APP_DB_CREDENTIALS),
  username: REACT_APP_DB_USERNAME,
  password: REACT_APP_DB_PASSWORD
};

const serviceConfig: ServiceConfig = {
  imageBaseUrl: REACT_APP_IMAGE_BASE_URL,
  credentials
};

ReactDOM.render(
  <React.StrictMode>
    <App serviceConfig={serviceConfig}/>
  </React.StrictMode>,
  document.getElementById('root')
);