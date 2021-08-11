import React, {useCallback, useMemo, useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../../../../../utils/common/localization';
import NoteTextSize from '../../../../../data/common/note-text-size/NoteTextSize';
import invert from 'invert-color';

const DeletedNoteAsListFieldItem = ({
  id,
  text,
  textSize,
  categoryColor,
  checked,
  forceFocus,
}) => {
  const {t} = useTranslation();

  const [inputHasFocus, setInputHasFocus] = useState(false);

  const textInputRef = useRef(null);

  // const removePressHandler = useCallback(() => {
  //   onRemove({id});
  // }, [id, onRemove]);
  //
  // const checkboxPressHandler = useCallback(() => {
  //   onCheck({id});
  // }, [id, onCheck]);

  // const changeTextHandler = useCallback(
  //   updatedText => {
  //     if (updatedText.charAt(updatedText.length - 1) === '\n') {
  //       return;
  //     }
  //
  //     onTextChanged({id, text: updatedText});
  //   },
  //   [id, onTextChanged],
  // );

  const onFocusHandler = useCallback(() => {
    setInputHasFocus(true);
  }, []);

  const onBlurHandler = useCallback(() => {
    setInputHasFocus(false);
  }, []);

  // const onKeyPressHandler = useCallback(
  //   e => {
  //     if (e.nativeEvent.key === 'Enter') {
  //       onBlurHandler();
  //       onAddNewItem({id});
  //     }
  //   },
  //   [id, onAddNewItem, onBlurHandler],
  // );

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
      <TouchableWithoutFeedback>
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
  }, [inputHasFocus, categoryColor]);

  useEffect(() => {
    if (forceFocus) {
      textInputRef.current.focus();
    }
  }, [forceFocus]);

  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback>
        <View style={styles.checkboxContainer}>{checkboxComponent}</View>
      </TouchableWithoutFeedback>
      <View style={styles.textContainer}>
        <TextInput
          ref={textInputRef}
          editable={false}
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
          placeholder={t('NoteAsListFieldItem_placeholder')}
          placeholderTextColor={invert(categoryColor, {
            black: '#21212166',
            white: '#fafafa66',
          })}
          blurOnSubmit={false}
          multiline={true}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
      </View>
      {removeIconComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 50,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  text: {
    fontSize: 20,
  },
  removeIconContainer: {
    alignSelf: 'stretch',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(DeletedNoteAsListFieldItem);
