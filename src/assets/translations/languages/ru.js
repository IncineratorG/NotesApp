const ru = {
  NoteList_screenTitle: 'Все заметки',

  calendar_yesterday: 'Вчера',
  calendar_today: 'Сегодня',
  calendar_tomorrow: 'Завтра',
  calendar_year_short: 'г',
  calendar_days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  calendar_months: [
    'Янв.',
    'Фев.',
    'Мрт.',
    'Апр.',
    'Май',
    'Июн.',
    'Июл.',
    'Авг.',
    'Сен.',
    'Окт.',
    'Нбр.',
    'Дек.',
  ],
  calendar_fullDayNames: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],

  categories_common: 'Общее',
  categories_buyings: 'Покупки',
  categories_important: 'Важное',
  categories_work: 'Работа',
  categories_personal: 'Личное',

  tinyTextSize: 'Крошечный',
  smallTextSize: 'Маленький',
  normalTextSize: 'Нормальный',
  largeTextSize: 'Большой',
  hugeTextSize: 'Огромный',

  originalImageQuality: 'Исходное',
  goodImageQuality: 'Хорошее',
  averageImageQuality: 'Среднее',
  lowImageQuality: 'Низкое',
  veryLowImageQuality: 'Очень низкое',

  sms: 'SMS',
  whatsApp: 'WhatsApp',
  telegram: 'Telegram',

  backupSizeUnitKb: 'КБ',
  backupSizeUnitMb: 'Мб',

  // progressStageDefault: 'Создание резервной копии',
  progressStageDefault: '',
  progressStagePreparingData: 'Подготовка данных',
  progressStageSavingAppSettings: 'Сохранение настроек приложения',
  progressStageSavingNotesText: 'Сохранение заметок',
  progressStageSavingNotesImages: 'Сохранение изображений',
  progressStagePreparingBackupData: 'Подготовка данных',
  progressStageRestoringAppSettings: 'Восстановление настроек приложения',
  progressStageRestoringNotesText: 'Восстановление заметок',
  progressStageRestoringNotesImages: 'Восстановление изображений',
  progressStageRestoringFinishing: 'Завершение',
  progressStageFromSentencePart: 'из',

  DrawerMenu_appName: 'Notes',
  DrawerMenu_allNotesCategory: 'Все заметки',
  DrawerMenu_sectionCategoriesTitle: 'Категории',
  DrawerMenu_remindersItem: 'Напоминания',
  DrawerMenu_notesOrdering: 'Упорядочивание заметок',
  DrawerMenu_recycleBinItem: 'Корзина',
  DrawerMenu_backupItem: 'Резервное копирование',
  DrawerMenu_Vault: 'Сейф',
  DrawerMenu_settingsItem: 'Настройки',
  DrawerMenu_aboutItem: 'О программе',
  DrawerMenu_editCategoryItem: 'Изменить',

  SortOptionMenu_sortManually: 'Сортировать вручную',
  SortOptionMenu_sortAlphabetically: 'Сортировать по алфавиту',
  SortOptionMenu_sortByLastUpdate: 'Сорт. по последнему изменению',
  SortOptionMenu_sortByCreationDate: 'Сортировать по дате создания',
  SortOptionMenu_sortByReminderDate: 'Сортировать по напоминанию',
  SortOptionMenu_groupByCategories: 'Группировать по категориям',
  SortOptionMenu_compactView: 'Компактный вид',

  Note_screenTitle: '',

  NoteTextTypeMenu_send: 'Отправить',
  NoteTextTypeMenu_remove: 'Удалить',
  NoteTextTypeMenu_undo: 'Отменить изменения',
  NoteTextTypeMenu_textSize: 'Размер текста',

  NoteListTypeMenu_send: 'Отправить',
  NoteListTypeMenu_remove: 'Удалить',
  NoteListTypeMenu_undo: 'Отменить изменения',
  NoteListTypeMenu_textSize: 'Размер текста',
  NoteListTypeMenu_sortAlphabetically: 'Сортировать элементы по алфавиту',
  NoteListTypeMenu_unselectAll: 'Снять все флажки',
  NoteListTypeMenu_removeSelectedItems: 'Удалить отмеченные элементы',
  NoteListTypeMenu_moveSelectedToBottom: 'Отмеченные вниз',

  NoteTitleField_placeholder: 'Заголовок',

  NoteAsTextField_placeholder: 'Текст',

  NoteAsListFieldItem_placeholder: 'Текст',

  NoteUpdateDateField_changePrefix: 'Изменено: ',

  ReminderDialog_title: 'Напоминание',
  ReminderDialog_okButton: 'OK',
  ReminderDialog_cancelButton: 'ОТМЕНА',

  RepeatOptionDialog_optionNoRepeat: 'Не повторять',
  RepeatOptionDialog_optionEveryDay: 'Каждый день',
  RepeatOptionDialog_optionEveryWorkDay: 'Каждый рабочий день (пн-пт)',
  RepeatOptionDialog_optionEveryWeekAtDay: 'Еженедельно',
  RepeatOptionDialog_optionEveryTwoWeeksAtDay: 'Раз в две недели',
  RepeatOptionDialog_optionEveryMonthAtDate: date => {
    return 'Ежемесячно (' + date.toString() + ' числа)';
  },
  RepeatOptionDialog_optionEveryMonthAtLastDayOfMonth:
    'Ежемесячно (в последний день месяца)',
  RepeatOptionDialog_optionEveryYear: 'Ежегодно',

  NoteReminderField_setReminder: 'Установить напоминание',

  SelectTextSizeDialog_title: 'Размер текста',
  SelectTextSizeDialog_cancelButton: 'ОТМЕНА',

  SendNoteDialog_title: 'Отправка заметки',
  SendNoteDialog_cancelButton: 'ОТМЕНА',

  EditCategoriesScreen_title: 'Управление категориями',

  EditableCategoriesListItem_byDefault: 'По умолчанию',

  EditCategoryDialog_title: 'Изменить категорию',
  EditCategoryDialog_okButton: 'OK',
  EditCategoryDialog_cancelButton: 'ОТМЕНА',
  EditCategoryDialog_colorTitle: 'Цвет',
  EditCategoryDialog_defaultCheckmarkText:
    'Категория по умолчанию для новых заметок',

  CreateCategoryDialog_title: 'Добавить категорию',
  CreateCategoryDialog_okButton: 'OK',
  CreateCategoryDialog_cancelButton: 'ОТМЕНА',
  CreateCategoryDialog_colorTitle: 'Цвет',
  CreateCategoryDialog_defaultCheckmarkText:
    'Категория по умолчанию для новых заметок',

  ColorPicker_title: 'Выбор цвета',
  ColorPicker_selectButton: 'ВЫБРАТЬ',

  RemoveCategoryWarningDialog_removeButton: 'УДАЛИТЬ',
  RemoveCategoryWarningDialog_cancelButton: 'ОТМЕНА',
  RemoveCategoryWarningDialog_warningMessage:
    'Удалить данную категорию?\n\n' +
    'Заметки будут перемещены в категорию по умолчанию. Это действие необратимо.',

  About_screenTitle: 'О программе',
  About_versionTitle: 'Версия',
  About_authorTitle: 'Автор',

  Settings_screenTitle: 'Настройки',
  Settings_notesSectionTitle: 'Заметки',
  Settings_defaultNoteTextSize: 'Размер шрифта по умолчанию',
  Settings_defaultListBehavior: 'Поведение списка по умолчанию',
  Settings_defaultListBehavior_moveCheckedItemsToBottom:
    'Переместить отмеченные элементы вниз',
  Settings_defaultListBehavior_dontMoveCheckedItemsToBottom:
    'Не перемещать отмеченные элементы вниз',
  Settings_noteImageQuality: 'Качество изображения',
  Settings_otherSectionTitle: 'Прочее',
  Settings_automaticTrashCleaning: 'Автоматическая очиста корзины',
  Settings_automaticTrashCleaning_description:
    'Удаление заметок из корзины после 21 дня',

  TextSizeDialog_title: 'Размер шрифта по умолчанию',
  TextSizeDialog_cancelButton: 'ОТМЕНА',

  ImageQualityDialog_title: 'Качество изображения',
  ImageQualityDialog_cancelButton: 'ОТМЕНА',

  DefaultNotesListBehaviorDialog_title: 'Поведение списка по умолчанию',
  DefaultNotesListBehaviorDialog_cancelButton: 'ОТМЕНА',
  DefaultNotesListBehaviorDialog_moveCheckedToBottom:
    'Переместить отмеченные элементы вниз',
  DefaultNotesListBehaviorDialog_dontMoveCheckedToBottom:
    'Не перемещать отмеченные элементы вниз',

  Notes_snackbarText: 'Заметка перемещена в корзину',
  Notes_snackbarCancelButton: 'ОТМЕНА',

  RecycleBin_screenTitle: 'Корзина',
  RecycleBin_clearRecycleBinSnackbarText: 'Корзина очищена',

  RecycleBinHeaderMenu_clearAllOption: 'Очитстить корзину',

  DeletedNote_screenTitle: '',
  DeletedNote_headerRestoreButton: 'ВОССТАНОВИТЬ',
  DeletedNote_restoreSnackbarText: 'Заметка восстановлена',
  DeletedNote_deleteNoteSnackbar: 'Заметка полностью удалена',

  DeleteNoteConfirmationDialog_title: 'Удаление заметки',
  DeleteNoteConfirmationDialog_removeButton: 'УДАЛИТЬ',
  DeleteNoteConfirmationDialog_cancelButton: 'ОТМЕНА',
  DeleteNoteConfirmationDialog_warningMessage:
    'Действительно удалить эту заметку?\n\nЭто действие не обратимо.',

  RemoveAllNotesConfirmationDialog_title: 'Очистка корзины',
  RemoveAllNotesConfirmationDialog_removeButton: 'УДАЛИТЬ',
  RemoveAllNotesConfirmationDialog_cancelButton: 'ОТМЕНА',
  RemoveAllNotesConfirmationDialog_warningMessage:
    'Действительно удалить все заметки из корзины?\n\nЭто действие не обратимо.',

  EmptyRecycleBinView_message: 'Нет заметок',

  EmptyNotesListView_message: 'Нет заметок',

  RemoveNoteConfirmationDialog_title: 'Удаление заметки',
  RemoveNoteConfirmationDialog_warningMessage: 'Удалить заметку?',
  RemoveNoteConfirmationDialog_removeButton: 'УДАЛИТЬ',
  RemoveNoteConfirmationDialog_cancelButton: 'ОТМЕНА',

  NotesOrdering_screenTitle: 'Упорядочивание заметок',

  EmptyNotesOrderingView_message: 'Нет заметок',

  AboutView_email: 'Alexander.V.Dorokhov@gmail.com',
  AboutView_emailSubject: 'По поводу Notes App',
  AboutView_emailBody:
    'Александр, друг! Прежде всего, хотелось бы тебя поблагодарить за столь замечательное приложение! Оно изменило мою жизнь!',

  NoteImageHasMoreItems_remainingImages: '+ ещё',

  NotesList_headerSearchBarPlaceholder: 'Поиск заметок',

  RemoveNoteImageConfirmationDialog_message: 'Удалить изображение?',
  RemoveNoteImageConfirmationDialog_removeButton: 'УДАЛИТЬ',
  RemoveNoteImageConfirmationDialog_cancelButton: 'ОТМЕНА',

  BackupScreen_title: 'Резервное копирование',
  BackupScreen_createBackupButton: 'Создать резервную копию',
  BackupScreen_logInButton: 'ВОЙТИ В АККАУНТ',

  CreateBackupDialog_title: 'Создание резервной копии',
  CreateBackupDialog_backupNotePlaceholder: 'Примечание',
  CreateBackupDialog_createButton: 'СОЗДАТЬ',
  CreateBackupDialog_cancelButton: 'ОТМЕНА',
  CreateBackupDialog_noteImagesInfoTitle: 'Сохранить изображения',
  CreateBackupDialog_imagesSizePrefix: 'Размер',
  CreateBackupDialog_imagesSizePostfix: 'Мб',
  CreateBackupDialog_imagesSizeAcquiring: 'Получение размера ...',

  CreatingBackupDialog_title: 'Создание резервной копии',
  CreatingBackupDialog_cancelButton: 'ОТМЕНА',

  BackupHeaderMenu_refreshOption: 'Обновить',
  BackupHeaderMenu_logInOption: 'Войти в аккаунт',
  BackupHeaderMenu_logOutOption: 'Выйти из аккаунта',

  ReceivingBackupsDialog_message: 'Получение резервных копий',
  ReceivingBackupsDialog_cancelButton: 'ОТМЕНА',

  EmptyBackupsListView_message: 'Нет резервных копий',
  EmptyBackupsListView_notConnected: 'Нет соединения с сетью',

  BackupItemMenu_restoreOption: 'Восстановить',
  BackupItemMenu_removeOption: 'Удалить',

  RemoveBackupConfirmationDialog_title: 'Удаление резервной копии',
  RemoveBackupConfirmationDialog_warningMessageStart:
    'Удалить резервную копию, созданную ',
  RemoveBackupConfirmationDialog_warningMessageOnSentencePart: 'в ',
  RemoveBackupConfirmationDialog_warningMessageNoteSentencePart: ' с пометкой ',
  RemoveBackupConfirmationDialog_warningMessageQuestionMark: '?',
  RemoveBackupConfirmationDialog_warningMessageIrreversiblePart:
    '\n\nЭто действие не обратимо.',
  RemoveBackupConfirmationDialog_removeButton: 'УДАЛИТЬ',
  RemoveBackupConfirmationDialog_cancelButton: 'ОТМЕНА',

  RemovingBackupDialog_message: 'Удаление резервной копии',
  RemovingBackupDialog_cancelButton: 'ОТМЕНА',

  RestoreFromBackupConfirmationDialog_title:
    'Восстановление из резервной копии',
  RestoreFromBackupConfirmationDialog_message:
    'Заменить все данные (заметки, настройки) данными из выбранной резервной копии?',
  RestoreFromBackupConfirmationDialog_restoreButton: 'ВОССТАНОВИТЬ',
  RestoreFromBackupConfirmationDialog_cancelButton: 'ОТМЕНА',

  RestoringFromBackupDialog_title: 'Восстановление из резервной копии',
  RestoringFromBackupDialog_cancelButton: 'ОТМЕНА',

  BackupView_notesRestoredToastText: 'Заметки восстановлены',
  BackupView_notesRestoreCancelledToastText:
    'Заметки восстановлены не полностью',
  BackupView_notesRestoredErrorToastText: 'Заметки не восстановлены',

  SelectImageSourceDialog_title: 'Добавить картинку',
  SelectImageSourceDialog_takePhotoText: 'Сделать фото',
  SelectImageSourceDialog_pickFromGalleryText: 'Выбрать изображение',

  NoteItemMenu_removeOption: 'Удалить',
  NoteItemMenu_toVaultOption: 'В сейф',

  Vault_screenTitle: 'Сейф',
  Vault_deleteNoteSnackbar: 'Заметка полностью удалена',
  Vault_passwordChangedSnackbar: 'Пароль изменён',

  UnlockingVaultDialog_dialogTitle: 'Разблокирование сейфа',
  UnlockingVaultDialog_placeholder: 'Введите пароль',
  UnlockingVaultDialog_wrongPasswordError: 'Неправильный пароль',
  UnlockingVaultDialog_okButton: 'OK',
  UnlockingVaultDialog_cancelButton: 'ОТМЕНА',
  UnlockingVaultDialog_reset: 'СБРОСИТЬ',

  CreateVaultPasswordDialog_dialogTitle: 'Создать пароль',
  CreateVaultPasswordDialog_infoMessage:
    'У вашего сейфа ещё нет пароля.\nУстановите пароль сейчас.',
  CreateVaultPasswordDialog_warningMessage:
    'Не забывайте пароль! Доступ к заметкам в сейфе совершенно невозможен без пароля.',
  CreateVaultPasswordDialog_passwordPlaceholder: 'Новый пароль',
  CreateVaultPasswordDialog_passwordConfirmationPlaceholder:
    'Подтвердите пароль',
  CreateVaultPasswordDialog_emptyPasswordError: 'Пароль не должен быть пустым',
  CreateVaultPasswordDialog_passwordConfirmationError:
    'Пароль и его подтверждение должны совпадать',
  CreateVaultPasswordDialog_createButton: 'СОЗДАТЬ',
  CreateVaultPasswordDialog_cancelButton: 'ОТМЕНА',

  ResetVaultPasswordDialog_title: 'Сброс сейфа',
  ResetVaultPasswordDialog_message:
    'Если вы забыли пароль, можно только сбросить сейф.\n\n' +
    'Это значить удалить пароль и все заметки в сейфе.\n\n' +
    'Сбросить сейф?',
  ResetVaultPasswordDialog_resetButton: 'СБРОСИТЬ',
  ResetVaultPasswordDialog_cancelButton: 'ОТМЕНА',

  EmptyVaultNotesListView_message: 'Нет заметок',

  VaultNoteItemMenu_fromVaultOption: 'Убрать из сейфа',
  VaultNoteItemMenu_removeOption: 'Удалить',

  VaultRemoveNoteConfirmationDialog_title: 'Удаление заметки',
  VaultRemoveNoteConfirmationDialog_removeButton: 'УДАЛИТЬ',
  VaultRemoveNoteConfirmationDialog_cancelButton: 'ОТМЕНА',
  VaultRemoveNoteConfirmationDialog_warningMessage:
    'Действительно удалить эту заметку?\n\nЭто действие не обратимо.',

  VaultedNote_screenTitle: '',

  VaultedNoteTextTypeMenu_send: 'Отправить',
  VaultedNoteTextTypeMenu_remove: 'Удалить',
  VaultedNoteTextTypeMenu_undo: 'Отменить изменения',
  VaultedNoteTextTypeMenu_textSize: 'Размер текста',

  VaultedNoteListTypeMenu_send: 'Отправить',
  VaultedNoteListTypeMenu_remove: 'Удалить',
  VaultedNoteListTypeMenu_undo: 'Отменить изменения',
  VaultedNoteListTypeMenu_textSize: 'Размер текста',
  VaultedNoteListTypeMenu_sortAlphabetically:
    'Сортировать элементы по алфавиту',
  VaultedNoteListTypeMenu_unselectAll: 'Снять все флажки',
  VaultedNoteListTypeMenu_removeSelectedItems: 'Удалить отмеченные элементы',
  VaultedNoteListTypeMenu_moveSelectedToBottom: 'Отмеченные вниз',

  VaultedNoteSelectTextSizeDialog_title: 'Размер текста',
  VaultedNoteSelectTextSizeDialog_cancelButton: 'ОТМЕНА',

  VaultedNoteSendNoteDialog_title: 'Отправка заметки',
  VaultedNoteSendNoteDialog_cancelButton: 'ОТМЕНА',

  VaultedNoteRemoveNoteConfirmationDialog_title: 'Удаление заметки',
  VaultedNoteRemoveNoteConfirmationDialog_removeButton: 'УДАЛИТЬ',
  VaultedNoteRemoveNoteConfirmationDialog_cancelButton: 'ОТМЕНА',
  VaultedNoteRemoveNoteConfirmationDialog_warningMessage:
    'Действительно удалить эту заметку?\n\nЭто действие не обратимо.',

  VaultedNote_deleteNoteSnackbar: 'Заметка полностью удалена',

  VaultHeaderMenu_changeVaultPasswordOption: 'Изменить пароль',
  VaultHeaderMenu_exitVaultOption: 'Выйти',

  ChangeVaultPasswordDialog_title: 'Изменить пароль',
  ChangeVaultPasswordDialog_currentPasswordPlaceholder: 'Текущий пароль',
  ChangeVaultPasswordDialog_newPasswordPlaceholder: 'Новый пароль',
  ChangeVaultPasswordDialog_confirmPasswordPlaceholder: 'Подтвердите пароль',
  ChangeVaultPasswordDialog_message:
    'Не забывайте пароль! Доступ к заметкам в сейфе совершенно невозможен без пароля.',
  ChangeVaultPasswordDialog_wrongCurrentPasswordError: 'Неправильный пароль',
  ChangeVaultPasswordDialog_okButton: 'OK',
  ChangeVaultPasswordDialog_cancelButton: 'ОТМЕНА',
};

export default ru;
