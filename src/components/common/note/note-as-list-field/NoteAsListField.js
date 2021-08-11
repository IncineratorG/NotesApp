import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import NoteAsListFieldItem from './item/NoteAsListFieldItem';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import TextTransformer from '../../../../utils/note/text-transformer/TextTransformer';
import useAppStateChangeCallback from '../../../../utils/common/hooks/useAppStateChangeCallback';

const NoteAsListField = ({
  noteText,
  categoryColor,
  textSize,
  moveCheckedToBottom,
  sortNoteItemsAlphabetically,
  removeCheckedItems,
  uncheckAllItems,
  undoChanges,
  onChangeText,
  onNoteItemsSorted,
  onCheckedItemsRemoved,
  onAllItemsUnchecked,
  onChangesUndone,
}) => {
  const [noteTextData, setNoteTextData] = useState([]);
  const [switchedToInternalState, setSwitchedToInternalState] = useState(false);
  const [textChanged, setTextChanged] = useState(false);

  const itemTextChangeHandler = useCallback(({id, text}) => {
    setNoteTextData(prev => {
      return TextTransformer.updateListDataItem({
        oldListData: prev,
        updatedListItem: {id, text},
      });
    });
    setTextChanged(true);
  }, []);

  const itemRemoveHandler = useCallback(({id}) => {
    setNoteTextData(prev => {
      return TextTransformer.removeListDataItem({
        oldListData: prev,
        itemId: id,
      });
    });
    setTextChanged(true);
  }, []);

  const itemCheckPressHandler = useCallback(
    ({id}) => {
      setNoteTextData(prev => {
        return TextTransformer.changeListDataItemCheckmark({
          oldListData: prev,
          itemId: id,
          moveCheckedToBottom,
        });
      });
      setTextChanged(true);
    },
    [moveCheckedToBottom],
  );

  const addItemPressHandler = useCallback(({id}) => {
    setNoteTextData(prev => {
      return TextTransformer.addNewListDataItem({
        oldListData: prev,
        previousItemId: id,
      });
    });
    setTextChanged(true);
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      const checked = TextTransformer.isTextChecked({text: item.text});
      const forceFocus = item.forceFocus;

      return (
        <NoteAsListFieldItem
          id={item.id}
          forceFocus={forceFocus}
          text={
            checked
              ? TextTransformer.makeTextUnchecked({text: item.text})
              : item.text
          }
          categoryColor={categoryColor}
          textSize={textSize}
          checked={checked}
          onTextChanged={itemTextChangeHandler}
          onRemove={itemRemoveHandler}
          onCheck={itemCheckPressHandler}
          onAddNewItem={addItemPressHandler}
        />
      );
    },
    [
      textSize,
      categoryColor,
      itemTextChangeHandler,
      itemRemoveHandler,
      itemCheckPressHandler,
      addItemPressHandler,
    ],
  );

  const keyExtractor = useCallback(item => {
    return item.id;
  }, []);

  useAppStateChangeCallback({
    callback: () => {
      setSwitchedToInternalState(false);
      setTextChanged(false);
    },
    runOnGoingToForeground: true,
  });

  useEffect(() => {
    if (!switchedToInternalState) {
      setNoteTextData(TextTransformer.toList({text: noteText}));
    }
  }, [noteText, switchedToInternalState]);

  useEffect(() => {
    if (textChanged) {
      onChangesUndone();
      setSwitchedToInternalState(true);
      onChangeText(TextTransformer.toText({listData: noteTextData}));
    }
  }, [noteTextData, textChanged, onChangeText, onChangesUndone]);

  useEffect(() => {
    if (moveCheckedToBottom) {
      setNoteTextData(prev => {
        return TextTransformer.moveCheckedItemsToBottom({
          listData: prev,
        });
      });
      setTextChanged(true);
    }
  }, [moveCheckedToBottom]);

  useEffect(() => {
    if (sortNoteItemsAlphabetically) {
      setNoteTextData(prev => {
        return TextTransformer.sortListDataItemsAlphabetically({
          oldListData: prev,
          moveCheckedToBottom,
        });
      });
      setTextChanged(true);

      onNoteItemsSorted();
    }
  }, [sortNoteItemsAlphabetically, moveCheckedToBottom, onNoteItemsSorted]);

  useEffect(() => {
    if (undoChanges) {
      setSwitchedToInternalState(false);
      setTextChanged(false);
    }
  }, [undoChanges]);

  useEffect(() => {
    if (removeCheckedItems) {
      setNoteTextData(prev => {
        return TextTransformer.removeCheckedItems({
          oldListData: prev,
        });
      });
      setTextChanged(true);

      onCheckedItemsRemoved();
    }
  }, [removeCheckedItems, onCheckedItemsRemoved]);

  useEffect(() => {
    if (uncheckAllItems) {
      setNoteTextData(prev => {
        return TextTransformer.uncheckAllItems({
          oldListData: prev,
        });
      });
      setTextChanged(true);

      onAllItemsUnchecked();
    }
  }, [uncheckAllItems, onAllItemsUnchecked]);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.list}
        contentContainerStyle={{paddingBottom: 20}}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        data={noteTextData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  list: {},
});

export default React.memo(NoteAsListField);

