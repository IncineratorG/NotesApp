import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import DefaultNotesListBehaviorDialogItem from './item/DefaultNotesListBehaviorDialogItem';

const DefaultNotesListBehaviorDialog = ({
  visible,
  moveCheckedToBottom,
  onMoveCheckedToBottomChanged,
  onCancel,
}) => {
  const {t} = useTranslation();

  const moveCheckedToBottomOptionPressHandler = useCallback(() => {
    onMoveCheckedToBottomChanged({moveCheckedToBottom: true});
  }, [onMoveCheckedToBottomChanged]);

  const dontMoveCheckedToBottomOptionPressHandler = useCallback(() => {
    onMoveCheckedToBottomChanged({moveCheckedToBottom: false});
  }, [onMoveCheckedToBottomChanged]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{t('DefaultNotesListBehaviorDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <DefaultNotesListBehaviorDialogItem
              text={t('DefaultNotesListBehaviorDialog_dontMoveCheckedToBottom')}
              isSelected={!moveCheckedToBottom}
              onPress={dontMoveCheckedToBottomOptionPressHandler}
            />
            <DefaultNotesListBehaviorDialogItem
              text={t('DefaultNotesListBehaviorDialog_moveCheckedToBottom')}
              isSelected={moveCheckedToBottom}
              onPress={moveCheckedToBottomOptionPressHandler}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>
            {t('DefaultNotesListBehaviorDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 120,
  },
});

export default React.memo(DefaultNotesListBehaviorDialog);
