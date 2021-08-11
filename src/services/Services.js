import {SystemEventsHandler} from '../utils/common/system-events-handler/SystemEventsHandler';
import NotesService from './notes/NotesService';
import ShareService from './share/ShareService';
import BackupService from './backup/BackupService';

const Services = () => {
  let servicesInitialized = false;
  const notesService = NotesService();
  const shareService = ShareService();
  const backupService = BackupService();

  const init = async () => {
    await notesService.init();
    await shareService.init();
    await backupService.init();
    servicesInitialized = true;
  };

  const dispose = () => {
    notesService.dispose();
    backupService.dispose();
    servicesInitialized = false;
  };

  const services = () => {
    if (!servicesInitialized) {
      SystemEventsHandler.onError({
        err: 'Services->services(): SERVICES_NOT_INITIALIZED',
      });
    }

    return {
      notesService,
      shareService,
      backupService,
    };
  };

  return {
    init,
    dispose,
    services,
  };
};

export default Services();
