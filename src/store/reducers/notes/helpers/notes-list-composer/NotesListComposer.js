import NotesListSortTypes from '../../../../../data/common/notes-list-sort-types/NotesListSortTypes';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
import TextTransformer from '../../../../../utils/note/text-transformer/TextTransformer';

const NotesListComposer = () => {
  const compose = ({
    notesList,
    sortType,
    groupByCategories,
    selectedCategoryId,
    textToSearch,
  }) => {
    const allNotesList = [];
    let activeNotesList = [];
    const deletedNotesList = [];
    const vaultedNotesList = [];

    notesList.forEach(note => {
      allNotesList.push(note);
      if (note.deleted) {
        deletedNotesList.push(note);
      } else {
        if (note.vaultedDateTimestamp > 0) {
          vaultedNotesList.push(note);
        } else {
          if (selectedCategoryId < 0) {
            activeNotesList.push(note);
          } else {
            if (note.category.id === selectedCategoryId) {
              activeNotesList.push(note);
            }
          }
        }
      }
    });

    if (sortType === NotesListSortTypes.MANUAL) {
      allNotesList.sort((n1, n2) => {
        return n1.orderPos < n2.orderPos;
      });
    }

    switch (sortType) {
      case NotesListSortTypes.MANUAL: {
        activeNotesList.sort((n1, n2) => {
          return n1.orderPos < n2.orderPos;
        });
        break;
      }

      case NotesListSortTypes.ALPHABETICAL: {
        activeNotesList.sort((n1, n2) => {
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
        activeNotesList.sort((n1, n2) => {
          return n1.creationDateTimestamp < n2.creationDateTimestamp;
        });
        break;
      }

      case NotesListSortTypes.LAST_UPDATE_DATE: {
        activeNotesList.sort((n1, n2) => {
          return n1.updateDateTimestamp < n2.updateDateTimestamp;
        });
        break;
      }

      case NotesListSortTypes.REMINDER_DATE: {
        const currentDate = Date.now();

        activeNotesList.sort((n1, n2) => {
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

    if (textToSearch && textToSearch.length) {
      const textToSearchInLowerCase = textToSearch.toLowerCase();

      activeNotesList = activeNotesList.filter(note => {
        const title = note.title.trim().toLowerCase();
        if (title.indexOf(textToSearchInLowerCase) >= 0) {
          return true;
        }

        const noteText = note.noteText.trim().toLowerCase();
        return noteText.indexOf(textToSearchInLowerCase) >= 0;
      });
    }

    const groupsMap = new Map();
    if (groupByCategories) {
      activeNotesList.forEach(note => {
        const categoryId = note.category.id;
        let currentCategoryNotes = groupsMap.get(categoryId);
        if (!currentCategoryNotes) {
          currentCategoryNotes = [];
        }
        currentCategoryNotes.push(note);
        groupsMap.set(categoryId, currentCategoryNotes);
      });

      activeNotesList = [...groupsMap.values()].flat();
    }

    return {allNotesList, activeNotesList, deletedNotesList, vaultedNotesList};
  };

  const swapAndCompose = ({
    fromIndex,
    toIndex,
    fromNote,
    toNote,
    notesList,
    sortType,
    groupByCategories,
    selectedCategoryId,
    textToSearch,
  }) => {
    let moveUp = false;
    if (toIndex < fromIndex) {
      moveUp = true;
    }

    let updatedAllNotesList = [];
    if (moveUp) {
      let needDecreaseOrderPos = false;
      updatedAllNotesList = notesList.map((note, index, array) => {
        if (note.id === toNote.id) {
          needDecreaseOrderPos = true;

          return {
            ...note,
            orderPos: note.orderPos - 1,
          };
        } else if (note.id === fromNote.id) {
          needDecreaseOrderPos = false;

          return {
            ...note,
            orderPos: toNote.orderPos,
          };
        } else if (needDecreaseOrderPos) {
          return {
            ...note,
            orderPos: note.orderPos - 1,
          };
        } else {
          return {
            ...note,
          };
        }
      });
    } else {
      let needIncreaseOrderPos = false;
      updatedAllNotesList = notesList.map((note, index, array) => {
        if (note.id === fromNote.id) {
          needIncreaseOrderPos = true;

          return {
            ...note,
            orderPos: toNote.orderPos,
          };
        } else if (note.id === toNote.id) {
          needIncreaseOrderPos = false;

          return {
            ...note,
            orderPos: note.orderPos + 1,
          };
        } else if (needIncreaseOrderPos) {
          return {
            ...note,
            orderPos: note.orderPos + 1,
          };
        } else {
          return {
            ...note,
          };
        }
      });
    }

    return compose({
      notesList: updatedAllNotesList,
      sortType,
      groupByCategories,
      selectedCategoryId,
      textToSearch,
    });
  };

  return {
    compose,
    swapAndCompose,
  };
};

export default NotesListComposer();

// import NotesListSortTypes from '../../../../../data/common/notes-list-sort-types/NotesListSortTypes';
// import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
// import TextTransformer from '../../../../../utils/note/text-transformer/TextTransformer';
// // import _ from 'lodash';
//
// const NotesListComposer = () => {
//   const compose = ({
//     notesList,
//     sortType,
//     groupByCategories,
//     selectedCategoryId,
//     textToSearch,
//   }) => {
//     const allNotesList = [];
//     let activeNotesList = [];
//     const deletedNotesList = [];
//
//     // if (sortType === NotesListSortTypes.MANUAL) {
//     //   notesList.sort((n1, n2) => {
//     //     return n1.orderPos < n2.orderPos;
//     //   });
//     // }
//
//     notesList.forEach(note => {
//       allNotesList.push(note);
//       if (note.deleted) {
//         deletedNotesList.push(note);
//       } else {
//         if (selectedCategoryId < 0) {
//           activeNotesList.push(note);
//         } else {
//           if (note.category.id === selectedCategoryId) {
//             activeNotesList.push(note);
//           }
//         }
//       }
//     });
//
//     if (sortType === NotesListSortTypes.MANUAL) {
//       allNotesList.sort((n1, n2) => {
//         return n1.orderPos < n2.orderPos;
//       });
//     }
//
//     switch (sortType) {
//       case NotesListSortTypes.MANUAL: {
//         activeNotesList.sort((n1, n2) => {
//           return n1.orderPos < n2.orderPos;
//         });
//         break;
//       }
//
//       case NotesListSortTypes.ALPHABETICAL: {
//         activeNotesList.sort((n1, n2) => {
//           let n1Word = n1.title;
//           if (!n1Word) {
//             n1Word = n1.noteText;
//             if (n1.isList) {
//               n1Word = TextTransformer.toUncheckedText({text: n1Word});
//             }
//           }
//
//           let n2Word = n2.title;
//           if (!n2Word) {
//             n2Word = n2.noteText;
//             if (n2.isList) {
//               n2Word = TextTransformer.toUncheckedText({text: n2Word});
//             }
//           }
//
//           return n1Word
//             .trim()
//             .toLowerCase()
//             .localeCompare(n2Word.trim().toLowerCase());
//         });
//         break;
//       }
//
//       case NotesListSortTypes.CREATION_DATE: {
//         activeNotesList.sort((n1, n2) => {
//           return n1.creationDateTimestamp < n2.creationDateTimestamp;
//         });
//         break;
//       }
//
//       case NotesListSortTypes.LAST_UPDATE_DATE: {
//         activeNotesList.sort((n1, n2) => {
//           return n1.updateDateTimestamp < n2.updateDateTimestamp;
//         });
//         break;
//       }
//
//       case NotesListSortTypes.REMINDER_DATE: {
//         const currentDate = Date.now();
//
//         activeNotesList.sort((n1, n2) => {
//           const n1ReminderDate = n1.reminder.selectedDateInMilliseconds;
//           const n2ReminderDate = n2.reminder.selectedDateInMilliseconds;
//
//           if (n1ReminderDate < 0 && n2ReminderDate < 0) {
//             return n1.orderPos < n2.orderPos;
//           }
//
//           if (n1ReminderDate < 0 && n2ReminderDate > 0) {
//             return 1;
//           }
//
//           if (n1ReminderDate > 0 && n2ReminderDate < 0) {
//             return -1;
//           }
//
//           if (n1ReminderDate > 0 && n2ReminderDate > 0) {
//             let n1Distance = n1ReminderDate - currentDate;
//             let n2Distance = n2ReminderDate - currentDate;
//
//             if (n1Distance === 0) {
//               n1Distance = 1;
//             }
//             if (n2Distance === 0) {
//               n2Distance = 1;
//             }
//
//             if (n1Distance < 0 && n2Distance < 0) {
//               if (n1Distance < n2Distance) {
//                 return 1;
//               } else {
//                 return -1;
//               }
//             }
//
//             if (n1Distance < 0 && n2Distance > 0) {
//               return 1;
//             }
//             if (n1Distance > 0 && n2Distance < 0) {
//               return -1;
//             }
//
//             if (n1Distance > 0 && n2Distance > 0) {
//               if (n1Distance < n2Distance) {
//                 return -1;
//               } else {
//                 return 1;
//               }
//             }
//           }
//         });
//         break;
//       }
//     }
//
//     if (textToSearch && textToSearch.length) {
//       // SystemEventsHandler.onInfo({
//       //   info: 'NotesListComposer->TEXT_TO_SEARCH: ' + textToSearch,
//       // });
//
//       const textToSearchInLowerCase = textToSearch.toLowerCase();
//
//       activeNotesList = activeNotesList.filter(note => {
//         const title = note.title.trim().toLowerCase();
//         if (title.indexOf(textToSearchInLowerCase) >= 0) {
//           return true;
//         }
//
//         const noteText = note.noteText.trim().toLowerCase();
//         return noteText.indexOf(textToSearchInLowerCase) >= 0;
//       });
//     }
//
//     const groupsMap = new Map();
//     if (groupByCategories) {
//       activeNotesList.forEach(note => {
//         const categoryId = note.category.id;
//         let currentCategoryNotes = groupsMap.get(categoryId);
//         if (!currentCategoryNotes) {
//           currentCategoryNotes = [];
//         }
//         currentCategoryNotes.push(note);
//         groupsMap.set(categoryId, currentCategoryNotes);
//       });
//
//       activeNotesList = [...groupsMap.values()].flat();
//     }
//
//     return {allNotesList, activeNotesList, deletedNotesList};
//   };
//
//   const swapAndCompose = ({
//     fromIndex,
//     toIndex,
//     fromNote,
//     toNote,
//     notesList,
//     sortType,
//     groupByCategories,
//     selectedCategoryId,
//     textToSearch,
//   }) => {
//     let moveUp = false;
//     if (toIndex < fromIndex) {
//       moveUp = true;
//     }
//
//     let updatedAllNotesList = [];
//     if (moveUp) {
//       let needDecreaseOrderPos = false;
//       updatedAllNotesList = notesList.map((note, index, array) => {
//         if (note.id === toNote.id) {
//           needDecreaseOrderPos = true;
//
//           return {
//             ...note,
//             orderPos: note.orderPos - 1,
//           };
//         } else if (note.id === fromNote.id) {
//           needDecreaseOrderPos = false;
//
//           return {
//             ...note,
//             orderPos: toNote.orderPos,
//           };
//         } else if (needDecreaseOrderPos) {
//           return {
//             ...note,
//             orderPos: note.orderPos - 1,
//           };
//         } else {
//           return {
//             ...note,
//           };
//         }
//       });
//     } else {
//       let needIncreaseOrderPos = false;
//       updatedAllNotesList = notesList.map((note, index, array) => {
//         if (note.id === fromNote.id) {
//           needIncreaseOrderPos = true;
//
//           return {
//             ...note,
//             orderPos: toNote.orderPos,
//           };
//         } else if (note.id === toNote.id) {
//           needIncreaseOrderPos = false;
//
//           return {
//             ...note,
//             orderPos: note.orderPos + 1,
//           };
//         } else if (needIncreaseOrderPos) {
//           return {
//             ...note,
//             orderPos: note.orderPos + 1,
//           };
//         } else {
//           return {
//             ...note,
//           };
//         }
//       });
//     }
//
//     updatedAllNotesList.forEach(note => {
//       SystemEventsHandler.onInfo({info: note.title + ' - ' + note.orderPos});
//     });
//
//     return compose({
//       notesList: updatedAllNotesList,
//       sortType,
//       groupByCategories,
//       selectedCategoryId,
//       textToSearch,
//     });
//   };
//
//   return {
//     compose,
//     swapAndCompose,
//   };
// };
//
// export default NotesListComposer();
