import {useState, useEffect, useCallback, useReducer} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../store/actions/AppActions';
import backupLocalReducer from '../store/backupLocalReducer';
import backupLocalState from '../store/backupLocalState';
import BackupLocalActions from '../store/BackupLocalActions';
import BackupProgressTransformer from '../helpers/BackupProgressTransformer';
import useTranslation from '../../../utils/common/localization';
import {ToastAndroid} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import useOpenNoteRequestsHandler from '../../../utils/common/hooks/useOpenNoteRequestsHandler';

const useBackupModel = () => {
  const {t} = useTranslation();

  const dispatch = useDispatch();

  const navigation = useNavigation();

  // ===
  // =====
  const openNoteCallback = useCallback(
    noteToOpen => {
      if (noteToOpen) {
        navigation.goBack();
        navigation.navigate(AppRoutes.Note, {note: noteToOpen});
      }
    },
    [navigation],
  );

  useOpenNoteRequestsHandler({
    routeName: AppRoutes.Backup,
    dispatch,
    openNoteCallback,
  });
  // =====
  // ===

  const [localState, localDispatch] = useReducer(
    backupLocalReducer,
    backupLocalState,
  );

  const [localImage, setLocalImage] = useState(null);
  const [remoteImage, setRemoteImage] = useState(null);
  const [createBackupDialogVisible, setCreateBackupDialogVisible] = useState(
    false,
  );
  const [backupNoteText, setBackupNoteText] = useState('');
  const [needSaveImages, setNeedSaveImages] = useState(true);
  const [headerMenuVisible, setHeaderMenuVisible] = useState(false);
  const [wasRestoringFromBackup, setWasRestoringFromBackup] = useState(false);

  const loggedIn = useSelector(store => store.backup.userAccount.loggedIn);
  const loginInProgress = useSelector(
    store => store.backup.userAccount.inProgress,
  );
  const backupInfoAcquiring = useSelector(
    store => store.backup.createdBackupInfo.inProgress,
  );
  const notesImagesSizeInBytes = useSelector(
    store => store.backup.createdBackupInfo.imagesSizeInBytes,
  );
  const creatingBackup = useSelector(
    store => store.backup.createBackupProcess.inProgress,
  );
  const creatingBackupStageType = useSelector(
    store => store.backup.createBackupProcess.progress.stageType,
  );
  const creatingBackupStageDescription = useSelector(
    store => store.backup.createBackupProcess.progress.stageDescription,
  );
  const creatingBackupCurrentProgressItem = useSelector(
    store => store.backup.createBackupProcess.progress.currentProgressItem,
  );
  const creatingBackupTotalProgressItems = useSelector(
    store => store.backup.createBackupProcess.progress.totalProgressItems,
  );
  const receivingBackupsList = useSelector(
    store => store.backup.backupsList.inProgress,
  );
  const backupsList = useSelector(store => store.backup.backupsList.list);
  const removingBackup = useSelector(
    store => store.backup.removeBackupProcess.inProgress,
  );
  const restoringFromBackup = useSelector(
    store => store.backup.restoreFromBackupProcess.inProgress,
  );
  const restoringFromBackupCancelled = useSelector(
    store => store.backup.restoreFromBackupProcess.isCancelled,
  );
  const restoringFromBackupHasError = useSelector(
    store => store.backup.restoreFromBackupProcess.error.hasError,
  );
  const restoringFromBackupStageType = useSelector(
    store => store.backup.restoreFromBackupProcess.progress.stageType,
  );
  const restoringFromBackupStageDescription = useSelector(
    store => store.backup.restoreFromBackupProcess.progress.stageDescription,
  );
  const restoringFromBackupCurrentProgressItem = useSelector(
    store => store.backup.restoreFromBackupProcess.progress.currentProgressItem,
  );
  const restoringFromBackupTotalProgressItems = useSelector(
    store => store.backup.restoreFromBackupProcess.progress.totalProgressItems,
  );

  useEffect(() => {
    const progressText = BackupProgressTransformer.toText({
      t,
      stageType: restoringFromBackupStageType,
      stageDescription: restoringFromBackupStageDescription,
      currentProgressItem: restoringFromBackupCurrentProgressItem,
      totalProgressItems: restoringFromBackupTotalProgressItems,
    });
    localDispatch(
      BackupLocalActions.actions.setRestoringFromBackupDialogProgressText({
        text: progressText,
      }),
    );
  }, [
    restoringFromBackupStageType,
    restoringFromBackupStageDescription,
    restoringFromBackupCurrentProgressItem,
    restoringFromBackupTotalProgressItems,
    t,
  ]);

  useEffect(() => {
    if (restoringFromBackup) {
      setWasRestoringFromBackup(true);
    }

    localDispatch(
      BackupLocalActions.actions.setRestoringFromBackupDialogVisibility({
        visible: restoringFromBackup,
      }),
    );
  }, [restoringFromBackup]);

  useEffect(() => {
    if (!restoringFromBackup && wasRestoringFromBackup) {
      setWasRestoringFromBackup(false);

      if (restoringFromBackupCancelled) {
        ToastAndroid.show(
          t('BackupView_notesRestoreCancelledToastText'),
          ToastAndroid.SHORT,
        );
      } else if (restoringFromBackupHasError) {
        ToastAndroid.show(
          t('BackupView_notesRestoredErrorToastText'),
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show(
          t('BackupView_notesRestoredToastText'),
          ToastAndroid.SHORT,
        );
      }
    }
  }, [
    restoringFromBackup,
    restoringFromBackupCancelled,
    restoringFromBackupHasError,
    wasRestoringFromBackup,
    t,
  ]);

  useEffect(() => {
    const progressText = BackupProgressTransformer.toText({
      t,
      stageType: creatingBackupStageType,
      stageDescription: creatingBackupStageDescription,
      currentProgressItem: creatingBackupCurrentProgressItem,
      totalProgressItems: creatingBackupTotalProgressItems,
    });
    localDispatch(
      BackupLocalActions.actions.setCreatingBackupDialogProgressText({
        text: progressText,
      }),
    );
  }, [
    creatingBackupStageType,
    creatingBackupStageDescription,
    creatingBackupCurrentProgressItem,
    creatingBackupTotalProgressItems,
    t,
  ]);

  useEffect(() => {
    localDispatch(
      BackupLocalActions.actions.setCreatingBackupDialogVisibility({
        visible: creatingBackup,
      }),
    );
  }, [creatingBackup]);

  useEffect(() => {
    localDispatch(
      BackupLocalActions.actions.setReceivingBackupsDialogVisibility({
        visible: receivingBackupsList,
      }),
    );
  }, [receivingBackupsList]);

  useEffect(() => {
    localDispatch(
      BackupLocalActions.actions.setRemovingBackupDialogVisibility({
        visible: removingBackup,
      }),
    );
  }, [removingBackup]);

  const logIn = useCallback(() => {
    const logInHandler = async () => {
      const {isConnected} = await NetInfo.fetch();
      localDispatch(
        BackupLocalActions.actions.setConnected({connected: isConnected}),
      );

      if (isConnected) {
        dispatch(AppActions.backup.actions.logIn());
      }
    };

    if (!loggedIn && !loginInProgress) {
      logInHandler();
    }

    return () => {};
  }, [loggedIn, loginInProgress, dispatch]);

  useFocusEffect(logIn);

  return {
    data: {
      localState,
      localImage,
      remoteImage,
      createBackupDialogVisible,
      backupNoteText,
      needSaveImages,
      backupInfoAcquiring,
      notesImagesSizeInBytes,
      headerMenuVisible,
      loggedIn,
      receivingBackupsList,
      backupsList,
    },
    setters: {
      setLocalImage,
      setRemoteImage,
      setCreateBackupDialogVisible,
      setBackupNoteText,
      setNeedSaveImages,
      setHeaderMenuVisible,
    },
    navigation,
    localDispatch,
    dispatch,
  };
};

export default useBackupModel;
