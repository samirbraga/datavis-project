import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { ScrollyWrapper, useScrolly, withScrolly } from './react-scrolly';
import dataInfo from './data/datasets-info.json';
import IntroSection from './components/intro-section';
import TextSection from './components/text-section';
import TitleSection from './components/title-section';
import Collection1Section from './components/collection-1-section';
import Collection2Section from './components/collection-2-section';
import Treatment1Section from './components/treatment-1-section';
import Treatment2Section from './components/treatment-2-section';
import Treatment3Section from './components/treatment-3-section';
import Treatment4Section from './components/treatment-4-section';
import Treatment5Section from './components/treatment-5-section';
import Vis1Section from './components/vis-1-section';
import Vis2Section from './components/vis-2-section';
import Vis3Section from './components/vis-3-section';
import MapSection from './components/map-section';
import SizePG from './components/size-pg';
import './App.scss';


let initialSize = 0;

for (let i = 1999; i <= 2019; i++) {
  initialSize += dataInfo[i.toString()].size_i_kb;
}

initialSize /= 1024;

const worker = new Worker(process.env.PUBLIC_URL + '/load-data-worker.js');

const TreatmentSections = withScrolly(props => {
  const { scrolly } = props;
  const [currentSize, setCurrentSize] = useState(initialSize);
  const [reached, setReached] = useState(false);

  useEffect(() => {
    props.onEnterMe(() => {
      setReached(true);
    });
    props.onLeaveMe(() => {
      setReached(false);
    });
  }, []);

  return (
    <>
    <div ref={props.innerRef}>
      <TextSection
        scrolly={scrolly}
        text={`Ao exportar cada um dos dataset percebemos que seus tamanhos somavam ${initialSize.toFixed(1)} Gb. O que é inviável para carregamento em memória no dispositivo do usuário. Logo, houve a necessidade de reduzir o tamanho dos dados.`}
      />
      <Treatment1Section setCurrentSize={setCurrentSize} scrolly={scrolly} />
      <Treatment2Section setCurrentSize={setCurrentSize} scrolly={scrolly} />
      <Treatment4Section setCurrentSize={setCurrentSize} scrolly={scrolly} />
      <Treatment3Section setCurrentSize={setCurrentSize} scrolly={scrolly} />
      <Animated
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={reached}
        className="faster"
        style={{
          position: 'relative',
          zIndex: 10
        }}
      >
        <SizePG value={currentSize} max={initialSize} />
      </Animated>
    </div>
    <Treatment5Section scrolly={scrolly} />
    </>
  );
});

const App = () => {
  const scrolly = useScrolly(scroll => scroll);
  
  scrolly.setWrapperHeight(document.documentElement.clientHeight);

  useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.scrollTop + 1;
  }, []);

  return (
    <ScrollyWrapper
      scrolly={scrolly}
      useBodyAsWrapper={true}
      component='main'
      className="app-wrapper fire-bg"
    >
      <div className="app-bg" />
      <IntroSection scrolly={scrolly} />
      <TextSection
        scrolly={scrolly}
        up={true}
        text='A análise de dados consiste em compreender o significado dos dados coletados. Para sua visualização são necessárias algumas etapas: Coleta de dados, Tratamento, Análise, Contextualização, e a Visualização. Mostraremos este processo aplicado ao tema de Queimadas no Brasil.'
      />
      <TitleSection progress={15} title='COLETA DOS DADOS' scrolly={scrolly} />
      <Collection1Section scrolly={scrolly} />
      <Collection2Section scrolly={scrolly} />
      <TitleSection progress={75} title='TRATAMENTO DOS DADOS' scrolly={scrolly} />
      <TreatmentSections scrolly={scrolly} />
      <TitleSection progress={99} title='ANÁLISES E VISUALIZAÇÕES' scrolly={scrolly} />
      <Vis1Section scrolly={scrolly} worker={worker} />
      <Vis2Section scrolly={scrolly} worker={worker} />
      <Vis3Section scrolly={scrolly} worker={worker} />
      <TextSection
        scrolly={scrolly}
        text='Para um diagnóstico de quais variáveis climáticas são determinantes e quais regiões são mais vulneráveis às queimadas, é fundamental a análise do ciclo sazonal de temperatura, precipitação e umidade relativa. Outro fato importante, é que as queimadas por serem de origem antrópica estão diretamente ligadas às atividades agro-florestais. Pode-se demonstrar que as principais áreas de risco de queimadas concentram-se na região centro-oeste e norte do Brasil.'
      />
      <MapSection year={1999} worker={worker} />
    </ScrollyWrapper>
  );
};

export default App;