// import React, {useCallback, useEffect, useState} from 'react';
// import {View, FlatList, StyleSheet} from 'react-native';
// import NoteAsListFieldItem from './item/NoteAsListFieldItem';
// import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
// import TextTransformer from '../../../../utils/note/text-transformer/TextTransformer';
//
// const NoteAsListField = ({
//   noteText,
//   categoryColor,
//   textSize,
//   moveCheckedToBottom,
//   sortNoteItemsAlphabetically,
//   removeCheckedItems,
//   uncheckAllItems,
//   onChangeText,
//   onNoteItemsSorted,
//   onCheckedItemsRemoved,
//   onAllItemsUnchecked,
// }) => {
//   const [noteTextData, setNoteTextData] = useState([]);
//   const [switchedToInternalState, setSwitchedToInternalState] = useState(false);
//   const [textChanged, setTextChanged] = useState(false);
//
//   const itemTextChangeHandler = useCallback(({id, text}) => {
//     setNoteTextData(prev => {
//       return TextTransformer.updateListDataItem({
//         oldListData: prev,
//         updatedListItem: {id, text},
//       });
//     });
//     setTextChanged(true);
//   }, []);
//
//   const itemRemoveHandler = useCallback(({id}) => {
//     setNoteTextData(prev => {
//       let updatedData = TextTransformer.removeListDataItem({
//         oldListData: prev,
//         itemId: id,
//       });
//       if (updatedData.length <= 0) {
//         updatedData.push({id: String(0), text: ''});
//       }
//
//       return updatedData;
//     });
//     setTextChanged(true);
//   }, []);
//
//   const itemCheckPressHandler = useCallback(
//     ({id}) => {
//       setNoteTextData(prev => {
//         return TextTransformer.changeListDataItemCheckmark({
//           oldListData: prev,
//           itemId: id,
//           moveCheckedToBottom,
//         });
//       });
//       setTextChanged(true);
//     },
//     [moveCheckedToBottom],
//   );
//
//   const addItemPressHandler = useCallback(({id}) => {
//     setNoteTextData(prev => {
//       return TextTransformer.addNewListDataItem({
//         oldListData: prev,
//         previousItemId: id,
//       });
//     });
//     setTextChanged(true);
//   }, []);
//
//   const renderItem = useCallback(
//     ({item}) => {
//       const checked = TextTransformer.isTextChecked({text: item.text});
//       const forceFocus = item.forceFocus;
//
//       return (
//         <NoteAsListFieldItem
//           id={item.id}
//           forceFocus={forceFocus}
//           text={
//             checked
//               ? TextTransformer.makeTextUnchecked({text: item.text})
//               : item.text
//           }
//           categoryColor={categoryColor}
//           textSize={textSize}
//           checked={checked}
//           onTextChanged={itemTextChangeHandler}
//           onRemove={itemRemoveHandler}
//           onCheck={itemCheckPressHandler}
//           onAddNewItem={addItemPressHandler}
//         />
//       );
//     },
//     [
//       textSize,
//       categoryColor,
//       itemTextChangeHandler,
//       itemRemoveHandler,
//       itemCheckPressHandler,
//       addItemPressHandler,
//     ],
//   );
//
//   const keyExtractor = useCallback(item => {
//     return item.id;
//   }, []);
//
//   useEffect(() => {
//     if (!switchedToInternalState) {
//       setNoteTextData(TextTransformer.toList({text: noteText}));
//       setSwitchedToInternalState(true);
//
//       SystemEventsHandler.onInfo({
//         info: 'NoteAsListField->WILL_SWITCH_TO _INTERNAL_STATE',
//       });
//     }
//   }, [noteText, switchedToInternalState]);
//
//   useEffect(() => {
//     if (textChanged) {
//       onChangeText(TextTransformer.toText({listData: noteTextData}));
//     }
//   }, [noteTextData, textChanged, onChangeText]);
//
//   useEffect(() => {
//     if (moveCheckedToBottom) {
//       setNoteTextData(prev => {
//         return TextTransformer.moveCheckedItemsToBottom({
//           listData: prev,
//         });
//       });
//       setTextChanged(true);
//     }
//   }, [moveCheckedToBottom]);
//
//   useEffect(() => {
//     if (sortNoteItemsAlphabetically) {
//       setNoteTextData(prev => {
//         return TextTransformer.sortListDataItemsAlphabetically({
//           oldListData: prev,
//           moveCheckedToBottom,
//         });
//       });
//       setTextChanged(true);
//
//       onNoteItemsSorted();
//     }
//   }, [sortNoteItemsAlphabetically, moveCheckedToBottom, onNoteItemsSorted]);
//
//   useEffect(() => {
//     if (removeCheckedItems) {
//       setNoteTextData(prev => {
//         return TextTransformer.removeCheckedItems({
//           oldListData: prev,
//         });
//       });
//       setTextChanged(true);
//
//       onCheckedItemsRemoved();
//     }
//   }, [removeCheckedItems, onCheckedItemsRemoved]);
//
//   useEffect(() => {
//     if (uncheckAllItems) {
//       setNoteTextData(prev => {
//         return TextTransformer.uncheckAllItems({
//           oldListData: prev,
//         });
//       });
//       setTextChanged(true);
//
//       onAllItemsUnchecked();
//     }
//   }, [uncheckAllItems, onAllItemsUnchecked]);
//
//   return (
//     <View style={styles.mainContainer}>
//       <FlatList
//         style={styles.list}
//         contentContainerStyle={{paddingBottom: 20}}
//         keyboardShouldPersistTaps={'handled'}
//         showsVerticalScrollIndicator={false}
//         data={noteTextData}
//         renderItem={renderItem}
//         keyExtractor={keyExtractor}
//       />
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
//   list: {},
// });
//
// export default React.memo(NoteAsListField);
