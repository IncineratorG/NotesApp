import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import useTranslation from '../../../../../utils/common/localization';
import RepeatOptionsDialogOptionItem from './option-item/RepeatOptionsDialogOptionItem';
import ReminderRepeatOption from '../../../../../data/common/reminder-repeat-options/ReminderRepeatOptions';
import ReminderTextBuilder from '../../../../../utils/note/reminder-text-builder/ReminderTextBuilder';

const RepeatOptionsDialog = ({
  visible,
  selectedDateObject,
  selectedRepeatOption,
  onOptionSelected,
  onCancel,
}) => {
  const {t} = useTranslation();

  const noRepeatOptionPressHandler = useCallback(() => {
    onOptionSelected({repeatOption: ReminderRepeatOption.NO_REPEAT});
  }, [onOptionSelected]);

  const everyDayOptionPressHandler = useCallback(() => {
    onOptionSelected({repeatOption: ReminderRepeatOption.EVERY_DAY});
  }, [onOptionSelected]);

  const everyWorkDayOptionPressHandler = useCallback(() => {
    onOptionSelected({repeatOption: ReminderRepeatOption.EVERY_WORK_DAY});
  }, [onOptionSelected]);

  const everyWeekAtDayOptionPressHandler = useCallback(() => {
    onOptionSelected({repeatOption: ReminderRepeatOption.EVERY_WEEK_AT_DAY});
  }, [onOptionSelected]);

  const everyTwoWeeksAtDayOptionPressHandler = useCallback(() => {
    onOptionSelected({
      repeatOption: ReminderRepeatOption.EVERY_TWO_WEEKS_AT_DAY,
    });
  }, [onOptionSelected]);

  const everyMonthAtDateOptionPressHandler = useCallback(() => {
    onOptionSelected({
      repeatOption: ReminderRepeatOption.EVERY_MONTH_AT_DATE,
    });
  }, [onOptionSelected]);

  const everyMonthAtLastDayOfMonthOptionPressHandler = useCallback(() => {
    onOptionSelected({
      repeatOption: ReminderRepeatOption.EVERY_MONTH_AT_LAST_DAY_OF_MONTH,
    });
  }, [onOptionSelected]);

  const everyYearOptionPressHandler = useCallback(() => {
    onOptionSelected({
      repeatOption: ReminderRepeatOption.EVERY_YEAR,
    });
  }, [onOptionSelected]);

  const noRepeatOptionComponent = (
    <RepeatOptionsDialogOptionItem
      text={ReminderTextBuilder.repeatText({
        t,
        dateObject: selectedDateObject,
        repeatOption: ReminderRepeatOption.NO_REPEAT,
      })}
      isSelected={selectedRepeatOption === ReminderRepeatOption.NO_REPEAT}
      onPress={noRepeatOptionPressHandler}
    />
  );

  const everyDayOptionComponent = (
    <RepeatOptionsDialogOptionItem
      text={ReminderTextBuilder.repeatText({
        t,
        dateObject: selectedDateObject,
        repeatOption: ReminderRepeatOption.EVERY_DAY,
      })}
      isSelected={selectedRepeatOption === ReminderRepeatOption.EVERY_DAY}
      onPress={everyDayOptionPressHandler}
    />
  );

  const everyWorkDayOptionComponent = (
    <RepeatOptionsDialogOptionItem
      text={ReminderTextBuilder.repeatText({
        t,
        dateObject: selectedDateObject,
        repeatOption: ReminderRepeatOption.EVERY_WORK_DAY,
      })}
      isSelected={selectedRepeatOption === ReminderRepeatOption.EVERY_WORK_DAY}
      onPress={everyWorkDayOptionPressHandler}
    />
  );

  const everyWeekAtDayOptionComponent = (
    <RepeatOptionsDialogOptionItem
      text={ReminderTextBuilder.repeatText({
        t,
        dateObject: selectedDateObject,
        repeatOption: ReminderRepeatOption.EVERY_WEEK_AT_DAY,
      })}
      isSelected={
        selectedRepeatOption === ReminderRepeatOption.EVERY_WEEK_AT_DAY
      }
      onPress={everyWeekAtDayOptionPressHandler}
    />
  );

  const everyTwoWeeksAtDayOptionComponent = (
    <RepeatOptionsDialogOptionItem
      text={ReminderTextBuilder.repeatText({
        t,
        dateObject: selectedDateObject,
        repeatOption: ReminderRepeatOption.EVERY_TWO_WEEKS_AT_DAY,
      })}
      isSelected={
        selectedRepeatOption === ReminderRepeatOption.EVERY_TWO_WEEKS_AT_DAY
      }
      onPress={everyTwoWeeksAtDayOptionPressHandler}
    />
  );

  const everyMonthAtDateOptionComponent = (
    <RepeatOptionsDialogOptionItem
      text={ReminderTextBuilder.repeatText({
        t,
        dateObject: selectedDateObject,
        repeatOption: ReminderRepeatOption.EVERY_MONTH_AT_DATE,
      })}
      isSelected={
        selectedRepeatOption === ReminderRepeatOption.EVERY_MONTH_AT_DATE
      }
      onPress={everyMonthAtDateOptionPressHandler}
    />
  );

  const everyMonthAtLastDayOfMonthOptionComponent = (
    <RepeatOptionsDialogOptionItem
      text={ReminderTextBuilder.repeatText({
        t,
        dateObject: selectedDateObject,
        repeatOption: ReminderRepeatOption.EVERY_MONTH_AT_LAST_DAY_OF_MONTH,
      })}
      isSelected={
        selectedRepeatOption ===
        ReminderRepeatOption.EVERY_MONTH_AT_LAST_DAY_OF_MONTH
      }
      onPress={everyMonthAtLastDayOfMonthOptionPressHandler}
    />
  );

  const everyYearOptionComponent = (
    <RepeatOptionsDialogOptionItem
      text={ReminderTextBuilder.repeatText({
        t,
        dateObject: selectedDateObject,
        repeatOption: ReminderRepeatOption.EVERY_YEAR,
      })}
      isSelected={selectedRepeatOption === ReminderRepeatOption.EVERY_YEAR}
      onPress={everyYearOptionPressHandler}
    />
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            {noRepeatOptionComponent}
            {everyDayOptionComponent}
            {everyWorkDayOptionComponent}
            {everyWeekAtDayOptionComponent}
            {everyTwoWeeksAtDayOptionComponent}
            {everyMonthAtDateOptionComponent}
            {everyMonthAtLastDayOfMonthOptionComponent}
            {everyYearOptionComponent}
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 200,
  },
});

