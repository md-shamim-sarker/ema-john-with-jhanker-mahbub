import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {useEffect} from 'react';

import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className='App'>
      <Header></Header>
      <Shop></Shop>
      <Footer></Footer>
    </div>
  );
};

export default App;