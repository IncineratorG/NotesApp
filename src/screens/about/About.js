import React from 'react';
import AboutView from './views/AboutView';
import useAboutModel from './models/useAboutModel';
import useAboutController from './controllers/useAboutController';

const About = () => {
  const model = useAboutModel();
  const controller = useAboutController(model);

  return <AboutView model={model} controller={controller} />;
};

export default React.memo(About);
