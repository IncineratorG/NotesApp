import NoteLocalActions from './NoteLocalActions';
import ReminderRepeatOption from '../../../data/common/reminder-repeat-options/ReminderRepeatOptions';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import NotesStatesHandler from '../../../utils/note/notes-states-handler/NotesStatesHandler';

const noteLocalReducer = (state, action) => {
  switch (action.type) {
    case NoteLocalActions.types.SET_INITIAL_NOTE_DATA: {
      const {
        id,
        title,
        isList,
        noteText,
        textSize,
        moveCheckedToBottom,
        reminder,
        images,
        deleted,
        vaultedDateTimestamp,
        deleteDateTimestamp,
        creationDateTimestamp,
        updateDateTimestamp,
        categoryId,
        orderPos,
      } = action.payload;

      NotesStatesHandler.get('noteLocalReducer').clear();

      return {
        ...state,
        note: {
          id,
          title,
          isList,
          noteText,
          textSize,
          moveCheckedToBottom,
          reminder,
          images,
          deleted,
          vaultedDateTimestamp,
          deleteDateTimestamp,
          creationDateTimestamp,
          updateDateTimestamp,
          orderPos,
          category: {
            ...state.note.category,
            id: categoryId,
          },
        },
      };
    }

    case NoteLocalActions.types.UPDATE_TITLE_TEXT: {
      NotesStatesHandler.get('noteLocalReducer').push({state: state.note});
      return {
        ...state,
        note: {
          ...state.note,
          title: action.payload.title,
          updateDateTimestamp: Date.now(),
        },
      };
    }

    case NoteLocalActions.types.CHANGE_NOTE_TYPE: {
      NotesStatesHandler.get('noteLocalReducer').push({state: state.note});
      return {
        ...state,
        note: {
          ...state.note,
          isList: action.payload.noteIsList,
          updateDateTimestamp: Date.now(),
        },
      };
    }

    case NoteLocalActions.types.CHANGE_NOTE_TEXT: {
      NotesStatesHandler.get('noteLocalReducer').push({state: state.note});
      return {
        ...state,
        note: {
          ...state.note,
          noteText: action.payload.noteText,
          updateDateTimestamp: Date.now(),
        },
      };
    }

    case NoteLocalActions.types.SET_SELECT_CATEGORY_DIALOG_VISIBILITY: {
      return {
        ...state,
        selectCategoryDialog: {
          ...state.selectCategoryDialog,
          visible: action.payload.visible,
        },
      };
    }

    case NoteLocalActions.types.SET_SELECTED_CATEGORY: {
      NotesStatesHandler.get('noteLocalReducer').push({state: state.note});
      return {
        ...state,
        note: {
          ...state.note,
          updateDateTimestamp: Date.now(),
          category: {
            ...state.note.category,
            id: action.payload.category.id,
            // color: action.payload.category.color,
            // name: action.payload.category.name,
            // translation_mark: action.payload.translation_mark,
          },
        },
      };
    }

    case NoteLocalActions.types.SET_REMINDER_DIALOG_VISIBILITY: {
      return {
        ...state,
        reminderDialog: {
          ...state.reminderDialog,
          visible: action.payload.visible,
        },
      };
    }

    case NoteLocalActions.types.SET_REMINDER_DATE: {
      NotesStatesHandler.get('noteLocalReducer').push({state: state.note});
      return {
        ...state,
        note: {
          ...state.note,
          updateDateTimestamp: Date.now(),
          reminder: {
            ...state.note.reminder,
            selectedDateInMilliseconds: action.payload.dateInMilliseconds,
            repeatOption: action.payload.repeatOption,
          },
        },
      };
    }

    case NoteLocalActions.types.CLEAR_REMINDER_DATE: {
      NotesStatesHandler.get('noteLocalReducer').push({state: state.note});
      return {
        ...state,
        note: {
          ...state.note,
          updateDateTimestamp: Date.now(),
          reminder: {
            ...state.note.reminder,
            selectedDateInMilliseconds: -1,
            repeatOption: ReminderRepeatOption.NO_REPEAT,
          },
        },
      };
    }

    case NoteLocalActions.types.SET_SELECT_TEXT_SIZE_DIALOG_VISIBILITY: {
      return {
        ...state,
        selectTextSizeDialog: {
          ...state.selectTextSizeDialog,
          visible: action.payload.visible,
        },
      };
    }

    case NoteLocalActions.types.SET_SELECTED_TEXT_SIZE: {
      NotesStatesHandler.get('noteLocalReducer').push({state: state.note});
      return {
        ...state,
        note: {
          ...state.note,
          updateDateTimestamp: Date.now(),
          textSize: action.payload.textSizeType,
        },
      };
    }

    case NoteLocalActions.types.CHANGE_MOVE_CHECKED_TO_BOTTOM: {
      return {
        ...state,
        note: {
          ...state.note,
          updateDateTimestamp: Date.now(),
          moveCheckedToBottom: action.payload.moveCheckedToBottom,
        },
      };
    }

    case NoteLocalActions.types.SET_SEND_NOTE_DIALOG_VISIBILITY: {
      return {
        ...state,
        sendNoteDialog: {
          ...state.sendNoteDialog,
          visible: action.payload.visible,
        },
      };
    }

    case NoteLocalActions.types.ADD_IMAGE: {
      const {id} = action.payload;

      const noteImages = [...state.note.images];
      noteImages.push(id);

      return {
        ...state,
        note: {
          ...state.note,
          updateDateTimestamp: Date.now(),
          images: noteImages,
        },
      };
    }

    case NoteLocalActions.types.REMOVE_IMAGE: {
      const {id} = action.payload;

      const noteImages = state.note.images.filter(imageId => imageId !== id);

      return {
        ...state,
        note: {
          ...state.note,
          updateDateTimestamp: Date.now(),
          images: noteImages,
        },
      };
    }

    case NoteLocalActions.types.UNDO_CHANGES: {
      const {lastState: lastNoteState} = NotesStatesHandler.get(
        'noteLocalReducer',
      ).getLast();
      if (lastNoteState === null) {
        SystemEventsHandler.onInfo({
          info: 'noteLocalReducer->PREVIOUS_STATE_IS_NULL',
        });
        return state;
      }

      return {
        ...state,
        note: {
          id: lastNoteState.id,
          title: lastNoteState.title,
          isList: lastNoteState.isList,
          noteText: lastNoteState.noteText,
          textSize: lastNoteState.textSize,
          moveCheckedToBottom: lastNoteState.moveCheckedToBottom,
          reminder: {...lastNoteState.reminder},
          images: lastNoteState.images,
          deleted: lastNoteState.deleted,
          vaultedDateTimestamp: lastNoteState.vaultedDateTimestamp,
          deleteDateTimestamp: lastNoteState.deleteDateTimestamp,
          creationDateTimestamp: lastNoteState.creationDateTimestamp,
          updateDateTimestamp: lastNoteState.updateDateTimestamp,
          orderPos: lastNoteState.orderPos,
          category: {...lastNoteState.category},
        },
      };
    }

    case NoteLocalActions.types.SET_SELECT_IMAGE_SOURCE_DIALOG_VISIBILITY: {
      return {
        ...state,
        selectImageSourceDialog: {
          ...state.selectImageSourceDialog,
          visible: action.payload.visible,
        },
      };
    }

    case NoteLocalActions.types.SET_PHOTO_CAMERA_ACTIVE: {
      return {
        ...state,
        photoCamera: {
          ...state.photoCamera,
          active: action.payload.active,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default noteLocalReducer;
