import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import About from './components/About';
import AlbumPage from './components/AlbumPage';
import AlbumList from './components/AlbumList';
import { AlbumsContextProvider } from './contexts/AlbumsContext';
import './App.scss';

function App() {
  return <div id="rcs-photo">
    <AlbumsContextProvider>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<AlbumList/>}/>
          <Route path="/albums/:albumId" element={<AlbumPage/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </AlbumsContextProvider>
  </div>;
}

export default App;