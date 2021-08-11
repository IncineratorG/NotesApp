import React from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SelectImageSourceDialog = ({
  visible,
  onPickFromGalleryPress,
  onTakePhotoPress,
  onCancelPress,
}) => {
  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} dismissable={true} onDismiss={onCancelPress}>
        <Dialog.Title>{t('SelectImageSourceDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <TouchableNativeFeedback onPress={onTakePhotoPress}>
              <View style={styles.takePhotoOptionContainer}>
                <View style={styles.takePhotoIconContainer}>
                  <Icon name="photo-camera" size={24} color={'grey'} />
                </View>
                <View style={styles.takePhotoTextContainer}>
                  <Text style={styles.takePhotoText} numberOfLines={1}>
                    {t('SelectImageSourceDialog_takePhotoText')}
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={onPickFromGalleryPress}>
              <View style={styles.pickFromGalleryOptionContainer}>
                <View style={styles.pickFromGalleryIconContainer}>
                  <Icon name="insert-photo" size={24} color={'grey'} />
                </View>
                <View style={styles.pickFromGalleryTextContainer}>
                  <Text style={styles.pickFromGalleryText} numberOfLines={1}>
                    {t('SelectImageSourceDialog_pickFromGalleryText')}
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 80,
    justifyContent: 'center',
  },
  takePhotoOptionContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  takePhotoIconContainer: {
    width: 40,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  takePhotoTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 4,
    paddingRight: 4,
  },
  takePhotoText: {
    fontSize: 16,
  },
  pickFromGalleryOptionContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  pickFromGalleryIconContainer: {
    width: 40,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  pickFromGalleryTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 4,
    paddingRight: 4,
  },
  pickFromGalleryText: {
    fontSize: 16,
  },
});

export default React.memo(SelectImageSourceDialog);
