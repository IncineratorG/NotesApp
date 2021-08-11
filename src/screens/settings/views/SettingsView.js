import React from 'react';
import {View, StyleSheet} from 'react-native';
import useTranslation from '../../../utils/common/localization';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextSizeDialog from '../../../components/specific/settings/text-size-dialog/TextSizeDialog';
import DefaultNotesListBehaviorDialog from '../../../components/specific/settings/default-notes-list-behavior-dialog/DefaultNotesListBehaviorDialog';
import ImageQualityDialog from '../../../components/specific/settings/image-quality-dialog/ImageQualityDialog';

const SettingsView = ({model, controller}) => {
  const {t} = useTranslation();

  const {
    data: {
      noteTextDefaultSize,
      moveCheckedToBottom,
      automaticCleaning,
      defaultNoteTextSizeName,
      textSizeDialogVisible,
      defaultNotesListBehaviorDialogVisible,
      noteImageQuality,
      noteImageQualityName,
      noteImageQualityDialogVisible,
    },
  } = model;

  const {
    defaultNoteTextSizePressHandler,
    defaultListBehaviorPressHandler,
    noteImageQualityPressHandler,
    trashClearingPressHandler,
    textSizeDialogCancelHandler,
    textSizeDialogTextSizeSelectHandler,
    defaultNotesListBehaviorDialogCancelHandler,
    defaultNotesListBehaviorDialogChangeMoveCheckedListItemsToBottomHandler,
    imageQualityDialogCancelHandler,
    imageQualityDialogImageQualitySelectHandler,
  } = controller;

  const selectTextSizeDialog = (
    <TextSizeDialog
      visible={textSizeDialogVisible}
      currentTextSizeType={noteTextDefaultSize}
      onTextSizeTypeSelect={textSizeDialogTextSizeSelectHandler}
      onCancel={textSizeDialogCancelHandler}
    />
  );

  const defaultNotesListBehaviorDialog = (
    <DefaultNotesListBehaviorDialog
      visible={defaultNotesListBehaviorDialogVisible}
      moveCheckedToBottom={moveCheckedToBottom}
      onMoveCheckedToBottomChanged={
        defaultNotesListBehaviorDialogChangeMoveCheckedListItemsToBottomHandler
      }
      onCancel={defaultNotesListBehaviorDialogCancelHandler}
    />
  );

  const imageQualityDialog = (
    <ImageQualityDialog
      visible={noteImageQualityDialogVisible}
      currentImageQualityType={noteImageQuality}
      onImageQualityTypeSelect={imageQualityDialogImageQualitySelectHandler}
      onCancel={imageQualityDialogCancelHandler}
    />
  );

  return (
    <View style={styles.mainContainer}>
      <List.Section>
        <List.Subheader>{t('Settings_notesSectionTitle')}</List.Subheader>
        <List.Item
          style={{borderBottomColor: 'lightgrey', borderBottomWidth: 1}}
          title={t('Settings_defaultNoteTextSize')}
          description={defaultNoteTextSizeName}
          onPress={defaultNoteTextSizePressHandler}
        />
        <List.Item
          style={{borderBottomColor: 'lightgrey', borderBottomWidth: 1}}
          title={t('Settings_defaultListBehavior')}
          description={
            moveCheckedToBottom
              ? t('Settings_defaultListBehavior_moveCheckedItemsToBottom')
              : t('Settings_defaultListBehavior_dontMoveCheckedItemsToBottom')
          }
          onPress={defaultListBehaviorPressHandler}
        />
        <List.Item
          style={{borderBottomColor: 'lightgrey', borderBottomWidth: 1}}
          title={t('Settings_noteImageQuality')}
          description={noteImageQualityName}
          onPress={noteImageQualityPressHandler}
        />
        <List.Subheader>{t('Settings_otherSectionTitle')}</List.Subheader>
        <List.Item
          style={{borderBottomColor: 'lightgrey', borderBottomWidth: 1}}
          title={t('Settings_automaticTrashCleaning')}
          description={t('Settings_automaticTrashCleaning_description')}
          right={props => (
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Icon
                name={
                  automaticCleaning ? 'check-box' : 'check-box-outline-blank'
                }
                size={24}
                color={automaticCleaning ? '#018786' : 'grey'}
              />
            </View>
          )}
          onPress={trashClearingPressHandler}
        />
      </List.Section>
      {selectTextSizeDialog}
      {defaultNotesListBehaviorDialog}
      {imageQualityDialog}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default React.memo(SettingsView);
