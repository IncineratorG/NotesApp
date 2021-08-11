import NotesListSortTypes from '../../../../../data/common/notes-list-sort-types/NotesListSortTypes';
import TextTransformer from '../../../../../utils/note/text-transformer/TextTransformer';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';

const VaultedNotesListComposer = () => {
  const compose = ({
    notesList,
    sortType,
    groupByCategories,
    selectedCategoryId,
  }) => {
    let vaultedNotesList = [...notesList];

    switch (sortType) {
      case NotesListSortTypes.MANUAL: {
        vaultedNotesList.sort((n1, n2) => {
          return n1.vaultedDateTimestamp < n2.vaultedDateTimestamp;
        });
        break;
      }

      case NotesListSortTypes.ALPHABETICAL: {
        vaultedNotesList.sort((n1, n2) => {
          let n1Word = n1.title;
          if (!n1Word) {
            n1Word = n1.noteText;
            if (n1.isList) {
              n1Word = TextTransformer.toUncheckedText({text: n1Word});
            }
          }

          let n2Word = n2.title;
          if (!n2Word) {
            n2Word = n2.noteText;
            if (n2.isList) {
              n2Word = TextTransformer.toUncheckedText({text: n2Word});
            }
          }

          return n1Word
            .trim()
            .toLowerCase()
            .localeCompare(n2Word.trim().toLowerCase());
        });
        break;
      }

      case NotesListSortTypes.CREATION_DATE: {
        vaultedNotesList.sort((n1, n2) => {
          return n1.creationDateTimestamp < n2.creationDateTimestamp;
        });
        break;
      }

      case NotesListSortTypes.LAST_UPDATE_DATE: {
        vaultedNotesList.sort((n1, n2) => {
          return n1.updateDateTimestamp < n2.updateDateTimestamp;
        });
        break;
      }

      case NotesListSortTypes.REMINDER_DATE: {
        const currentDate = Date.now();

        vaultedNotesList.sort((n1, n2) => {
          const n1ReminderDate = n1.reminder.selectedDateInMilliseconds;
          const n2ReminderDate = n2.reminder.selectedDateInMilliseconds;

          if (n1ReminderDate < 0 && n2ReminderDate < 0) {
            return n1.orderPos < n2.orderPos;
          }

          if (n1ReminderDate < 0 && n2ReminderDate > 0) {
            return 1;
          }

          if (n1ReminderDate > 0 && n2ReminderDate < 0) {
            return -1;
          }

          if (n1ReminderDate > 0 && n2ReminderDate > 0) {
            let n1Distance = n1ReminderDate - currentDate;
            let n2Distance = n2ReminderDate - currentDate;

            if (n1Distance === 0) {
              n1Distance = 1;
            }
            if (n2Distance === 0) {
              n2Distance = 1;
            }

            if (n1Distance < 0 && n2Distance < 0) {
              if (n1Distance < n2Distance) {
                return 1;
              } else {
                return -1;
              }
            }

            if (n1Distance < 0 && n2Distance > 0) {
              return 1;
            }
            if (n1Distance > 0 && n2Distance < 0) {
              return -1;
            }

            if (n1Distance > 0 && n2Distance > 0) {
              if (n1Distance < n2Distance) {
                return -1;
              } else {
                return 1;
              }
            }
          }
        });
        break;
      }
    }

    const groupsMap = new Map();
    if (groupByCategories) {
      vaultedNotesList.forEach(note => {
        const categoryId = note.category.id;
        let currentCategoryNotes = groupsMap.get(categoryId);
        if (!currentCategoryNotes) {
          currentCategoryNotes = [];
        }
        currentCategoryNotes.push(note);
        groupsMap.set(categoryId, currentCategoryNotes);
      });

      vaultedNotesList = [...groupsMap.values()].flat();
    }

    return {
      vaultedNotesList,
    };
  };

  return {
    compose,
  };
};

export default VaultedNotesListComposer();
