import React, {useState, useEffect} from 'react';
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppStyles from '../../../../assets/styles/AppStyles';
import NotesListSortTypes from '../../../../data/common/notes-list-sort-types/NotesListSortTypes';

const NotesListHeaderRightButtons = ({
  optionsMenuComponent,
  sortType,
  searchIconVisible,
  onSortOptionsPress,
  onSearchPress,
}) => {
  const [subIconComponent, setSubIconComponent] = useState(null);

  const searchIconComponent = searchIconVisible ? (
    <TouchableNativeFeedback onPress={onSearchPress}>
      <View style={styles.searchIconContainer}>
        <MaterialIcon name="search" size={24} color="white" />
      </View>
    </TouchableNativeFeedback>
  ) : null;

  useEffect(() => {
    SystemEventsHandler.onInfo({
      info: 'NotesListHeaderRightButtons->SORT_TYPE: ' + sortType,
    });

    switch (sortType) {
      case NotesListSortTypes.MANUAL: {
        setSubIconComponent(null);
        break;
      }

      case NotesListSortTypes.ALPHABETICAL: {
        setSubIconComponent(
          <View style={styles.subIconContainer}>
            <MaterialIcon name="sort-by-alpha" size={16} color="white" />
          </View>,
        );
        break;
      }

      case NotesListSortTypes.LAST_UPDATE_DATE: {
        setSubIconComponent(
          <View style={styles.subIconContainer}>
            <MaterialIcon name="edit" size={16} color="white" />
          </View>,
        );
        break;
      }

      case NotesListSortTypes.CREATION_DATE: {
        setSubIconComponent(
          <View style={styles.subIconContainer}>
            <MaterialIcon name="add-circle" size={16} color="white" />
          </View>,
        );
        break;
      }

      case NotesListSortTypes.REMINDER_DATE: {
        setSubIconComponent(
          <View style={styles.subIconContainer}>
            <MaterialIcon name="notifications" size={16} color="white" />
          </View>,
        );
        break;
      }

      default: {
        setSubIconComponent(null);
      }
    }
  }, [sortType]);

  return (
    <View style={[styles.mainContainer, {width: searchIconVisible ? 100 : 50}]}>
      {searchIconComponent}
      <TouchableNativeFeedback onPress={onSortOptionsPress}>
        <View style={styles.sortIconContainer}>
          <MaterialIcon name="sort" size={24} color="white" />
          {subIconComponent}
          {optionsMenuComponent}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortIconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subIconContainer: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: AppStyles.headerColor,
  },
});

export default React.memo(NotesListHeaderRightButtons);
