import React, {useCallback, useMemo, useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
import useTranslation from '../../../../../utils/common/localization';
import NoteTextSize from '../../../../../data/common/note-text-size/NoteTextSize';
import invert from 'invert-color';

const NoteAsListFieldItem = ({
  id,
  text,
  textSize,
  categoryColor,
  checked,
  forceFocus,
  onTextChanged,
  onRemove,
  onCheck,
  onAddNewItem,
}) => {
  const {t} = useTranslation();

  const [inputHasFocus, setInputHasFocus] = useState(false);

  const textInputRef = useRef(null);

  const onFocusHandler = useCallback(() => {
    setInputHasFocus(true);
  }, []);

  const onBlurHandler = useCallback(() => {
    setInputHasFocus(false);
  }, []);

  const removePressHandler = useCallback(() => {
    onRemove({id});
  }, [id, onRemove]);

  const checkboxPressHandler = useCallback(() => {
    onCheck({id});
  }, [id, onCheck]);

  const changeTextHandler = useCallback(
    updatedText => {
      if (updatedText.charAt(updatedText.length - 1) === '\n') {
        onBlurHandler();
        onAddNewItem({id});

        return;
      }

      onTextChanged({id, text: updatedText});
    },
    [id, onTextChanged, onAddNewItem, onBlurHandler],
  );

  // const onKeyPressHandler = useCallback(
  //   e => {
  //     SystemEventsHandler.onInfo({
  //       info: 'onKeyPressHandler(): ' + e.nativeEvent.key + ' - ' + text,
  //     });
  //
  //     // if (e.nativeEvent.key === 'Enter') {
  //     //   onBlurHandler();
  //     //   onAddNewItem({id});
  //     // }
  //   },
  //   [id, onAddNewItem, text, onBlurHandler],
  // );
  // const onKeyPressHandler = e => {
  //   SystemEventsHandler.onInfo({
  //     info: 'onKeyPressHandler(): ' + e.nativeEvent.key + ' - ' + text,
  //   });
  //
  //   if (e.nativeEvent.key === 'Backspace' && text.length <= 0) {
  //     removePressHandler();
  //   }
  // };

  const checkboxComponent = useMemo(() => {
    if (checked) {
      return (
        <Icon
          name="check-box"
          size={20}
          color={invert(categoryColor, {
            black: '#21212166',
            white: '#fafafa66',
          })}
        />
      );
    } else {
      return (
        <Icon
          name="check-box-outline-blank"
          size={20}
          color={invert(categoryColor, {
            black: '#21212166',
            white: '#fafafa66',
          })}
        />
      );
    }
  }, [checked, categoryColor]);

  const removeIconComponent = useMemo(() => {
    return inputHasFocus ? (
      <TouchableWithoutFeedback onPress={removePressHandler}>
        <View style={styles.removeIconContainer}>
          <Icon
            name={'clear'}
            size={24}
            color={invert(categoryColor, {
              black: '#21212166',
              white: '#fafafa66',
            })}
          />
        </View>
      </TouchableWithoutFeedback>
    ) : null;
  }, [inputHasFocus, categoryColor, removePressHandler]);

  useEffect(() => {
    if (forceFocus) {
      textInputRef.current.focus();
    }
  }, [forceFocus]);

  // ===
  // const onSubmitEditingHandler = () => {
  //   SystemEventsHandler.onInfo({info: 'SUBMIT_EDITING'});
  // };
  // ===

  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={checkboxPressHandler}>
        <View style={styles.checkboxContainer}>{checkboxComponent}</View>
      </TouchableWithoutFeedback>
      <View style={styles.textContainer}>
        <TextInput
          ref={textInputRef}
          style={[
            styles.text,
            {
              fontSize: NoteTextSize.toFontSize(textSize),
              color: invert(categoryColor, {
                black: '#3a3a3a',
                white: '#fafafa',
              }),
            },
          ]}
          value={text}
          // defaultValue={text}
          placeholder={t('NoteAsListFieldItem_placeholder')}
          placeholderTextColor={invert(categoryColor, {
            black: '#21212166',
            white: '#fafafa66',
          })}
          blurOnSubmit={false}
          multiline={true}
          onChangeText={changeTextHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          // onSubmitEditing={onSubmitEditingHandler}
          // onKeyPress={onKeyPressHandler}
          // onEndEditing={() => {
          //   SystemEventsHandler.onInfo({info: 'onEndEditing()'});
          // }}
        />
      </View>
      {removeIconComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // marginTop: 4,
    // width: 100,
    minHeight: 50,
    // backgroundColor: 'cyan',
    flexDirection: 'row',
  },
  dragFieldContainer: {
    alignSelf: 'stretch',
    width: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragFieldTouchable: {
    flex: 1,
    alignSelf: 'stretch',
  },
  checkboxContainer: {
    alignSelf: 'stretch',
    width: 50,
    // backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignSelf: 'stretch',
    // backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
  },
  removeIconContainer: {
    alignSelf: 'stretch',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'black',
  },
});

export default React.memo(NoteAsListFieldItem);

// import React, {useCallback, useMemo, useState, useRef, useEffect} from 'react';
// import {
//   View,
//   TextInput,
//   TouchableWithoutFeedback,
//   StyleSheet,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
// import useTranslation from '../../../../../utils/common/localization';
// import NoteTextSize from '../../../../../data/common/note-text-size/NoteTextSize';
// import invert from 'invert-color';
//
// const NoteAsListFieldItem = ({
//   id,
//   text,
//   textSize,
//   categoryColor,
//   checked,
//   forceFocus,
//   onTextChanged,
//   onRemove,
//   onCheck,
//   onAddNewItem,
// }) => {
//   const {t} = useTranslation();
//
//   const [inputHasFocus, setInputHasFocus] = useState(false);
//
//   const textInputRef = useRef(null);
//
//   const removePressHandler = useCallback(() => {
//     onRemove({id});
//   }, [id, onRemove]);
//
//   const checkboxPressHandler = useCallback(() => {
//     onCheck({id});
//   }, [id, onCheck]);
//
//   const changeTextHandler = useCallback(
//     updatedText => {
//       if (updatedText.charAt(updatedText.length - 1) === '\n') {
//         return;
//       }
//
//       onTextChanged({id, text: updatedText});
//     },
//     [id, onTextChanged],
//   );
//
//   const onFocusHandler = useCallback(() => {
//     setInputHasFocus(true);
//   }, []);
//
//   const onBlurHandler = useCallback(() => {
//     setInputHasFocus(false);
//   }, []);
//
//   const onKeyPressHandler = useCallback(
//     e => {
//       if (e.nativeEvent.key === 'Enter') {
//         onBlurHandler();
//         onAddNewItem({id});
//       }
//     },
//     [id, onAddNewItem, onBlurHandler],
//   );
//
//   const checkboxComponent = useMemo(() => {
//     if (checked) {
//       return (
//         <Icon
//           name="check-box"
//           size={20}
//           color={invert(categoryColor, {
//             black: '#21212166',
//             white: '#fafafa66',
//           })}
//         />
//       );
//     } else {
//       return (
//         <Icon
//           name="check-box-outline-blank"
//           size={20}
//           color={invert(categoryColor, {
//             black: '#21212166',
//             white: '#fafafa66',
//           })}
//         />
//       );
//     }
//   }, [checked, categoryColor]);
//
//   const removeIconComponent = useMemo(() => {
//     return inputHasFocus ? (
//       <TouchableWithoutFeedback onPress={removePressHandler}>
//         <View style={styles.removeIconContainer}>
//           <Icon
//             name={'clear'}
//             size={24}
//             color={invert(categoryColor, {
//               black: '#21212166',
//               white: '#fafafa66',
//             })}
//           />
//         </View>
//       </TouchableWithoutFeedback>
//     ) : null;
//   }, [inputHasFocus, categoryColor, removePressHandler]);
//
//   useEffect(() => {
//     if (forceFocus) {
//       textInputRef.current.focus();
//     }
//   }, [forceFocus]);
//
//   return (
//     <View style={styles.mainContainer}>
//       <TouchableWithoutFeedback onPress={checkboxPressHandler}>
//         <View style={styles.checkboxContainer}>{checkboxComponent}</View>
//       </TouchableWithoutFeedback>
//       <View style={styles.textContainer}>
//         <TextInput
//           ref={textInputRef}
//           style={[
//             styles.text,
//             {
//               fontSize: NoteTextSize.toFontSize(textSize),
//               color: invert(categoryColor, {
//                 black: '#3a3a3a',
//                 white: '#fafafa',
//               }),
//             },
//           ]}
//           value={text}
//           placeholder={t('NoteAsListFieldItem_placeholder')}
//           placeholderTextColor={invert(categoryColor, {
//             black: '#21212166',
//             white: '#fafafa66',
//           })}
//           blurOnSubmit={false}
//           multiline={true}
//           onChangeText={changeTextHandler}
//           onFocus={onFocusHandler}
//           onBlur={onBlurHandler}
//           // onSubmitEditing={onSubmitEditingHandler}
//           onKeyPress={onKeyPressHandler}
//         />
//       </View>
//       {removeIconComponent}
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     // marginTop: 4,
//     // width: 100,
//     minHeight: 50,
//     // backgroundColor: 'cyan',
//     flexDirection: 'row',
//   },
//   dragFieldContainer: {
//     alignSelf: 'stretch',
//     width: 50,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dragFieldTouchable: {
//     flex: 1,
//     alignSelf: 'stretch',
//   },
//   checkboxContainer: {
//     alignSelf: 'stretch',
//     width: 50,
//     // backgroundColor: 'purple',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textContainer: {
//     flex: 1,
//     alignSelf: 'stretch',
//     // backgroundColor: 'white',
//   },
//   text: {
//     fontSize: 20,
//   },
//   removeIconContainer: {
//     alignSelf: 'stretch',
//     width: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // backgroundColor: 'black',
//   },
// });
//
// export default React.memo(NoteAsListFieldItem);

// ============================================================
// ============================================================
// import React, {useCallback, useMemo, useState} from 'react';
// import {
//   View,
//   TextInput,
//   TouchableWithoutFeedback,
//   StyleSheet,
//   Keyboard,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
// import useTranslation from '../../../../../utils/common/localization';
//
// const NoteAsListFieldItem = ({
//   id,
//   text,
//   checked,
//   onTextChanged,
//   onRemove,
//   onCheck,
//   onAddNewItem,
// }) => {
//   const {t} = useTranslation();
//
//   const [inputHasFocus, setInputHasFocus] = useState(false);
//
//   const removePressHandler = useCallback(() => {
//     onRemove({id});
//   }, [id, onRemove]);
//
//   const checkboxPressHandler = useCallback(() => {
//     onCheck({id});
//   }, [id, onCheck]);
//
//   const changeTextHandler = useCallback(
//     updatedText => {
//       if (updatedText.charAt(updatedText.length - 1) === '\n') {
//         SystemEventsHandler.onInfo({
//           info: 'changeTextHandler(): ENTER_PRESSED',
//         });
//         return;
//       }
//
//       onTextChanged({id, text: updatedText});
//     },
//     [id, onTextChanged],
//   );
//
//   const onFocusHandler = useCallback(() => {
//     setInputHasFocus(true);
//   }, []);
//
//   const onBlurHandler = useCallback(() => {
//     setInputHasFocus(false);
//   }, []);
//
//   const onSubmitEditingHandler = useCallback(() => {
//     SystemEventsHandler.onInfo({
//       info: 'NoteAsListFieldItem->onSubmitEditingHandler()',
//     });
//   }, []);
//
//   const onKeyPressHandler = useCallback(
//     e => {
//       if (e.nativeEvent.key === 'Enter') {
//         // setEnterPressed(true);
//
//         SystemEventsHandler.onInfo({info: 'ENTER_PRESSED'});
//         onAddNewItem({id});
//       }
//     },
//     [id, onAddNewItem],
//   );
//
//   const checkboxUncheckedComponent = useMemo(() => {
//     return <Icon name="check-box-outline-blank" size={20} color={'grey'} />;
//   }, []);
//   const checkboxCheckedComponent = useMemo(() => {
//     return <Icon name="check-box" size={20} color={'grey'} />;
//   }, []);
//   const checkboxComponent = checked
//     ? checkboxCheckedComponent
//     : checkboxUncheckedComponent;
//
//   const removeIconComponent = useMemo(() => {
//     return inputHasFocus ? (
//       <TouchableWithoutFeedback onPress={removePressHandler}>
//         <View style={styles.removeIconContainer}>
//           <Icon name={'clear'} size={24} color="#757575" />
//         </View>
//       </TouchableWithoutFeedback>
//     ) : null;
//   }, [inputHasFocus, removePressHandler]);
//
//   return (
//     <View style={styles.mainContainer}>
//       <TouchableWithoutFeedback onPress={checkboxPressHandler}>
//         <View style={styles.checkboxContainer}>{checkboxComponent}</View>
//       </TouchableWithoutFeedback>
//       <View style={styles.textContainer}>
//         <TextInput
//           style={styles.text}
//           value={text}
//           placeholder={t('NoteAsListFieldItem_placeholder')}
//           blurOnSubmit={false}
//           multiline={true}
//           onChangeText={changeTextHandler}
//           onFocus={onFocusHandler}
//           onBlur={onBlurHandler}
//           onSubmitEditing={onSubmitEditingHandler}
//           onKeyPress={onKeyPressHandler}
//         />
//       </View>
//       {removeIconComponent}
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     // marginTop: 4,
//     // width: 100,
//     minHeight: 50,
//     // backgroundColor: 'cyan',
//     flexDirection: 'row',
//   },
//   dragFieldContainer: {
//     alignSelf: 'stretch',
//     width: 50,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dragFieldTouchable: {
//     flex: 1,
//     alignSelf: 'stretch',
//   },
//   checkboxContainer: {
//     alignSelf: 'stretch',
//     width: 50,
//     // backgroundColor: 'purple',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textContainer: {
//     flex: 1,
//     alignSelf: 'stretch',
//     // backgroundColor: 'white',
//   },
//   text: {
//     fontSize: 20,
//   },
//   removeIconContainer: {
//     alignSelf: 'stretch',
//     width: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // backgroundColor: 'black',
//   },
// });
//
// export default React.memo(NoteAsListFieldItem);
// ============================================================
// ============================================================
