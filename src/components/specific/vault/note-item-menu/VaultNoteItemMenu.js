import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import useTranslation from '../../../../utils/common/localization';
import {Text, View} from 'react-native';

const VaultNoteItemMenu = ({
  visible,
  onRemovePress,
  onMoveFromVault,
  onClose,
}) => {
  const {t} = useTranslation();

  const moveFromVaultOptionComponent = (
    <View
      style={{
        height: 40,
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          paddingLeft: 4,
        }}>
        <Text>{t('VaultNoteItemMenu_fromVaultOption')}</Text>
      </View>
    </View>
  );

  const removeOptionComponent = (
    <View
      style={{
        height: 40,
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          paddingLeft: 4,
        }}>
        <Text>{t('VaultNoteItemMenu_removeOption')}</Text>
      </View>
    </View>
  );

  return (
    <Menu opened={visible} onBackdropPress={onClose}>
      <MenuTrigger text="" />
      <MenuOptions>
        <MenuOption
          children={moveFromVaultOptionComponent}
          onSelect={onMoveFromVault}
        />
        <MenuOption children={removeOptionComponent} onSelect={onRemovePress} />
      </MenuOptions>
    </Menu>
  );
};

export default React.memo(VaultNoteItemMenu);
