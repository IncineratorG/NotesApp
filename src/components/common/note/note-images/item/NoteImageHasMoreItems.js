import React, {useCallback} from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import useTranslation from '../../../../../utils/common/localization';

const NoteImageHasMoteItems = ({remainingImagesCount, onPress}) => {
  const {t} = useTranslation();

  const moreImagesPressHandler = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  return (
    <TouchableNativeFeedback onPress={moreImagesPressHandler}>
      <View style={styles.mainContainer}>
        <Text style={styles.text}>
          {t('NoteImageHasMoreItems_remainingImages') +
            ' ' +
            remainingImagesCount}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default React.memo(NoteImageHasMoteItems);
