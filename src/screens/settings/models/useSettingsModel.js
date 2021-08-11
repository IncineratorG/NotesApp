import {useState, useLayoutEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import NoteTextSize from '../../../data/common/note-text-size/NoteTextSize';
import useTranslation from '../../../utils/common/localization';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import useOpenNoteRequestsHandler from '../../../utils/common/hooks/useOpenNoteRequestsHandler';
import NoteImageQuality from '../../../data/common/note-image-quality/NoteImageQuality';

const useSettingsModel = () => {
  const {t} = useTranslation();

  const navigation = useNavigation();

  const dispatch = useDispatch();

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
    routeName: AppRoutes.Settings,
    dispatch,
    openNoteCallback,
  });
  // =====
  // ===

  const [defaultNoteTextSizeName, setDefaultNoteTextSizeName] = useState('');
  const [textSizeDialogVisible, setTextSizeDialogVisible] = useState(false);
  const [
    defaultNotesListBehaviorDialogVisible,
    setDefaultNotesListBehaviorDialogVisible,
  ] = useState(false);
  const [noteImageQualityName, setNoteImageQualityName] = useState('');
  const [
    noteImageQualityDialogVisible,
    setNoteImageQualityDialogVisible,
  ] = useState(false);

  const noteTextDefaultSize = useSelector(
    store => store.appSettings.notes.noteTextDefaultSize,
  );
  const moveCheckedToBottom = useSelector(
    store => store.appSettings.notes.moveCheckedToBottom,
  );
  const noteImageQuality = useSelector(
    store => store.appSettings.notes.noteImageQuality,
  );
  const automaticCleaning = useSelector(
    store => store.appSettings.other.trash.automaticCleaning,
  );

  useLayoutEffect(() => {
    switch (noteTextDefaultSize) {
      case NoteTextSize.TINY: {
        setDefaultNoteTextSizeName(t('tinyTextSize'));
        break;
      }

      case NoteTextSize.SMALL: {
        setDefaultNoteTextSizeName(t('smallTextSize'));
        break;
      }

      case NoteTextSize.NORMAL: {
        setDefaultNoteTextSizeName(t('normalTextSize'));
        break;
      }

      case NoteTextSize.LARGE: {
        setDefaultNoteTextSizeName(t('largeTextSize'));
        break;
      }

      case NoteTextSize.HUGE: {
        setDefaultNoteTextSizeName(t('hugeTextSize'));
        break;
      }
    }
  }, [noteTextDefaultSize, t]);

  useLayoutEffect(() => {
    switch (noteImageQuality) {
      case NoteImageQuality.ORIGINAL: {
        setNoteImageQualityName(t('originalImageQuality'));
        break;
      }

      case NoteImageQuality.GOOD: {
        setNoteImageQualityName(t('goodImageQuality'));
        break;
      }

      case NoteImageQuality.AVERAGE: {
        setNoteImageQualityName(t('averageImageQuality'));
        break;
      }

      case NoteImageQuality.LOW: {
        setNoteImageQualityName(t('lowImageQuality'));
        break;
      }

      case NoteImageQuality.VERY_LOW: {
        setNoteImageQualityName(t('veryLowImageQuality'));
        break;
      }
    }
  }, [noteImageQuality, t]);

  return {
    data: {
      noteTextDefaultSize,
      moveCheckedToBottom,
      automaticCleaning,
      defaultNoteTextSizeName,
      textSizeDialogVisible,
      defaultNotesListBehaviorDialogVisible,
      noteImageQuality,
      noteImageQualityName,
      noteImageQualityDialogVisible,
    },
    setters: {
      setTextSizeDialogVisible,
      setDefaultNotesListBehaviorDialogVisible,
      setNoteImageQualityDialogVisible,
    },
    navigation,
    dispatch,
  };
};

export default useSettingsModel;
