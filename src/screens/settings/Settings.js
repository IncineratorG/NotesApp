import React from 'react';
import SettingsView from './views/SettingsView';
import useSettingsModel from './models/useSettingsModel';
import useSettingsController from './controllers/useSettingsController';

const Settings = () => {
  const model = useSettingsModel();
  const controller = useSettingsController(model);

  return <SettingsView model={model} controller={controller} />;
};

export default React.memo(Settings);
