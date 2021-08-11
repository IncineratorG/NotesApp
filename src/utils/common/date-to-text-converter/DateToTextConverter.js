const DateToTextConverter = () => {
  const toText = ({t, dateObject}) => {
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

  const toTextWithInfo = ({t, dateObject}) => {
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
    let isToday = false;
    let isTomorrow = false;
    let isYesterday = false;

    if (passedDateYear !== todayDateYear) {
      needShowYear = true;
    } else if (
      passedDateMonth === yesterdayDateMonth &&
      passedDateDate === yesterdayDateDate
    ) {
      dateString = t('calendar_yesterday') + ', ';
      isYesterday = true;
    } else if (
      passedDateMonth === todayDateMonth &&
      passedDateDate === todayDateDate
    ) {
      dateString = t('calendar_today') + ', ';
      isToday = true;
    } else if (
      passedDateMonth === tomorrowDateMonth &&
      passedDateDate === tomorrowDateDate
    ) {
      dateString = t('calendar_tomorrow') + ', ';
      isTomorrow = true;
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

    return {
      dateString,
      isToday,
      isTomorrow,
      isYesterday,
    };
  };

  return {
    toText,
    toTextWithInfo,
  };
};

export default DateToTextConverter();
