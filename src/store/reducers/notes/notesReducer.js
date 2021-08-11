import AppActions from '../../actions/AppActions';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import NotesListSortTypes from '../../../data/common/notes-list-sort-types/NotesListSortTypes';
import ReminderRepeatOption from '../../../data/common/reminder-repeat-options/ReminderRepeatOptions';
import NoteTextSize from '../../../data/common/note-text-size/NoteTextSize';
import NotesListComposer from './helpers/notes-list-composer/NotesListComposer';

const initialNotesState = {
  noteTemplate: {
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
  notesList: {
    loaded: false,
    settings: {
      sortType: NotesListSortTypes.MANUAL,
      groupByCategories: false,
      useCompactView: false,
      selectedCategoryId: -1,
    },
    vaultedNotesIdsSet: new Set(),
    allNotes: [],
    notes: [],
    deleted: [],
    vaulted: [],
  },
  requestedToOpenNoteId: -1,
  searchText: '',
};

const notesReducer = (state = initialNotesState, action) => {
  switch (action.type) {
    case AppActions.notes.types.LOAD_NOTES_LIST_BEGIN: {
      return state;
    }

    case AppActions.notes.types.LOAD_NOTES_LIST_FINISHED: {
      const {settings, notesList} = action.payload;

      const sortType = settings.sortType;
      const groupByCategories = settings.groupByCategories;
      const selectedCategoryId = settings.selectedCategoryId;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: state.searchText,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          loaded: true,
          settings: {...settings},
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
      };
    }

    case AppActions.notes.types.LOAD_NOTES_LIST_ERROR: {
      const {
        error: {code, description},
      } = action.payload;

      SystemEventsHandler.onError({
        err:
          'notesReducer->LOAD_NOTES_LIST_ERROR: ' + code + ' - ' + description,
      });

      return state;
    }

    case AppActions.notes.types.SWAP_LIST_ITEMS: {
      const {from, to} = action.payload;
      if (from === to) {
        return state;
      }

      const notesList = state.notesList.notes;
      const stateAllNotesList = state.notesList.allNotes;
      const sortType = state.notesList.settings.sortType;
      const groupByCategories = state.notesList.settings.groupByCategories;
      const selectedCategoryId = state.notesList.settings.selectedCategoryId;

      const fromNote = notesList[from];
      const toNote = notesList[to];

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.swapAndCompose({
        fromIndex: from,
        toIndex: to,
        fromNote,
        toNote,
        notesList: stateAllNotesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: state.searchText,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
      };
    }

    case AppActions.notes.types.MOVE_NOTE_TO_TRASH: {
      const {note} = action.payload;

      const notesList = state.notesList.allNotes.map(n => {
        if (n.id === note.id) {
          return {
            ...n,
            reminder: {
              ...n.reminder,
              selectedDateInMilliseconds: -1,
              repeatOption: ReminderRepeatOption.NO_REPEAT,
            },
            deleted: true,
            deleteDateTimestamp: Date.now(),
          };
        }
        return n;
      });
      const sortType = state.notesList.settings.sortType;
      const groupByCategories = state.notesList.settings.groupByCategories;
      const selectedCategoryId = state.notesList.settings.selectedCategoryId;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: state.searchText,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
      };
    }

    case AppActions.notes.types.RESTORE_NOTE_FROM_TRASH: {
      const {note} = action.payload;

      const notesList = state.notesList.allNotes.map(n => {
        if (n.id === note.id) {
          return {
            ...n,
            deleted: false,
            deleteDateTimestamp: -1,
          };
        }
        return n;
      });
      const sortType = state.notesList.settings.sortType;
      const groupByCategories = state.notesList.settings.groupByCategories;
      const selectedCategoryId = state.notesList.settings.selectedCategoryId;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: state.searchText,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
      };
    }

    case AppActions.notes.types.REMOVE_NOTE_COMPLETELY: {
      const {id} = action.payload;

      const notesList = state.notesList.allNotes.filter(note => note.id !== id);
      const sortType = state.notesList.settings.sortType;
      const groupByCategories = state.notesList.settings.groupByCategories;
      const selectedCategoryId = state.notesList.settings.selectedCategoryId;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: state.searchText,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
      };
    }

    case AppActions.notes.types.REMOVE_MULTIPLE_NOTES_COMPLETELY: {
      const {idsArray} = action.payload;

      const idsSet = new Set(idsArray);

      const notesList = state.notesList.allNotes.filter(
        note => !idsSet.has(note.id),
      );
      const sortType = state.notesList.settings.sortType;
      const groupByCategories = state.notesList.settings.groupByCategories;
      const selectedCategoryId = state.notesList.settings.selectedCategoryId;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: state.searchText,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
      };
    }

    case AppActions.notes.types.CHANGE_SORT_TYPE: {
      const {sortType} = action.payload;
      const groupByCategories =
        sortType === NotesListSortTypes.MANUAL
          ? false
          : state.notesList.settings.groupByCategories;

      SystemEventsHandler.onInfo({
        info: 'notesReducer->CHANGE_SORT_TYPE: ' + sortType,
      });

      const notesList = state.notesList.allNotes;
      const selectedCategoryId = state.notesList.settings.selectedCategoryId;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: state.searchText,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          settings: {
            ...state.notesList.settings,
            sortType,
            groupByCategories,
          },
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
      };
    }

    case AppActions.notes.types.SET_GROUP_BY_CATEGORIES: {
      const {groupByCategories} = action.payload;

      SystemEventsHandler.onInfo({
        info: 'notesReducer->SET_GROUP_BY_CATEGORIES: ' + groupByCategories,
      });

      const notesList = state.notesList.allNotes;
      const sortType = state.notesList.settings.sortType;
      const selectedCategoryId = state.notesList.settings.selectedCategoryId;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: state.searchText,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          settings: {
            ...state.notesList.settings,
            groupByCategories,
          },
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
      };
    }

    case AppActions.notes.types.SET_USE_COMPACT_VIEW: {
      const {useCompactView} = action.payload;

      SystemEventsHandler.onInfo({
        info: 'notesReducer->SET_USE_COMPACT_VIEW: ' + useCompactView,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          settings: {
            ...state.notesList.settings,
            useCompactView,
          },
        },
      };
    }

    case AppActions.notes.types.SET_SELECTED_CATEGORY_ID: {
      const {categoryId} = action.payload;

      const notesList = state.notesList.allNotes;
      const sortType = state.notesList.settings.sortType;
      const groupByCategories = state.notesList.settings.groupByCategories;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId: categoryId,
        textToSearch: state.searchText,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          settings: {
            ...state.notesList.settings,
            selectedCategoryId: categoryId,
          },
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
      };
    }

    case AppActions.notes.types.SET_REQUESTED_TO_OPEN_NOTE_ID: {
      const {noteId} = action.payload;

      return {
        ...state,
        requestedToOpenNoteId: noteId,
      };
    }

    case AppActions.notes.types.CLEAR_REQUESTED_TO_OPEN_NOTE_ID: {
      return {
        ...state,
        requestedToOpenNoteId: -1,
      };
    }

    case AppActions.notes.types.SET_FINAL_NOTE_SEARCH_TEXT: {
      const notesList = state.notesList.allNotes;
      const sortType = state.notesList.settings.sortType;
      const groupByCategories = state.notesList.settings.groupByCategories;
      const selectedCategoryId = state.notesList.settings.selectedCategoryId;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: action.payload.text,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
        searchText: action.payload.text,
      };
    }

    case AppActions.notes.types.CLEAR_NOTE_SEARCH_TEXT: {
      const notesList = state.notesList.allNotes;
      const sortType = state.notesList.settings.sortType;
      const groupByCategories = state.notesList.settings.groupByCategories;
      const selectedCategoryId = state.notesList.settings.selectedCategoryId;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: '',
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
        searchText: '',
      };
    }

    case AppActions.vault.types.MOVE_NOTE_TO_VAULT: {
      const {note} = action.payload;

      const notesList = state.notesList.allNotes.map(n => {
        if (n.id === note.id) {
          return {
            ...n,
            vaultedDateTimestamp: Date.now(),
            reminder: {
              ...n.reminder,
              selectedDateInMilliseconds: -1,
              repeatOption: ReminderRepeatOption.NO_REPEAT,
            },
          };
        }
        return n;
      });
      const sortType = state.notesList.settings.sortType;
      const groupByCategories = state.notesList.settings.groupByCategories;
      const selectedCategoryId = state.notesList.settings.selectedCategoryId;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: state.searchText,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
      };
    }

    case AppActions.vault.types.MOVE_NOTE_FROM_VAULT: {
      const {note} = action.payload;

      const notesList = state.notesList.allNotes.map(n => {
        if (n.id === note.id) {
          return {
            ...n,
            vaultedDateTimestamp: -1,
          };
        }
        return n;
      });
      const sortType = state.notesList.settings.sortType;
      const groupByCategories = state.notesList.settings.groupByCategories;
      const selectedCategoryId = state.notesList.settings.selectedCategoryId;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: state.searchText,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
      };
    }

    case AppActions.vault.types.RESET_VAULT_PASSWORD: {
      const notesList = state.notesList.allNotes.filter(
        note => note.vaultedDateTimestamp <= 0,
      );
      const sortType = state.notesList.settings.sortType;
      const groupByCategories = state.notesList.settings.groupByCategories;
      const selectedCategoryId = state.notesList.settings.selectedCategoryId;

      const {
        allNotesList,
        activeNotesList,
        deletedNotesList,
        vaultedNotesList,
      } = NotesListComposer.compose({
        notesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
        textToSearch: state.searchText,
      });

      return {
        ...state,
        notesList: {
          ...state.notesList,
          allNotes: allNotesList,
          notes: activeNotesList,
          deleted: deletedNotesList,
          vaulted: vaultedNotesList,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default notesReducer;
