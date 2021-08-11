import React, {useMemo} from 'react';
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import NotesListSortTypes from '../../../../data/common/notes-list-sort-types/NotesListSortTypes';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SortOptionsButton = ({optionsMenuComponent, sortType, onPress}) => {
  // const icon = useMemo(() => {
  //   switch (sortType) {
  //     case NotesListSortTypes.MANUAL: {
  //       return <MaterialIcon name="sort" size={24} color="white" />;
  //     }
  //
  //     case NotesListSortTypes.ALPHABETICAL: {
  //       return (
  //         <MaterialCommunityIcon
  //           name="sort-alphabetical-ascending"
  //           size={24}
  //           color="white"
  //         />
  //       );
  //     }
  //
  //     case NotesListSortTypes.LAST_UPDATE_DATE: {
  //       return <MaterialIcon name="pending-actions" size={24} color="white" />;
  //     }
  //
  //     case NotesListSortTypes.CREATION_DATE: {
  //       return <MaterialIcon name="more-time" size={24} color="white" />;
  //     }
  //
  //     default: {
  //       return <MaterialIcon name="sort" size={24} color="white" />;
  //     }
  //   }
  // }, [sortType]);

  return (
    <View style={styles.mainContainer}>
      {optionsMenuComponent}
      <TouchableNativeFeedback style={styles.iconTouchable} onPress={onPress}>
        <View style={styles.iconContainer}>
          <MaterialIcon name="sort" size={24} color="white" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    transform: [{scale: 0.6}],
  },
});

export default React.memo(SortOptionsButton);
