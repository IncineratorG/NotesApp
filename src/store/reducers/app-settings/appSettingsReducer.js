import NoteTextSize from '../../../data/common/note-text-size/NoteTextSize';
import AppActions from '../../actions/AppActions';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import NoteImageQuality from '../../../data/common/note-image-quality/NoteImageQuality';

const initialAppSettingsState = {
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

const appSettingsReducer = (state = initialAppSettingsState, action) => {
  switch (action.type) {
    case AppActions.appSettings.types.LOAD_APP_SETTINGS_BEGIN: {
      return state;
    }

    case AppActions.appSettings.types.LOAD_APP_SETTINGS_FINISHED: {
      const {appSettings} = action.payload;

      if (!appSettings) {
        return state;
      }

      const {notes, other} = appSettings;

      return {
        ...state,
        notes: {
          noteTextDefaultSize:
            notes && notes.noteTextDefaultSize
              ? notes.noteTextDefaultSize
              : NoteTextSize.NORMAL,
          moveCheckedToBottom:
            notes && notes.moveCheckedToBottom
              ? notes.moveCheckedToBottom
              : false,
          noteImageQuality:
            notes && notes.noteImageQuality
              ? notes.noteImageQuality
              : NoteImageQuality.AVERAGE,
        },
        other,
      };
    }

    case AppActions.appSettings.types.LOAD_APP_SETTINGS_ERROR: {
      SystemEventsHandler.onInfo({
        info: 'appSettingsReducer->LOAD_APP_SETTINGS_ERROR',
      });

      return state;
    }

    case AppActions.appSettings.types.SET_AUTO_TRASH_CLEARING: {
      return {
        ...state,
        other: {
          ...state.other,
          trash: {
            ...state.other.trash,
            automaticCleaning: action.payload.clear,
          },
        },
      };
    }

    case AppActions.appSettings.types.SET_DEFAULT_NOTE_TEXT_SIZE: {
      return {
        ...state,
        notes: {
          ...state.notes,
          noteTextDefaultSize: action.payload.noteTextSize,
        },
      };
    }

    case AppActions.appSettings.types.SET_MOVE_CHECKED_LIST_ITEMS_TO_BOTTOM: {
      return {
        ...state,
        notes: {
          ...state.notes,
          moveCheckedToBottom: action.payload.moveCheckedToBottom,
        },
      };
    }

    case AppActions.appSettings.types.SET_NOTE_IMAGE_QUALITY: {
      return {
        ...state,
        notes: {
          ...state.notes,
          noteImageQuality: action.payload.imageQuality,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default appSettingsReducer;
