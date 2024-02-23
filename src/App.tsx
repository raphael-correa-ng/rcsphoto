import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import About from './components/About';
import AlbumPage from './components/AlbumPage';
import AlbumList from './components/AlbumList';
import RcsPhotoApi, { ServiceConfig } from './services/RcsPhotoApi';
import './App.scss';

export const ServiceContext = React.createContext(undefined);

interface Props {
  serviceConfig: ServiceConfig
}

function App(props: Props) {
  // todo: explore implementing this as a Provider pattern
  const rcsPhotoApi = new RcsPhotoApi(props.serviceConfig);

  return <div id="rcs-photo">
    <ServiceContext.Provider value={{ service: rcsPhotoApi }}>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<AlbumList/>}/>
          <Route path="/albums/:albumId" element={<AlbumPage/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </ServiceContext.Provider>
  </div>;
}

export default App;