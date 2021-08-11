import React, {useCallback} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';
import VaultedNoteView from './views/VaultedNoteView';
import useVaultedNoteModel from './models/useVaultedNoteModel';
import useVaultedNoteRootController from './controllers/useVaultedNoteRootController';
import AppStyles from '../../assets/styles/AppStyles';
import {useFocusEffect} from '@react-navigation/core';
import VaultedNoteTextTypeMenu from '../../components/specific/vaulted-note/vaulted-note-text-type-menu/VaultedNoteTextTypeMenu';
import VaultedNoteListTypeMenu from '../../components/specific/vaulted-note/vaulted-note-list-type-menu/VaultedNoteListTypeMenu';
import VaultedNoteSelectTextSizeDialog from '../../components/specific/vaulted-note/select-text-size-dialog/VaultedNoteSelectTextSizeDialog';
import VaultedNoteSendNoteDialog from '../../components/specific/vaulted-note/send-note-dialog/VaulteNoteSendNoteDialog';
import VaultedNoteHeaderButtons from '../../components/specific/vaulted-note/header-buttons/VaultedNoteHeaderButtons';
import VaultedNoteRemoveNoteConfirmationDialog from '../../components/specific/vaulted-note/remove-note-confirmation-dialog/VaultedNoteRemoveNoteConfirmationDialog';
import {HeaderBackButton} from '@react-navigation/stack';
import UnlockVaultView from '../../components/common/unlock-vault-view/UnlockVaultView';

const VaultedNote = () => {
  const model = useVaultedNoteModel();
  const controller = useVaultedNoteRootController(model);

  const {
    navigation,
    data: {
      noteMenuVisible,
      shareServiceAvailabilityMap,
      vaultPassword,
      vaultLocked,
      localState: {
        note: {isList, textSize, moveCheckedToBottom},
        selectTextSizeDialog: {visible: selectTextSizeDialogVisible},
        sendNoteDialog: {visible: sendNoteDialogVisible},
        removeNoteConfirmationDialog: {
          visible: removeNoteConfirmationDialogVisible,
        },
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
    removeNoteConfirmationDialogController: {
      removeNoteConfirmationDialogCancelHandler,
      removeNoteConfirmationDialogRemoveHandler,
    },
    noteController: {backButtonPressHandler},
    unlockingVaultDialogController: {
      unlockingVaultDialogCancelPressHandler,
      unlockingVaultDialogCorrectPasswordEnteredHandler,
    },
  } = controller;

  const noteTextTypeMenu = (
    <VaultedNoteTextTypeMenu
      visible={noteMenuVisible}
      textSize={textSize}
      onTextSizePressed={headerMenuTextSizePressHandler}
      onSendPressed={headerMenuSendNotePressHandler}
      onRemovePressed={headerMenuRemoveNotePressHandler}
      onUndoPressed={headerMenuUndoPressHandler}
      onClose={menuCloseHandler}
    />
  );
  const noteListTypeMenu = (
    <VaultedNoteListTypeMenu
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
  const menu = isList ? noteListTypeMenu : noteTextTypeMenu;

  const selectTextSizeDialogComponent = (
    <VaultedNoteSelectTextSizeDialog
      visible={selectTextSizeDialogVisible}
      currentTextSizeType={textSize}
      onTextSizeTypeSelect={selectTextSizeDialogSelectTextSizeHandler}
      onCancel={selectTextSizeDialogCancelHandler}
    />
  );

  const sendNoteDialogComponent = (
    <VaultedNoteSendNoteDialog
      visible={sendNoteDialogVisible}
      shareServiceAvailabilityMap={shareServiceAvailabilityMap}
      onSendOptionPress={sendNoteDialogShareNoteViaAppHandler}
      onCancel={sendNoteDialogCancelHandler}
    />
  );

  const removeNoteConfirmationDialog = (
    <VaultedNoteRemoveNoteConfirmationDialog
      visible={removeNoteConfirmationDialogVisible}
      onRemove={removeNoteConfirmationDialogRemoveHandler}
      onCancel={removeNoteConfirmationDialogCancelHandler}
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
          <VaultedNoteHeaderButtons
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
      headerLeft: props => {
        return <HeaderBackButton {...props} onPress={backButtonPressHandler} />;
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
    backButtonPressHandler,
  ]);
  useFocusEffect(() => {
    setScreenHeaderBar();
  });

  const setBackButtonPressHandler = useCallback(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backButtonPressHandler,
    );

    return () => {
      backHandler.remove();
    };
  }, [backButtonPressHandler]);
  useFocusEffect(setBackButtonPressHandler);

  if (vaultLocked) {
    return (
      <UnlockVaultView
        password={vaultPassword}
        resetPasswordOptionEnabled={false}
        onCorrectPasswordEntered={
          unlockingVaultDialogCorrectPasswordEnteredHandler
        }
        onResetPasswordPress={null}
        onCancelPress={unlockingVaultDialogCancelPressHandler}
      />
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <VaultedNoteView model={model} controller={controller} />
        {selectTextSizeDialogComponent}
        {sendNoteDialogComponent}
        {removeNoteConfirmationDialog}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default React.memo(VaultedNote);
