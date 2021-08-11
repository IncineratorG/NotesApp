import React from 'react';
import {View, StyleSheet} from 'react-native';
import NoteTitleField from '../../../components/common/note/note-title-field/NoteTitleField';
import NoteUpdateDateField from '../../../components/common/note/note-update-date-field/NoteUpdateDateField';
import NoteAsTextField from '../../../components/common/note/note-as-text-field/NoteAsTextField';
import NoteAsListField from '../../../components/common/note/note-as-list-field/NoteAsListField';
import SelectCategoryDialog from '../../../components/common/note/select-category-dialog/SelectCategoryDialog';
import NoteReminderField from '../../../components/specific/note/note-reminder-field/NoteReminderField';
import ReminderDialog from '../../../components/specific/note/reminder-dialog/ReminderDialog';
import invert from 'invert-color';
import NoteImages from '../../../components/common/note/note-images/NoteImages';
import ImageViewerModal from '../../../components/common/note/image-viewer-modal/ImageViewerModal';
import RemoveNoteImageConfirmationDialog from '../../../components/common/note/remove-note-image-confirmation-dialog/RemoveNoteImageConfirmationDialog';
import SelectImageSourceDialog from '../../../components/common/note/select-image-source-dialog/SelecteImageSourceDialog';
import CameraModal from '../../../components/common/note/camera-modal/CameraModal';

