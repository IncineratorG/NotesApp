import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import NoteView from './views/NoteView';
import {useFocusEffect} from '@react-navigation/native';
import useNoteModel from './models/useNoteModel';
import useNoteRootController from './controllers/useNoteRootController';
import AppStyles from '../../assets/styles/AppStyles';
import HeaderButtonsContainer from '../../components/specific/note/header-buttons-container/HeaderButtonsContainer';
import NoteTextTypeMenu from '../../components/specific/note/note-text-type-menu/NoteTextTypeMenu';
import NoteListTypeMenu from '../../components/specific/note/note-list-type-menu/NoteListTypeMenu';
import SelectTextSizeDialog from '../../components/specific/note/select-text-size-dialog/SelectTextSizeDialog';
import SendNoteDialog from '../../components/specific/note/send-note-dialog/SendNoteDialog';

const Note = () => {
  const model = useNoteModel();
  const controller = useNoteRootController(model);

  const {
    navigation,
    data: {
      noteMenuVisible,
      shareServiceAvailabilityMap,
      localState: {
        note: {isList, textSize, moveCheckedToBottom},
        selectTextSizeDialog: {visible: selectTextSizeDialogVisible},
        sendNoteDialog: {visible: sendNoteDialogVisible},
      },
    },
  } = model;

  const {
    headerController: {
      changeNoteTypePressHandler,
      changeCategoryPressHandler,
      clipToStatusBarPressHandler,
      pickImagePressHandler,
      menuPressHandler,
      menuCloseHandler,
    },
    headerMenuController: {
      headerMenuTextSizePressHandler,
      headerMenuSendNotePressHandler,
      headerMenuRemoveNotePressHandler,
      headerMenuUndoPressHandler,
      headerMenuSortItemsAlphabeticallyPressHandler,
      headerMenuUnselectAllPressHandler,
      headerMenuRemoveSelectedItemsPressHandler,
      headerMenuChangeMoveCheckedToBottomPressHandler,
    },
    selectTextSizeDialogController: {
      selectTextSizeDialogCancelHandler,
      selectTextSizeDialogSelectTextSizeHandler,
    },
    sendNoteDialogController: {
      sendNoteDialogCancelHandler,
      sendNoteDialogShareNoteViaAppHandler,
    },
  } = controller;

  const noteTextTypeMenu = useMemo(() => {
    return (
      <NoteTextTypeMenu
        visible={noteMenuVisible}
        textSize={textSize}
        onTextSizePressed={headerMenuTextSizePressHandler}
        onSendPressed={headerMenuSendNotePressHandler}
        onRemovePressed={headerMenuRemoveNotePressHandler}
        onUndoPressed={headerMenuUndoPressHandler}
        onClose={menuCloseHandler}
      />
    );
  }, [
    noteMenuVisible,
    textSize,
    menuCloseHandler,
    headerMenuTextSizePressHandler,
    headerMenuSendNotePressHandler,
    headerMenuRemoveNotePressHandler,
    headerMenuUndoPressHandler,
  ]);
  const noteListTypeMenu = useMemo(() => {
    return (
      <NoteListTypeMenu
        visible={noteMenuVisible}
        textSize={textSize}
        moveSelectedToBottom={moveCheckedToBottom}
        onTextSizePressed={headerMenuTextSizePressHandler}
        onSendPressed={headerMenuSendNotePressHandler}
        onRemovePressed={headerMenuRemoveNotePressHandler}
        onUndoPressed={headerMenuUndoPressHandler}
        onSortAlphabeticallyPressed={
          headerMenuSortItemsAlphabeticallyPressHandler
        }
        onUnselectAllPressed={headerMenuUnselectAllPressHandler}
        onRemoveSelectedItemsPressed={headerMenuRemoveSelectedItemsPressHandler}
        onMoveSelectedToBottomPressed={
          headerMenuChangeMoveCheckedToBottomPressHandler
        }
        onClose={menuCloseHandler}
      />
    );
  }, [
    noteMenuVisible,
    textSize,
    menuCloseHandler,
    moveCheckedToBottom,
    headerMenuTextSizePressHandler,
    headerMenuSendNotePressHandler,
    headerMenuRemoveNotePressHandler,
    headerMenuUndoPressHandler,
    headerMenuSortItemsAlphabeticallyPressHandler,
    headerMenuUnselectAllPressHandler,
    headerMenuRemoveSelectedItemsPressHandler,
    headerMenuChangeMoveCheckedToBottomPressHandler,
  ]);
  const menu = useMemo(() => {
    return isList ? noteListTypeMenu : noteTextTypeMenu;
  }, [isList, noteListTypeMenu, noteTextTypeMenu]);

  const selectTextSizeDialogComponent = (
    <SelectTextSizeDialog
      visible={selectTextSizeDialogVisible}
      currentTextSizeType={textSize}
      onTextSizeTypeSelect={selectTextSizeDialogSelectTextSizeHandler}
      onCancel={selectTextSizeDialogCancelHandler}
    />
  );

  const sendNoteDialogComponent = (
    <SendNoteDialog
      visible={sendNoteDialogVisible}
      shareServiceAvailabilityMap={shareServiceAvailabilityMap}
      onSendOptionPress={sendNoteDialogShareNoteViaAppHandler}
      onCancel={sendNoteDialogCancelHandler}
    />
  );

  const setScreenHeaderBar = useCallback(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: AppStyles.headerColor,
      },
      headerTintColor: AppStyles.headerTextColor,
      headerRight: props => {
        return (
          <HeaderButtonsContainer
            noteIsList={isList}
            noteMenu={menu}
            onChangeNoteTypePress={changeNoteTypePressHandler}
            onChangeCategoryPress={changeCategoryPressHandler}
            onClipToStatusBarPress={clipToStatusBarPressHandler}
            onPickImagePress={pickImagePressHandler}
            onMenuPress={menuPressHandler}
          />
        );
      },
    });
  }, [
    menu,
    isList,
    navigation,
    changeNoteTypePressHandler,
    changeCategoryPressHandler,
    clipToStatusBarPressHandler,
    pickImagePressHandler,
    menuPressHandler,
  ]);
  useFocusEffect(() => {
    setScreenHeaderBar();
  });

  return (
    <View style={styles.mainContainer}>
      <NoteView model={model} controller={controller} />
      {selectTextSizeDialogComponent}
      {sendNoteDialogComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default React.memo(Note);
