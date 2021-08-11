import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import TextTransformer from '../../../../utils/note/text-transformer/TextTransformer';
import DeletedNoteAsListFieldItem from './item/DeletedNoteAsListFieldItem';

const DeletedNoteAsListField = ({noteText, categoryColor, textSize}) => {
  const [noteTextData, setNoteTextData] = useState([]);
  const [switchedToInternalState, setSwitchedToInternalState] = useState(false);

  const renderItem = useCallback(
    ({item}) => {
      const checked = TextTransformer.isTextChecked({text: item.text});
      const forceFocus = item.forceFocus;

      return (
        <DeletedNoteAsListFieldItem
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
        />
      );
    },
    [textSize, categoryColor],
  );

  const keyExtractor = useCallback(item => {
    return item.id;
  }, []);

  useEffect(() => {
    if (!switchedToInternalState) {
      setNoteTextData(TextTransformer.toList({text: noteText}));
      setSwitchedToInternalState(true);
    }
  }, [noteText, switchedToInternalState]);

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

export default React.memo(DeletedNoteAsListField);
