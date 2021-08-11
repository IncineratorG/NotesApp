import NoteTextSize from '../../../../../data/common/note-text-size/NoteTextSize';
import NoteImageQuality from '../../../../../data/common/note-image-quality/NoteImageQuality';

const InitialAppSettings = {
  notes: {
    noteTextDefaultSize: NoteTextSize.NORMAL,
    moveCheckedToBottom: false,
    noteImageQuality: NoteImageQuality.AVERAGE,
  },
  other: {
    trash: {
      automaticCleaning: true,
    },
  },
};

export default InitialAppSettings;
