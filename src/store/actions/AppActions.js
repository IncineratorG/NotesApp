import NotesActions from './notes/NotesActions';
import CategoriesActions from './categories/CategoriesActions';
import AppSettingsActions from './app-settings/AppSettingsActions';
import ShareActions from './share/ShareActions';
import BackupActions from './backup/BackupActions';
import VaultActions from './vault/VaultActions';
import GlobalActions from './global/GlobalActions';

const AppActions = () => {
  const global = GlobalActions();
  const notes = NotesActions();
  const categories = CategoriesActions();
  const appSettings = AppSettingsActions();
  const share = ShareActions();
  const backup = BackupActions();
  const vault = VaultActions();

  return {
    global,
    notes,
    categories,
    appSettings,
    share,
    backup,
    vault,
  };
};

export default AppActions();
