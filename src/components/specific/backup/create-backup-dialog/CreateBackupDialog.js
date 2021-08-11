import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateBackupDialog = ({
  visible,
  backupNoteText,
  needSaveImages,
  imagesSizeAcquiring,
  imagesSizeInBytes,
  onBackupNoteTextChanged,
  onNeedSaveImagesChanged,
  onCreatePress,
  onCancelPress,
}) => {
  const {t} = useTranslation();

  const backupNoteTextSize = backupNoteText ? backupNoteText.length : 0;

  const [imagesSizeInMBytes, setImagesSizeInMBytes] = useState(0.0);

  const checkboxUncheckedIconComponent = (
    <Icon name="check-box-outline-blank" size={24} color={'grey'} />
  );
  const checkboxCheckedIconComponent = (
    <Icon name="check-box" size={24} color={'#018786'} />
  );

  const noteImagesSizeInfoComponent = imagesSizeAcquiring ? (
    <Text style={styles.noteImageInfoSize}>
      {t('CreateBackupDialog_imagesSizeAcquiring')}
    </Text>
  ) : (
    <Text style={styles.noteImageInfoSize}>
      {t('CreateBackupDialog_imagesSizePrefix') +
        ' ' +
        imagesSizeInMBytes +
        ' ' +
        t('CreateBackupDialog_imagesSizePostfix')}
    </Text>
  );

  useEffect(() => {
    const sizeInMBytes = (
      Math.round((imagesSizeInBytes / 1024 / 1024) * 100) / 100
    ).toFixed(2);
    setImagesSizeInMBytes(sizeInMBytes);
  }, [imagesSizeInBytes]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancelPress}>
        <Dialog.Title>{t('CreateBackupDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <View style={styles.backupNoteContainer}>
              <TextInput
                style={{fontSize: 18, flex: 1, color: '#000000'}}
                defaultValue={backupNoteText}
                maxLength={15}
                placeholder={t('CreateBackupDialog_backupNotePlaceholder')}
                onChangeText={onBackupNoteTextChanged}
              />
              <View
                style={{
                  width: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'lightgrey'}}>
                  {backupNoteTextSize + ' / 15'}
                </Text>
              </View>
            </View>
            <View style={styles.underline} />
            <TouchableNativeFeedback onPress={onNeedSaveImagesChanged}>
              <View style={styles.notesImagesSizeContainer}>
                <View style={styles.saveNoteImagesCheckmarkContainer}>
                  {needSaveImages
                    ? checkboxCheckedIconComponent
                    : checkboxUncheckedIconComponent}
                </View>
                <View style={styles.noteImagesInfoContainer}>
                  <View style={styles.noteImageInfoTitleContainer}>
                    <Text style={styles.noteImageInfoTitle}>
                      {t('CreateBackupDialog_noteImagesInfoTitle')}
                    </Text>
                  </View>
                  <View style={styles.noteImageInfoSizeContainer}>
                    {noteImagesSizeInfoComponent}
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.underline} />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCreatePress}>
            {t('CreateBackupDialog_createButton')}
          </Button>
          <Button onPress={onCancelPress}>
            {t('CreateBackupDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 100,
  },
  backupNoteContainer: {
    height: 50,
    flexDirection: 'row',
  },
  underline: {
    height: 1,
    backgroundColor: 'black',
  },
  notesTextSizeContainer: {
    height: 50,
    backgroundColor: 'brown',
  },
  notesImagesSizeContainer: {
    height: 50,
    flexDirection: 'row',
  },
  saveNoteImagesCheckmarkContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteImagesInfoContainer: {
    flex: 1,
  },
  noteImageInfoTitleContainer: {
    flex: 1,
  },
  noteImageInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteImageInfoSizeContainer: {
    flex: 1,
  },
  noteImageInfoSize: {
    fontSize: 14,
  },
});

export default React.memo(CreateBackupDialog);

// const noteImagesSizeInfoComponent = !imagesSizeAcquiring ? (
//   <View stlye={styles.infoAcquiringContainer}>
//     <View style={styles.infoAcquiringIconContainer}>
//       <Icon name="check-box-outline-blank" size={24} color={'grey'} />
//     </View>
//     <View style={styles.infoAcquiringTextContainer}>
//       <Text>{'Получение'}</Text>
//     </View>
//   </View>
// ) : (
//   <Text style={styles.noteImageInfoSize}>
//     {t('CreateBackupDialog_imagesSizePrefix') +
//       ' ' +
//       imagesSizeInMBytes +
//       ' ' +
//       t('CreateBackupDialog_imagesSizePostfix')}
//   </Text>
// );

// const noteImagesSizeInfoComponent = (
//   <View style={{flex: 1, flexDirection: 'row'}}>
//     <View style={{width: 25, justifyContent: 'center', alignItems: 'center'}}>
//       <Icon name="history-toggle-off" size={22} color={'grey'} />
//     </View>
//     <View style={{flex: 1, paddingLeft: 4, justifyContent: 'center'}}>
//       <Text style={{fontSize: 14}}>{'Подсчёт размера изображений ...'}</Text>
//     </View>
//   </View>
// );
