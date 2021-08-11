import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';

const bs_onNotesImagesSizeInBytesResultEventHandler = emit => {
  const onNotesImagesSizeInBytesResultEventHandler = ({sizeInBytes}) => {
    emit(AppActions.backup.actions.getNotesImagesSizeFinished({sizeInBytes}));
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
    handlerId: 'bs_onNotesImagesSizeInBytesResultEventHandler',
    handler: onNotesImagesSizeInBytesResultEventHandler,
  });

  // Services.services().backupService.events.addOnGetNotesImagesSizeInBytesResultEventListener(
  //   {
  //     id: 'bs_onNotesImagesSizeInBytesResultEventHandler',
  //     handler: onNotesImagesSizeInBytesResultEventHandler,
  //   },
  // );

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
      handlerId: 'bs_onNotesImagesSizeInBytesResultEventHandler',
    });

    // Services.services().backupService.events.removeOnGetNotesImagesSizeInBytesResultEventListener(
    //   {
    //     id: 'bs_onNotesImagesSizeInBytesResultEventHandler',
    //   },
    // );
  };
};

export default bs_onNotesImagesSizeInBytesResultEventHandler;