export default React.memo(RepeatOptionsDialog);

// import React, {useCallback, useMemo} from 'react';
// import {View, StyleSheet} from 'react-native';
// import {Dialog, Portal} from 'react-native-paper';
// import useTranslation from '../../../../../utils/common/localization';
// import RepeatOptionsDialogOptionItem from './option-item/RepeatOptionsDialogOptionItem';
// import ReminderRepeatOption from '../../../../../data/common/reminder-repeat-options/ReminderRepeatOptions';
//
// const RepeatOptionsDialog = ({
//   visible,
//   selectedDateObject,
//   selectedRepeatOption,
//   onOptionSelected,
//   onCancel,
// }) => {
//   const {t} = useTranslation();
//
//   const currentWeekDay = t('calendar_fullDayNames')[
//     selectedDateObject.getDay()
//   ].toLowerCase();
//   const currentDate = selectedDateObject.getDate();
//   const currentMonthName = t('calendar_months')[
//     selectedDateObject.getMonth()
//   ].toLowerCase();
//
//   const noRepeatOptionPressHandler = useCallback(() => {
//     onOptionSelected({repeatOption: ReminderRepeatOption.NO_REPEAT});
//   }, [onOptionSelected]);
//
//   const everyDayOptionPressHandler = useCallback(() => {
//     onOptionSelected({repeatOption: ReminderRepeatOption.EVERY_DAY});
//   }, [onOptionSelected]);
//
//   const everyWorkDayOptionPressHandler = useCallback(() => {
//     onOptionSelected({repeatOption: ReminderRepeatOption.EVERY_WORK_DAY});
//   }, [onOptionSelected]);
//
//   const everyWeekAtDayOptionPressHandler = useCallback(() => {
//     onOptionSelected({repeatOption: ReminderRepeatOption.EVERY_WEEK_AT_DAY});
//   }, [onOptionSelected]);
//
//   const everyTwoWeeksAtDayOptionPressHandler = useCallback(() => {
//     onOptionSelected({
//       repeatOption: ReminderRepeatOption.EVERY_TWO_WEEKS_AT_DAY,
//     });
//   }, [onOptionSelected]);
//
//   const everyMonthAtDateOptionPressHandler = useCallback(() => {
//     onOptionSelected({
//       repeatOption: ReminderRepeatOption.EVERY_MONTH_AT_DATE,
//     });
//   }, [onOptionSelected]);
//
//   const everyMonthAtLastDayOfMonthOptionPressHandler = useCallback(() => {
//     onOptionSelected({
//       repeatOption: ReminderRepeatOption.EVERY_MONTH_AT_LAST_DAY_OF_MONTH,
//     });
//   }, [onOptionSelected]);
//
//   const everyYearOptionPressHandler = useCallback(() => {
//     onOptionSelected({
//       repeatOption: ReminderRepeatOption.EVERY_YEAR,
//     });
//   }, [onOptionSelected]);
//
//   const noRepeatOptionComponent = useMemo(() => {
//     return (
//       <RepeatOptionsDialogOptionItem
//         text={t('RepeatOptionDialog_optionNoRepeat')}
//         isSelected={selectedRepeatOption === ReminderRepeatOption.NO_REPEAT}
//         onPress={noRepeatOptionPressHandler}
//       />
//     );
//   }, [selectedRepeatOption, t, noRepeatOptionPressHandler]);
//
//   const everyDayOptionComponent = useMemo(() => {
//     return (
//       <RepeatOptionsDialogOptionItem
//         text={t('RepeatOptionDialog_optionEveryDay')}
//         isSelected={selectedRepeatOption === ReminderRepeatOption.EVERY_DAY}
//         onPress={everyDayOptionPressHandler}
//       />
//     );
//   }, [selectedRepeatOption, t, everyDayOptionPressHandler]);
//
//   const everyWorkDayOptionComponent = useMemo(() => {
//     return (
//       <RepeatOptionsDialogOptionItem
//         text={t('RepeatOptionDialog_optionEveryWorkDay')}
//         isSelected={
//           selectedRepeatOption === ReminderRepeatOption.EVERY_WORK_DAY
//         }
//         onPress={everyWorkDayOptionPressHandler}
//       />
//     );
//   }, [selectedRepeatOption, t, everyWorkDayOptionPressHandler]);
//
//   const everyWeekAtDayOptionComponent = useMemo(() => {
//     return (
//       <RepeatOptionsDialogOptionItem
//         text={
//           t('RepeatOptionDialog_optionEveryWeekAtDay') +
//           ' (' +
//           currentWeekDay +
//           ')'
//         }
//         isSelected={
//           selectedRepeatOption === ReminderRepeatOption.EVERY_WEEK_AT_DAY
//         }
//         onPress={everyWeekAtDayOptionPressHandler}
//       />
//     );
//   }, [
//     selectedRepeatOption,
//     currentWeekDay,
//     t,
//     everyWeekAtDayOptionPressHandler,
//   ]);
//
//   const everyTwoWeeksAtDayOptionComponent = useMemo(() => {
//     return (
//       <RepeatOptionsDialogOptionItem
//         text={
//           t('RepeatOptionDialog_optionEveryTwoWeeksAtDay') +
//           ' (' +
//           currentWeekDay +
//           ')'
//         }
//         isSelected={
//           selectedRepeatOption === ReminderRepeatOption.EVERY_TWO_WEEKS_AT_DAY
//         }
//         onPress={everyTwoWeeksAtDayOptionPressHandler}
//       />
//     );
//   }, [
//     currentWeekDay,
//     selectedRepeatOption,
//     t,
//     everyTwoWeeksAtDayOptionPressHandler,
//   ]);
//
//   const everyMonthAtDateOptionComponent = useMemo(() => {
//     return (
//       <RepeatOptionsDialogOptionItem
//         text={t('RepeatOptionDialog_optionEveryMonthAtDate')(currentDate)}
//         isSelected={
//           selectedRepeatOption === ReminderRepeatOption.EVERY_MONTH_AT_DATE
//         }
//         onPress={everyMonthAtDateOptionPressHandler}
//       />
//     );
//   }, [
//     currentDate,
//     selectedRepeatOption,
//     t,
//     everyMonthAtDateOptionPressHandler,
//   ]);
//
//   const everyMonthAtLastDayOfMonthOptionComponent = useMemo(() => {
//     return (
//       <RepeatOptionsDialogOptionItem
//         text={t('RepeatOptionDialog_optionEveryMonthAtLastDayOfMonth')}
//         isSelected={
//           selectedRepeatOption ===
//           ReminderRepeatOption.EVERY_MONTH_AT_LAST_DAY_OF_MONTH
//         }
//         onPress={everyMonthAtLastDayOfMonthOptionPressHandler}
//       />
//     );
//   }, [selectedRepeatOption, t, everyMonthAtLastDayOfMonthOptionPressHandler]);
//
//   const everyYearOptionComponent = useMemo(() => {
//     return (
//       <RepeatOptionsDialogOptionItem
//         text={
//           t('RepeatOptionDialog_optionEveryYear') +
//           ' (' +
//           currentDate +
//           ' ' +
//           currentMonthName +
//           ')'
//         }
//         isSelected={selectedRepeatOption === ReminderRepeatOption.EVERY_YEAR}
//         onPress={everyYearOptionPressHandler}
//       />
//     );
//   }, [
//     currentDate,
//     currentMonthName,
//     selectedRepeatOption,
//     t,
//     everyYearOptionPressHandler,
//   ]);
//
//   return (
//     <Portal>
//       <Dialog visible={visible} onDismiss={onCancel}>
//         <Dialog.Content>
//           <View style={styles.mainContainer}>
//             {noRepeatOptionComponent}
//             {everyDayOptionComponent}
//             {everyWorkDayOptionComponent}
//             {everyWeekAtDayOptionComponent}
//             {everyTwoWeeksAtDayOptionComponent}
//             {everyMonthAtDateOptionComponent}
//             {everyMonthAtLastDayOfMonthOptionComponent}
//             {everyYearOptionComponent}
//           </View>
//         </Dialog.Content>
//       </Dialog>
//     </Portal>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     minHeight: 200,
//   },
// });
//
// export default React.memo(RepeatOptionsDialog);
