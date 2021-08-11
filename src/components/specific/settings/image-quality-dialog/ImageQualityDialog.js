import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import ImageQualityDialogItem from './image-quality-item/ImageQualityDialogItem';
import NoteImageQuality from '../../../../data/common/note-image-quality/NoteImageQuality';

const ImageQualityDialog = ({
  visible,
  currentImageQualityType,
  onImageQualityTypeSelect,
  onCancel,
}) => {
  const {t} = useTranslation();

  const imageQualityItemPressHandler = useCallback(
    ({imageQualityType}) => {
      onImageQualityTypeSelect({imageQualityType});
    },
    [onImageQualityTypeSelect],
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{t('ImageQualityDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <ImageQualityDialogItem
              imageQualityType={NoteImageQuality.ORIGINAL}
              text={t('originalImageQuality')}
              isSelected={currentImageQualityType === NoteImageQuality.ORIGINAL}
              onPress={imageQualityItemPressHandler}
            />
            <ImageQualityDialogItem
              imageQualityType={NoteImageQuality.GOOD}
              text={t('goodImageQuality')}
              isSelected={currentImageQualityType === NoteImageQuality.GOOD}
              onPress={imageQualityItemPressHandler}
            />
            <ImageQualityDialogItem
              imageQualityType={NoteImageQuality.AVERAGE}
              text={t('averageImageQuality')}
              isSelected={currentImageQualityType === NoteImageQuality.AVERAGE}
              onPress={imageQualityItemPressHandler}
            />
            <ImageQualityDialogItem
              imageQualityType={NoteImageQuality.LOW}
              text={t('lowImageQuality')}
              isSelected={currentImageQualityType === NoteImageQuality.LOW}
              onPress={imageQualityItemPressHandler}
            />
            <ImageQualityDialogItem
              imageQualityType={NoteImageQuality.VERY_LOW}
              text={t('veryLowImageQuality')}
              isSelected={currentImageQualityType === NoteImageQuality.VERY_LOW}
              onPress={imageQualityItemPressHandler}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>
            {t('ImageQualityDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 250,
  },
});

export default React.memo(ImageQualityDialog);
