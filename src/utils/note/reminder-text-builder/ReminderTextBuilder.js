import ReminderRepeatOption from '../../../data/common/reminder-repeat-options/ReminderRepeatOptions';

const ReminderTextBuilder = () => {
  const reminderText = ({t, dateObject}) => {
    const passedDateYear = dateObject.getFullYear();
    const passedDateMonth = dateObject.getMonth();
    const passedDateDate = dateObject.getDate();

    const todayDateObject = new Date();
    const todayDateYear = todayDateObject.getFullYear();
    const todayDateMonth = todayDateObject.getMonth();
    const todayDateDate = todayDateObject.getDate();

    const yesterdayDateObject = new Date(todayDateObject);
    yesterdayDateObject.setDate(yesterdayDateObject.getDate() - 1);
    const yesterdayDateMonth = yesterdayDateObject.getMonth();
    const yesterdayDateDate = yesterdayDateObject.getDate();

    const tomorrowDateObject = new Date(todayDateObject);
    tomorrowDateObject.setDate(tomorrowDateObject.getDate() + 1);
    const tomorrowDateMonth = tomorrowDateObject.getMonth();
    const tomorrowDateDate = tomorrowDateObject.getDate();

    let needShowYear = false;

    let dateString = '';

    if (passedDateYear !== todayDateYear) {
      needShowYear = true;
    } else if (
      passedDateMonth === yesterdayDateMonth &&
      passedDateDate === yesterdayDateDate
    ) {
      dateString = t('calendar_yesterday') + ', ';
    } else if (
      passedDateMonth === todayDateMonth &&
      passedDateDate === todayDateDate
    ) {
      dateString = t('calendar_today') + ', ';
    } else if (
      passedDateMonth === tomorrowDateMonth &&
      passedDateDate === tomorrowDateDate
    ) {
      dateString = t('calendar_tomorrow') + ', ';
    }

    if (dateString.length <= 0) {
      dateString =
        t('calendar_days')[dateObject.getDay()] +
        ', ' +
        dateObject.getDate() +
        ' ' +
        t('calendar_months')[dateObject.getMonth()] +
        ', ';
    }

    dateString =
      dateString +
      dateObject.getHours() +
      ':' +
      (dateObject.getMinutes() < 10
        ? '0' + dateObject.getMinutes().toString()
        : dateObject.getMinutes());

    if (needShowYear) {
      dateString =
        dateString +
        ', ' +
        dateObject.getFullYear() +
        ' ' +
        t('calendar_year_short') +
        '.';
    }

    return dateString;
  };

  // const reminderText = ({t, dateObject}) => {
  //   // SystemEventsHandler.onInfo({info: 'ReminderTextBuilder->reminderText()'});
  //
  //   return (
  //     t('calendar_days')[dateObject.getDay()] +
  //     ', ' +
  //     dateObject.getDate() +
  //     ' ' +
  //     t('calendar_months')[dateObject.getMonth()] +
  //     ', ' +
  //     dateObject.getHours() +
  //     ':' +
  //     (dateObject.getMinutes() < 10
  //       ? '0' + dateObject.getMinutes().toString()
  //       : dateObject.getMinutes())
  //   );
  // };

  const repeatText = ({t, dateObject, repeatOption}) => {
    switch (repeatOption) {
      case ReminderRepeatOption.NO_REPEAT: {
        return t('RepeatOptionDialog_optionNoRepeat');
      }

      case ReminderRepeatOption.EVERY_DAY: {
        return t('RepeatOptionDialog_optionEveryDay');
      }

      case ReminderRepeatOption.EVERY_WORK_DAY: {
        return t('RepeatOptionDialog_optionEveryWorkDay');
      }

      case ReminderRepeatOption.EVERY_WEEK_AT_DAY: {
        return (
          t('RepeatOptionDialog_optionEveryWeekAtDay') +
          ' (' +
          t('calendar_fullDayNames')[dateObject.getDay()].toLowerCase() +
          ')'
        );
      }

      case ReminderRepeatOption.EVERY_TWO_WEEKS_AT_DAY: {
        return (
          t('RepeatOptionDialog_optionEveryTwoWeeksAtDay') +
          ' (' +
          t('calendar_fullDayNames')[dateObject.getDay()].toLowerCase() +
          ')'
        );
      }

      case ReminderRepeatOption.EVERY_MONTH_AT_DATE: {
        return t('RepeatOptionDialog_optionEveryMonthAtDate')(
          dateObject.getDate(),
        );
      }

      case ReminderRepeatOption.EVERY_MONTH_AT_LAST_DAY_OF_MONTH: {
        return t('RepeatOptionDialog_optionEveryMonthAtLastDayOfMonth');
      }

      case ReminderRepeatOption.EVERY_YEAR: {
        return (
          t('RepeatOptionDialog_optionEveryYear') +
          ' (' +
          dateObject.getDate() +
          ' ' +
          t('calendar_months')[dateObject.getMonth()].toLowerCase() +
          ')'
        );
      }
    }
  };

  return {
    repeatText,
    reminderText,
  };
};

export default ReminderTextBuilder();
