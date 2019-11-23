import React, { useEffect, useState, } from 'react';
import { ScrollyWrapper, useScrolly, withScrolly } from './react-scrolly';
import IntroSection from './components/intro-section';
import TextSection from './components/text-section';
import Svg from './components/svg';
import './App.scss';


const App = () => {
  const scrolly = useScrolly(scroll => scroll);
  
  scrolly.setWrapperHeight(document.documentElement.clientHeight);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <ScrollyWrapper
      scrolly={scrolly}
      style={{
        background: `white`
      }}
      useBodyAsWrapper={true}
      component='main'
    >
      <IntroSection scrolly={scrolly} />
      <TextSection scrolly={scrolly} />
      <Svg scrolly={scrolly} />
    </ScrollyWrapper>
  );
};

export default App;
