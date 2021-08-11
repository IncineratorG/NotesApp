import NoteTextSize from '../../../data/common/note-text-size/NoteTextSize';
import ReminderRepeatOption from '../../../data/common/reminder-repeat-options/ReminderRepeatOptions';

const vaultedNoteLocalState = {
  note: {
    id: -1,
    title: '',
    isList: false,
    noteText: '',
    textSize: NoteTextSize.NORMAL,
    moveCheckedToBottom: false,
    category: {
      id: -1,
    },
    reminder: {
      id: -1,
      selectedDateInMilliseconds: -1,
      repeatOption: ReminderRepeatOption.NO_REPEAT,
    },
    images: [],
    deleted: false,
    vaultedDateTimestamp: -1,
    deleteDateTimestamp: -1,
    creationDateTimestamp: -1,
    updateDateTimestamp: -1,
    orderPos: -1,
  },
  selectCategoryDialog: {
    visible: false,
  },
  reminderDialog: {
    visible: false,
  },
  selectTextSizeDialog: {
    visible: false,
  },
  sendNoteDialog: {
    visible: false,
  },
  selectImageSourceDialog: {
    visible: false,
  },
  photoCamera: {
    active: false,
  },
  removeNoteConfirmationDialog: {
    visible: false,
    noteId: -1,
  },
};

export default vaultedNoteLocalState;
