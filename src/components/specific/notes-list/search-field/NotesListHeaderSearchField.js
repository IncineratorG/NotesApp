import React from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../../../../utils/common/localization';

const NotesListHeaderSearchField = ({text, onChangeText, onClearPress}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={t('NotesList_headerSearchBarPlaceholder')}
          placeholderTextColor={'#fafafa66'}
          multiline={false}
          defaultValue={text}
          autoFocus={true}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableWithoutFeedback onPress={onClearPress}>
        <View style={styles.clearInputButtonContainer}>
          <MaterialIcon name="clear" size={24} color="#fafafa66" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  textInputContainer: {
    flex: 1,
  },
  textInput: {
    fontSize: 18,
    color: 'white',
  },
  clearInputButtonContainer: {
    width: 50,
    // backgroundColor: 'purple',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default React.memo(NotesListHeaderSearchField);
