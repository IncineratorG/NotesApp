const en = {
  NoteList_screenTitle: 'All notes',

  calendar_yesterday: 'Yesterday',
  calendar_today: 'Today',
  calendar_tomorrow: 'Tomorrow',
  calendar_year_short: 'yr',
  calendar_days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  calendar_months: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  calendar_fullDayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],

  categories_common: 'Common',
  categories_buyings: 'Purchases',
  categories_important: 'Important',
  categories_work: 'Work',
  categories_personal: 'Personal',

  tinyTextSize: 'Tiny',
  smallTextSize: 'Small',
  normalTextSize: 'Normal',
  largeTextSize: 'Large',
  hugeTextSize: 'Huge',

  originalImageQuality: 'Original',
  goodImageQuality: 'Good',
  averageImageQuality: 'Average',
  lowImageQuality: 'Low',
  veryLowImageQuality: 'Very low',

  sms: 'SMS',
  whatsApp: 'WhatsApp',
  telegram: 'Telegram',

  backupSizeUnitKb: 'Kb',
  backupSizeUnitMb: 'Mb',

  // progressStageDefault: 'Creating backup copy',
  progressStageDefault: '',
  progressStagePreparingData: 'Preparing data',
  progressStageSavingAppSettings: 'Saving application settings',
  progressStageSavingNotesText: 'Saving notes',
  progressStageSavingNotesImages: 'Saving images',
  progressStagePreparingBackupData: 'Preparing data',
  progressStageRestoringAppSettings: 'Restoring application settings',
  progressStageRestoringNotesText: 'Restoring notes',
  progressStageRestoringNotesImages: 'Restoring images',
  progressStageRestoringFinishing: 'Ending',
  progressStageFromSentencePart: 'from',

  DrawerMenu_appName: 'AppName',
  DrawerMenu_allNotesCategory: 'All notes',
  DrawerMenu_sectionCategoriesTitle: 'Categories',
  DrawerMenu_remindersItem: 'Reminders',
  DrawerMenu_notesOrdering: 'Organizing notes',
  DrawerMenu_recycleBinItem: 'Recycle bin',
  DrawerMenu_backupItem: 'Backup',
  DrawerMenu_Vault: 'Safe',
  DrawerMenu_settingsItem: 'Settings',
  DrawerMenu_aboutItem: 'About',
  DrawerMenu_editCategoryItem: 'Edit',

  SortOptionMenu_sortManually: 'Sort manually',
  SortOptionMenu_sortAlphabetically: 'Sort alphabetically',
  SortOptionMenu_sortByLastUpdate: 'Sort by last update',
  SortOptionMenu_sortByCreationDate: 'Sort by creation date',
  SortOptionMenu_sortByReminderDate: 'Sort by reminder date',
  SortOptionMenu_groupByCategories: 'Group by categories',
  SortOptionMenu_compactView: 'Compact view',

  Note_screenTitle: '',

  NoteTextTypeMenu_send: 'Send',
  NoteTextTypeMenu_remove: 'Remove',
  NoteTextTypeMenu_undo: 'Undo changes',
  NoteTextTypeMenu_textSize: 'Text size',

  NoteListTypeMenu_send: 'Send',
  NoteListTypeMenu_remove: 'Remove',
  NoteListTypeMenu_undo: 'Undo changes',
  NoteListTypeMenu_textSize: 'Text size',
  NoteListTypeMenu_sortAlphabetically: 'Sort alphabetically',
  NoteListTypeMenu_unselectAll: 'Unselect all',
  NoteListTypeMenu_removeSelectedItems: 'Remove selected items',
  NoteListTypeMenu_moveSelectedToBottom: 'Move selected to bottom',

  NoteTitleField_placeholder: 'Title',

  NoteAsTextField_placeholder: 'Text',

  NoteAsListFieldItem_placeholder: 'Text',

  NoteUpdateDateField_changePrefix: 'Updated: ',

  ReminderDialog_title: 'Reminder',
  ReminderDialog_okButton: 'OK',
  ReminderDialog_cancelButton: 'CANCEL',

  RepeatOptionDialog_optionNoRepeat: 'Do not repeat',
  RepeatOptionDialog_optionEveryDay: 'Every day',
  RepeatOptionDialog_optionEveryWorkDay: 'Every working day (mon-fri)',
  RepeatOptionDialog_optionEveryWeekAtDay: 'Every week',
  RepeatOptionDialog_optionEveryTwoWeeksAtDay: 'Every two weeks',
  RepeatOptionDialog_optionEveryMonthAtDate: date => {
    return 'Monthly (on day ' + date.toString() + ')';
  },
  RepeatOptionDialog_optionEveryMonthAtLastDayOfMonth:
    'Monthly (on the last day of the month)',
  RepeatOptionDialog_optionEveryYear: 'Yearly',

  NoteReminderField_setReminder: 'Set reminder',

  SelectTextSizeDialog_title: 'Text size',
  SelectTextSizeDialog_cancelButton: 'CANCEL',

  SendNoteDialog_title: 'Send note',
  SendNoteDialog_cancelButton: 'CANCEL',

  EditCategoriesScreen_title: 'Edit categories',

  EditableCategoriesListItem_byDefault: 'Default',

  EditCategoryDialog_title: 'Edit category',
  EditCategoryDialog_okButton: 'OK',
  EditCategoryDialog_cancelButton: 'CANCEL',
  EditCategoryDialog_colorTitle: 'Color',
  EditCategoryDialog_defaultCheckmarkText: 'Default category for new notes',

  CreateCategoryDialog_title: 'Add category',
  CreateCategoryDialog_okButton: 'OK',
  CreateCategoryDialog_cancelButton: 'CANCEL',
  CreateCategoryDialog_colorTitle: 'Color',
  CreateCategoryDialog_defaultCheckmarkText: 'Default category for new notes',

  ColorPicker_title: 'Select color',
  ColorPicker_selectButton: 'SELECT',

  RemoveCategoryWarningDialog_removeButton: 'DELETE',
  RemoveCategoryWarningDialog_cancelButton: 'CANCEL',
  RemoveCategoryWarningDialog_warningMessage:
    'Delete this category?\n\n' +
    'The notes will be moved to the default category. This action is irreversible.',

  About_screenTitle: 'About app',
  About_versionTitle: 'Version',
  About_authorTitle: 'Author',

  Settings_screenTitle: 'Settings',
  Settings_notesSectionTitle: 'Notes',
  Settings_defaultNoteTextSize: 'Default font size',
  Settings_defaultListBehavior: 'Default list behavior',
  Settings_defaultListBehavior_moveCheckedItemsToBottom:
    'Move marked items down',
  Settings_defaultListBehavior_dontMoveCheckedItemsToBottom:
    'Do not move marked items down',
  Settings_noteImageQuality: 'Image quality',
  Settings_otherSectionTitle: 'Other',
  Settings_automaticTrashCleaning: 'Auto trash clearing',
  Settings_automaticTrashCleaning_description:
    'Remove notes from trash after 21 days',

  TextSizeDialog_title: 'Default font size',
  TextSizeDialog_cancelButton: 'CANCEL',

  ImageQualityDialog_title: 'Image quality',
  ImageQualityDialog_cancelButton: 'CANCEL',

  DefaultNotesListBehaviorDialog_title: 'Default list behavior',
  DefaultNotesListBehaviorDialog_cancelButton: 'CANCEL',
  DefaultNotesListBehaviorDialog_moveCheckedToBottom: 'Move marked items down',
  DefaultNotesListBehaviorDialog_dontMoveCheckedToBottom:
    'Do not move marked items down',

  Notes_snackbarText: 'Note was moved to the recycle bin',
  Notes_snackbarCancelButton: 'CANCEL',

  RecycleBin_screenTitle: 'Recycle bin',
  RecycleBin_clearRecycleBinSnackbarText: 'Recycle bin cleared',

  RecycleBinHeaderMenu_clearAllOption: 'Clear recycle bin',

  DeletedNote_screenTitle: '',
  DeletedNote_headerRestoreButton: 'RESTORE',
  DeletedNote_restoreSnackbarText: 'Note restored',
  DeletedNote_deleteNoteSnackbar: 'Note completely removed',

  DeleteNoteConfirmationDialog_title: 'Delete note',
  DeleteNoteConfirmationDialog_removeButton: 'DELETE',
  DeleteNoteConfirmationDialog_cancelButton: 'CANCEL',
  DeleteNoteConfirmationDialog_warningMessage:
    'Really delete this note?\n\n' + 'This action is not reversible.',

  RemoveAllNotesConfirmationDialog_title: 'Clearing recycle bin',
  RemoveAllNotesConfirmationDialog_removeButton: 'DELETE',
  RemoveAllNotesConfirmationDialog_cancelButton: 'CANCEL',
  RemoveAllNotesConfirmationDialog_warningMessage:
    'Really delete all notes?\n\n' + 'This action is not reversible.',

  EmptyRecycleBinView_message: 'No notes',

  EmptyNotesListView_message: 'No notes',

  RemoveNoteConfirmationDialog_title: 'Deleting note',
  RemoveNoteConfirmationDialog_warningMessage: 'Delete note?',
  RemoveNoteConfirmationDialog_removeButton: 'DELETE',
  RemoveNoteConfirmationDialog_cancelButton: 'CANCEL',

  NotesOrdering_screenTitle: 'Organizing notes',

  EmptyNotesOrderingView_message: 'No notes',

  AboutView_email: 'Alexander.V.Dorokhov@gmail.com',
  AboutView_emailSubject: 'About Notes App',
  AboutView_emailBody:
    'Alexander, my friend! First of all, thank you for such a wonderful app! It changed my life!',

  NoteImageHasMoreItems_remainingImages: '+ ',

  NotesList_headerSearchBarPlaceholder: 'Notes search',

  RemoveNoteImageConfirmationDialog_message: 'Remove image?',
  RemoveNoteImageConfirmationDialog_removeButton: 'REMOVE',
  RemoveNoteImageConfirmationDialog_cancelButton: 'CANCEL',

  BackupScreen_title: 'Backup',
  BackupScreen_createBackupButton: 'Create backup',
  BackupScreen_logInButton: 'LOG IN',

  CreateBackupDialog_title: 'Create backup',
  CreateBackupDialog_backupNotePlaceholder: 'Note',
  CreateBackupDialog_createButton: 'CREATE',
  CreateBackupDialog_cancelButton: 'CANCEL',
  CreateBackupDialog_noteImagesInfoTitle: 'Save images',
  CreateBackupDialog_imagesSizePrefix: 'Size',
  CreateBackupDialog_imagesSizePostfix: 'Mb',
  CreateBackupDialog_imagesSizeAcquiring: 'Getting size ...',

  CreatingBackupDialog_title: 'Creating backup',
  CreatingBackupDialog_cancelButton: 'CANCEL',

  BackupHeaderMenu_refreshOption: 'Refresh',
  BackupHeaderMenu_logInOption: 'Log in',
  BackupHeaderMenu_logOutOption: 'Log out',

  ReceivingBackupsDialog_message: 'Getting backups',
  ReceivingBackupsDialog_cancelButton: 'CANCEL',

  EmptyBackupsListView_message: 'No backups',
  EmptyBackupsListView_notConnected: 'No connection',

  BackupItemMenu_restoreOption: 'Restore',
  BackupItemMenu_removeOption: 'Remove',

  RemoveBackupConfirmationDialog_title: 'Removing backup',
  RemoveBackupConfirmationDialog_warningMessageStart: 'Remove backup, created ',
  RemoveBackupConfirmationDialog_warningMessageOnSentencePart: 'on ',
  RemoveBackupConfirmationDialog_warningMessageNoteSentencePart: ' with note ',
  RemoveBackupConfirmationDialog_warningMessageQuestionMark: '?',
  RemoveBackupConfirmationDialog_warningMessageIrreversiblePart:
    '\n\nThis action is not reversible.',
  RemoveBackupConfirmationDialog_removeButton: 'REMOVE',
  RemoveBackupConfirmationDialog_cancelButton: 'CANCEL',

  RemovingBackupDialog_message: 'Removing backup',
  RemovingBackupDialog_cancelButton: 'CANCEL',

  RestoreFromBackupConfirmationDialog_title: 'Restore from backup',
  RestoreFromBackupConfirmationDialog_message:
    'Replace all data (notes, settings) with data from the selected backup?',
  RestoreFromBackupConfirmationDialog_restoreButton: 'RESTORE',
  RestoreFromBackupConfirmationDialog_cancelButton: 'CANCEL',

  RestoringFromBackupDialog_title: 'Restoring from backup',
  RestoringFromBackupDialog_cancelButton: 'CANCEL',

  BackupView_notesRestoredToastText: 'Notes restored',
  BackupView_notesRestoreCancelledToastText: 'Notes are not fully restored',
  BackupView_notesRestoredErrorToastText: 'Notes have not been restored',

  SelectImageSourceDialog_title: 'Add picture',
  SelectImageSourceDialog_takePhotoText: 'Take photo',
  SelectImageSourceDialog_pickFromGalleryText: 'Pick image',

  NoteItemMenu_removeOption: 'Remove',
  NoteItemMenu_toVaultOption: 'To vault',

  Vault_screenTitle: 'Vault',
  Vault_deleteNoteSnackbar: 'Note completely removed',
  Vault_passwordChangedSnackbar: 'Password changed',

  UnlockingVaultDialog_dialogTitle: 'Unlocking vault',
  UnlockingVaultDialog_placeholder: 'Enter password',
  UnlockingVaultDialog_wrongPasswordError: 'Wrong password',
  UnlockingVaultDialog_okButton: 'OK',
  UnlockingVaultDialog_cancelButton: 'CANCEL',
  UnlockingVaultDialog_reset: 'RESET',

  CreateVaultPasswordDialog_dialogTitle: 'Create password',
  CreateVaultPasswordDialog_infoMessage:
    "Your vault doesn't have a password yet.\nSet the password now.",
  CreateVaultPasswordDialog_warningMessage:
    "Don't forget your password! Access to the notes in the vault is absolutely impossible without a password.",
  CreateVaultPasswordDialog_passwordPlaceholder: 'New password',
  CreateVaultPasswordDialog_passwordConfirmationPlaceholder: 'Confirm password',
  CreateVaultPasswordDialog_emptyPasswordError: 'Password must not be empty',
  CreateVaultPasswordDialog_passwordConfirmationError:
    'Password and its confirmation must match',
  CreateVaultPasswordDialog_createButton: 'CREATE',
  CreateVaultPasswordDialog_cancelButton: 'CANCEL',

  ResetVaultPasswordDialog_title: 'Reset vault',
  ResetVaultPasswordDialog_message:
    'If you forgot your password, you can only reset the vault.\n\n' +
    'This means deleting the password and all the notes in the vault.\n\n' +
    'Reset vault?',
  ResetVaultPasswordDialog_resetButton: 'RESET',
  ResetVaultPasswordDialog_cancelButton: 'CANCEL',

  EmptyVaultNotesListView_message: 'No notes',

  VaultNoteItemMenu_fromVaultOption: 'Move from vault',
  VaultNoteItemMenu_removeOption: 'Remove',

  VaultRemoveNoteConfirmationDialog_title: 'Delete note',
  VaultRemoveNoteConfirmationDialog_removeButton: 'DELETE',
  VaultRemoveNoteConfirmationDialog_cancelButton: 'CANCEL',
  VaultRemoveNoteConfirmationDialog_warningMessage:
    'Really delete this note?\n\n' + 'This action is not reversible.',

  VaultedNote_screenTitle: '',

  VaultedNoteTextTypeMenu_send: 'Send',
  VaultedNoteTextTypeMenu_remove: 'Remove',
  VaultedNoteTextTypeMenu_undo: 'Undo changes',
  VaultedNoteTextTypeMenu_textSize: 'Text size',

  VaultedNoteListTypeMenu_send: 'Send',
  VaultedNoteListTypeMenu_remove: 'Remove',
  VaultedNoteListTypeMenu_undo: 'Undo changes',
  VaultedNoteListTypeMenu_textSize: 'Text size',
  VaultedNoteListTypeMenu_sortAlphabetically: 'Sort alphabetically',
  VaultedNoteListTypeMenu_unselectAll: 'Unselect all',
  VaultedNoteListTypeMenu_removeSelectedItems: 'Remove selected items',
  VaultedNoteListTypeMenu_moveSelectedToBottom: 'Move selected to bottom',

  VaultedNoteSelectTextSizeDialog_title: 'Text size',
  VaultedNoteSelectTextSizeDialog_cancelButton: 'CANCEL',

  VaultedNoteSendNoteDialog_title: 'Send note',
  VaultedNoteSendNoteDialog_cancelButton: 'CANCEL',

  VaultedNoteRemoveNoteConfirmationDialog_title: 'Delete note',
  VaultedNoteRemoveNoteConfirmationDialog_removeButton: 'DELETE',
  VaultedNoteRemoveNoteConfirmationDialog_cancelButton: 'CANCEL',
  VaultedNoteRemoveNoteConfirmationDialog_warningMessage:
    'Really delete this note?\n\n' + 'This action is not reversible.',

  VaultedNote_deleteNoteSnackbar: 'Note completely removed',

  VaultHeaderMenu_changeVaultPasswordOption: 'Change password',
  VaultHeaderMenu_exitVaultOption: 'Exit',

  ChangeVaultPasswordDialog_title: 'Change password',
  ChangeVaultPasswordDialog_currentPasswordPlaceholder: 'Current password',
  ChangeVaultPasswordDialog_newPasswordPlaceholder: 'New password',
  ChangeVaultPasswordDialog_confirmPasswordPlaceholder: 'Confirm password',
  ChangeVaultPasswordDialog_message:
    "Don't forget your password! Access to the notes in the vault is absolutely impossible without a password.",
  ChangeVaultPasswordDialog_wrongCurrentPasswordError: 'Wrong password',
  ChangeVaultPasswordDialog_okButton: 'OK',
  ChangeVaultPasswordDialog_cancelButton: 'CANCEL',
};

export default en;
