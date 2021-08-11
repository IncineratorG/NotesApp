import React, {useCallback} from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import SortOptionsMenuItem from './item/SortOptionsMenuItem';
import useTranslation from '../../../../utils/common/localization';
import NotesListSortTypes from '../../../../data/common/notes-list-sort-types/NotesListSortTypes';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const SortOptionsMenu = ({
  visible,
  selectedSortOption,
  groupByCategories,
  useCompactView,
  onSortManuallyPressed,
  onSortAlphabeticallyPressed,
  onSortByLastUpdatePressed,
  onSortByCreationDatePressed,
  onSortByReminderDatePressed,
  onGroupByCategoriesPressed,
  onCompactViewPressed,
  onClose,
}) => {
  const {t} = useTranslation();

  const sortManuallyPressHandler = useCallback(() => {
    if (onSortManuallyPressed) {
      onSortManuallyPressed();
    }
    // return true;
  }, [onSortManuallyPressed]);

  const sortAlphabeticallyPressHandler = useCallback(() => {
    if (onSortAlphabeticallyPressed) {
      onSortAlphabeticallyPressed();
    }
    // return true;
  }, [onSortAlphabeticallyPressed]);

  const sortByLastUpdatePressHandler = useCallback(() => {
    if (onSortByLastUpdatePressed) {
      onSortByLastUpdatePressed();
    }
    // return true;
  }, [onSortByLastUpdatePressed]);

  const sortByCreationDatePressHandler = useCallback(() => {
    if (onSortByCreationDatePressed) {
      onSortByCreationDatePressed();
    }
    // return true;
  }, [onSortByCreationDatePressed]);

  const sortByReminderDatePressHandler = useCallback(() => {
    if (onSortByReminderDatePressed) {
      onSortByReminderDatePressed();
    }
  }, [onSortByReminderDatePressed]);

  const groupByCategoriesPressHandler = useCallback(() => {
    // SystemEventsHandler.onInfo({info: 'HERE'});

    if (onGroupByCategoriesPressed) {
      onGroupByCategoriesPressed();
    }
    // return true;
  }, [onGroupByCategoriesPressed]);

  const compactViewPressHandler = useCallback(() => {
    if (onCompactViewPressed) {
      onCompactViewPressed();
    }
    // return true;
  }, [onCompactViewPressed]);

  const sortManuallyOptionComponent = (
    <SortOptionsMenuItem
      text={t('SortOptionMenu_sortManually')}
      type={'radio'}
      checked={selectedSortOption === NotesListSortTypes.MANUAL}
      active={true}
    />
  );
  const sortAlphabeticallyOptionComponent = (
    <SortOptionsMenuItem
      text={t('SortOptionMenu_sortAlphabetically')}
      type={'radio'}
      checked={selectedSortOption === NotesListSortTypes.ALPHABETICAL}
      active={true}
    />
  );
  const sortByLastUpdateOptionComponent = (
    <SortOptionsMenuItem
      text={t('SortOptionMenu_sortByLastUpdate')}
      type={'radio'}
      checked={selectedSortOption === NotesListSortTypes.LAST_UPDATE_DATE}
      active={true}
    />
  );
  const sortByCreationDateOptionComponent = (
    <SortOptionsMenuItem
      text={t('SortOptionMenu_sortByCreationDate')}
      type={'radio'}
      checked={selectedSortOption === NotesListSortTypes.CREATION_DATE}
      active={true}
    />
  );
  // ===
  // =====
  const sortByReminderDateOptionComponent = (
    <SortOptionsMenuItem
      text={t('SortOptionMenu_sortByReminderDate')}
      type={'radio'}
      checked={selectedSortOption === NotesListSortTypes.REMINDER_DATE}
      active={true}
    />
  );
  // =====
  // ===
  const groupByCategoriesOptionComponent = (
    <SortOptionsMenuItem
      text={t('SortOptionMenu_groupByCategories')}
      type={'checkbox'}
      checked={groupByCategories}
      active={selectedSortOption !== NotesListSortTypes.MANUAL}
    />
  );
  const compactViewOptionComponent = (
    <SortOptionsMenuItem
      text={t('SortOptionMenu_compactView')}
      type={'checkbox'}
      checked={useCompactView}
      active={true}
    />
  );

  return (
    <Menu opened={visible} onBackdropPress={onClose}>
      <MenuTrigger text="" />
      <MenuOptions optionsContainerStyle={{width: 270}}>
        <MenuOption
          disableTouchable={false}
          children={sortManuallyOptionComponent}
          onSelect={sortManuallyPressHandler}
        />
        <MenuOption
          disableTouchable={false}
          children={sortAlphabeticallyOptionComponent}
          onSelect={sortAlphabeticallyPressHandler}
        />
        <MenuOption
          disableTouchable={false}
          children={sortByLastUpdateOptionComponent}
          onSelect={sortByLastUpdatePressHandler}
        />
        <MenuOption
          disableTouchable={false}
          children={sortByCreationDateOptionComponent}
          onSelect={sortByCreationDatePressHandler}
        />
        <MenuOption
          disableTouchable={false}
          children={sortByReminderDateOptionComponent}
          onSelect={sortByReminderDatePressHandler}
        />
        <MenuOption
          disableTouchable={false}
          disabled={selectedSortOption === NotesListSortTypes.MANUAL}
          children={groupByCategoriesOptionComponent}
          onSelect={groupByCategoriesPressHandler}
        />
        <MenuOption
          disableTouchable={false}
          children={compactViewOptionComponent}
          onSelect={compactViewPressHandler}
        />
      </MenuOptions>
    </Menu>
  );
};

export default React.memo(SortOptionsMenu);
