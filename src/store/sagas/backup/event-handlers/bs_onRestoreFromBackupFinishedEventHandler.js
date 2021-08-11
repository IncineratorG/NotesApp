import {ToastAndroid} from 'react-native';
import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import NoteToReminderMessage from '../../../../utils/note/note-to-reminder-message/NoteToReminderMessage';
import useTranslation from '../../../../utils/common/localization';

const bs_onRestoreFromBackupFinishedEventHandler = emit => {
  const onRestoreFromBackupFinishedEventHandler = async () => {
    const currentDate = Date.now();

    const notesService = Services.services().notesService;
    const {notes} = await notesService.getNotesList();

    // Устанавливаем напоминания для соответствующих заметок.
    await Promise.all(
      notes.map(async note => {
        const {
          reminder: {id, selectedDateInMilliseconds, repeatOption},
        } = note;

        if (selectedDateInMilliseconds > currentDate) {
          await notesService.setNoteReminder({
            noteId: note.id,
            title: note.title,
            message: NoteToReminderMessage.convert({note}),
            dateInMilliseconds: selectedDateInMilliseconds,
          });
        }
      }),
    );

    emit(AppActions.backup.actions.restoreFromBackupFinished());
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.RESTORE_FROM_BACKUP_FINISHED,
    handlerId: 'bs_onRestoreFromBackupFinishedEventHandler',
    handler: onRestoreFromBackupFinishedEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.RESTORE_FROM_BACKUP_FINISHED,
      handlerId: 'bs_onRestoreFromBackupFinishedEventHandler',
    });
  };
};

export default bs_onRestoreFromBackupFinishedEventHandler;