const NoteView = ({model, controller}) => {
  const {
    data: {
      isNewNote,
      sortNoteItemsAlphabetically,
      removeCheckedItems,
      uncheckAllItems,
      noteAsListUndoChanges,
      categoryColor,
      imageViewerVisible,
      imageViewerImages,
      imageViewerInitialIndex,
      removeNoteImageConfirmationDialogVisible,
      localState: {
        note: {
          id,
          title,
          isList,
          noteText,
          textSize,
          moveCheckedToBottom,
          reminder: {selectedDateInMilliseconds, repeatOption},
          images,
          updateDateTimestamp,
        },
        selectCategoryDialog: {visible: selectCategoryDialogVisible},
        reminderDialog: {visible: reminderDialogVisible},
        selectImageSourceDialog: {visible: selectImageSourceDialogVisible},
        photoCamera: {active: photoCameraActive},
      },
      noteReminderExpired,
      noteImageQuality,
    },
  } = model;

  const {
    noteController: {
      noteTitleChangeTextHandler,
      noteTitleSubmitEditingPressHandler,
      noteTextChangeTextHandler,
      noteReminderPressHandler,
      removeReminderPressHandler,
      noteItemsSortedHandler,
      noteCheckedItemsRemovedHandler,
      allNoteItemsUncheckedHandler,
      noteAsListChangesUndoneHandler,
      noteImagePressHandler,
      noteImageMoreImagesPressHandler,
      noteImageRemovePressHandler,
      removeNoteImageConfirmationDialogRemoveHandler,
      removeNoteImageConfirmationDialogCancelHandler,
    },
    selectCategoryDialogController: {
      selectCategoryDialogCancelHandler,
      selectCategoryDialogCategoryPressHandler,
    },
    reminderDialogController: {
      reminderDialogCancelPressHandler,
      reminderDialogOkPressHandler,
    },
    imageViewerController: {
      noteImageViewerCancelHandler,
      noteImageViewerRemoveImageHandler,
    },
    selectImageSourceDialogController: {
      selectImageSourceDialogCancelPressHandler,
      selectImageSourceDialogPickFromGalleryPressHandler,
      selectImageSourceDialogTakePhotoPressHandler,
    },
    cameraController: {cameraCancelHandler, cameraPhotoAcceptedHandler},
  } = controller;

  const imageViewerComponent = (
    <ImageViewerModal
      visible={imageViewerVisible}
      noteId={id}
      images={imageViewerImages}
      initialIndex={imageViewerInitialIndex}
      onRemove={noteImageViewerRemoveImageHandler}
      onClose={noteImageViewerCancelHandler}
    />
  );

  const noteImagesComponent =
    images && images.length ? (
      <NoteImages
        noteId={id}
        images={images}
        onImagePress={noteImagePressHandler}
        onMoreImagesPress={noteImageMoreImagesPressHandler}
        onImageRemovePress={noteImageRemovePressHandler}
      />
    ) : null;

  const noteComponent = isList ? (
    <NoteAsListField
      noteText={noteText}
      categoryColor={categoryColor}
      textSize={textSize}
      moveCheckedToBottom={moveCheckedToBottom}
      sortNoteItemsAlphabetically={sortNoteItemsAlphabetically}
      removeCheckedItems={removeCheckedItems}
      undoChanges={noteAsListUndoChanges}
      uncheckAllItems={uncheckAllItems}
      onChangeText={noteTextChangeTextHandler}
      onNoteItemsSorted={noteItemsSortedHandler}
      onCheckedItemsRemoved={noteCheckedItemsRemovedHandler}
      onAllItemsUnchecked={allNoteItemsUncheckedHandler}
      onChangesUndone={noteAsListChangesUndoneHandler}
    />
  ) : (
    <NoteAsTextField
      noteText={noteText}
      categoryColor={categoryColor}
      textSize={textSize}
      focused={isNewNote}
      onChangeText={noteTextChangeTextHandler}
    />
  );

  const selectCategoryDialogComponent = (
    <SelectCategoryDialog
      visible={selectCategoryDialogVisible}
      onCategoryPress={selectCategoryDialogCategoryPressHandler}
      onCancel={selectCategoryDialogCancelHandler}
    />
  );

  const reminderDialogComponent = (
    <ReminderDialog
      visible={reminderDialogVisible}
      selectedDateInMilliseconds={selectedDateInMilliseconds}
      onOkPress={reminderDialogOkPressHandler}
      onCancelPress={reminderDialogCancelPressHandler}
    />
  );

  const removeImageConfirmationDialog = (
    <RemoveNoteImageConfirmationDialog
      visible={removeNoteImageConfirmationDialogVisible}
      onRemove={removeNoteImageConfirmationDialogRemoveHandler}
      onCancel={removeNoteImageConfirmationDialogCancelHandler}
    />
  );

  const selectImageSourceDialog = (
    <SelectImageSourceDialog
      visible={selectImageSourceDialogVisible}
      onPickFromGalleryPress={
        selectImageSourceDialogPickFromGalleryPressHandler
      }
      onTakePhotoPress={selectImageSourceDialogTakePhotoPressHandler}
      onCancelPress={selectImageSourceDialogCancelPressHandler}
    />
  );

  const cameraComponent = (
    <CameraModal
      visible={photoCameraActive}
      imageQuality={noteImageQuality}
      onPhotoAccepted={cameraPhotoAcceptedHandler}
      onClose={cameraCancelHandler}
    />
  );

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: categoryColor,
        },
      ]}>
      <View
        style={[
          styles.noteImagesContainer,
          {height: images && images.length ? 100 : 0},
        ]}>
        {noteImagesComponent}
      </View>
      <View style={styles.noteContentContainer}>
        <NoteTitleField
          title={title}
          textSize={textSize}
          categoryColor={categoryColor}
          onChangeText={noteTitleChangeTextHandler}
          onSubmitEditing={noteTitleSubmitEditingPressHandler}
        />
        <View style={styles.noteContainer}>{noteComponent}</View>
      </View>
      <View
        style={[
          styles.underline,
          {
            backgroundColor: invert(categoryColor, {
              // black: '#80757575',
              black: '#21212144',
              white: '#fafafa66',
            }),
          },
        ]}
      />
      <View style={styles.footerContainer}>
        <View style={styles.reminderContainer}>
          <NoteReminderField
            categoryColor={categoryColor}
            dateInMilliseconds={selectedDateInMilliseconds}
            noteReminderExpired={noteReminderExpired}
            repeatOption={repeatOption}
            onPress={noteReminderPressHandler}
            onRemovePress={removeReminderPressHandler}
          />
        </View>
        <View style={styles.lastUpdateDateContainer}>
          <NoteUpdateDateField
            updateDateTimestamp={updateDateTimestamp}
            categoryColor={categoryColor}
          />
        </View>
      </View>
      {selectCategoryDialogComponent}
      {reminderDialogComponent}
      {imageViewerComponent}
      {removeImageConfirmationDialog}
      {selectImageSourceDialog}
      {cameraComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF59D',
    padding: 8,
  },
  noteImagesContainer: {
    height: 100,
    marginTop: -8,
    marginLeft: -8,
    marginRight: -8,
  },
  noteContentContainer: {
    flex: 1,
  },
  noteContainer: {
    flex: 1,
  },
  underline: {
    height: 1,
    backgroundColor: '#21212166',
    marginBottom: 4,
  },
  footerContainer: {
    height: 60,
  },
  reminderContainer: {
    height: 40,
  },
  lastUpdateDateContainer: {
    height: 20,
  },
});

export default React.memo(NoteView);
