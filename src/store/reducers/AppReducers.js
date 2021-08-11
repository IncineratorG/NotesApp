import notesReducer from './notes/notesReducer';
import categoriesReducer from './categories/categoriesReducer';
import appSettingsReducer from './app-settings/appSettingsReducer';
import shareReducer from './share/shareReducer';
import backupReducer from './backup/backupReducer';
import vaultReducer from './vault/vaultReducer';

const AppReducers = () => {
  const notes = notesReducer;
  const categories = categoriesReducer;
  const appSettings = appSettingsReducer;
  const share = shareReducer;
  const backup = backupReducer;
  const vault = vaultReducer;

  return {
    notes,
    categories,
    appSettings,
    share,
    backup,
    vault,
  };
};

export default AppReducers();
