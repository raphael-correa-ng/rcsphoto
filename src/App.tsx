import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import About from './components/About';
import AlbumPage from './components/AlbumPage';
import AlbumList from './components/AlbumList';
import RcsPhotoApi, { ServiceConfig } from './services/RcsPhotoApi';
import './App.scss';

interface Props {
  serviceConfig: ServiceConfig
}

function App(props: Props) {
  // todo: explore implementing this as a Provider pattern
  const rcsPhotoApi = new RcsPhotoApi(props.serviceConfig);
  return <div id="rcs-photo">
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<AlbumList service={rcsPhotoApi}/>}/>
        <Route path="/albums/:albumId" element={<AlbumPage service={rcsPhotoApi}/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  </div>;
}

export default App;