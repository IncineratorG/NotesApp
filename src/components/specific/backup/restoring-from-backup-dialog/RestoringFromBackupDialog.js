// import React, {useEffect} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {Button, Dialog, Portal} from 'react-native-paper';
// import useTranslation from '../../../../utils/common/localization';
// import Icon from 'react-native-vector-icons/Feather';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// import {Animated, Easing} from 'react-native';
// import {useCallback, useRef} from 'react';
// import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
//
// const RestoringFromBackupDialog = ({visible, progressText, onCancelPress}) => {
//   const {t} = useTranslation();
//
//   let spinValue = useRef(new Animated.Value(0)).current;
//
//   // First set up animation
//   // Animated.loop(
//   //   Animated.timing(spinValue, {
//   //     toValue: 1,
//   //     duration: 200,
//   //     easing: Easing.linear,
//   //     useNativeDriver: true,
//   //   }),
//   // ).start();\
//
//   // ===
//   Animated.loop(
//     Animated.sequence([
//       Animated.delay(100),
//       Animated.timing(spinValue, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(spinValue, {
//         toValue: 0,
//         duration: 0,
//         useNativeDriver: true,
//       }),
//     ]),
//     {},
//   ).start();
//   // ===
//
//   // Next, interpolate beginning and end values (in this case 0 and 1)
//   const spin = spinValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '360deg'],
//   });
//
//   // const animatedValue = useRef(new Animated.Value(0)).current;
//   // const animatedAngleValue = animatedValue.interpolate({
//   //   inputRange: [0, 1],
//   //   outputRange: ['0deg', '360deg'],
//   // });
//   //
//   // const animationHandler = useCallback(() => {
//   //   Animated.timing(animatedValue, {
//   //     toValue: 1,
//   //     useNativeDriver: true,
//   //   }).start();
//   //
//   //   return {
//   //     transform: [
//   //       {
//   //         rotate: animatedAngleValue,
//   //       },
//   //     ],
//   //   };
//   // }, [animatedAngleValue, animatedValue]);
//
//   //{transform: [{rotate: spin}]}
//
//   return (
//     <Portal>
//       <Dialog visible={visible} dismissable={false} onDismiss={onCancelPress}>
//         <Dialog.Title>{t('RestoringFromBackupDialog_title')}</Dialog.Title>
//         <Dialog.Content>
//           <View style={styles.mainContainer}>
//             <Animated.View
//               style={[styles.iconContainer, {transform: [{rotate: spin}]}]}>
//               <Icon name="loader" size={24} color={'grey'} />
//             </Animated.View>
//             <View style={styles.messageContainer}>
//               <Text style={{fontSize: 16}}>{progressText}</Text>
//             </View>
//           </View>
//         </Dialog.Content>
//         <Dialog.Actions>
//           <Button onPress={onCancelPress}>
//             {t('RestoringFromBackupDialog_cancelButton')}
//           </Button>
//         </Dialog.Actions>
//       </Dialog>
//     </Portal>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     height: 75,
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   iconContainer: {
//     width: 50,
//     alignSelf: 'stretch',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   messageContainer: {
//     flex: 1,
//     alignSelf: 'stretch',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
//
// export default React.memo(RestoringFromBackupDialog);

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import Icon from 'react-native-vector-icons/Feather';
import AppStyles from '../../../../assets/styles/AppStyles';

const RestoringFromBackupDialog = ({visible, progressText, onCancelPress}) => {
  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} dismissable={false} onDismiss={onCancelPress}>
        <Dialog.Title>{t('RestoringFromBackupDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <View style={styles.iconContainer}>
              <Icon name="loader" size={24} color={'grey'} />
            </View>
            <View style={styles.messageContainer}>
              <Text style={{fontSize: AppStyles.dialogMessageFontSize}}>
                {progressText}
              </Text>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancelPress}>
            {t('RestoringFromBackupDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 75,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    width: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(RestoringFromBackupDialog);
