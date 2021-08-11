import {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppRoutes from '../../../../data/common/routes/AppRoutes';
import AppActions from '../../../../store/actions/AppActions';
import Services from '../../../../services/Services';
import useAppStateChangeCallback from '../../../../utils/common/hooks/useAppStateChangeCallback';

const useOpenNoteRequests = ({navigationReady, navigation}) => {
  const dispatch = useDispatch();

  const [noteToOpen, setNoteToOpen] = useState(null);

  const requestedToOpenNoteId = useSelector(
    store => store.notes.requestedToOpenNoteId,
  );

  // ===
  const loadNote = useCallback(async noteId => {
    if (!noteId) {
      return;
    }

    const note = await Services.services().notesService.getNote({
      noteId: Number(noteId),
    });

    if (note) {
      SystemEventsHandler.onInfo({
        info: '===> useOpenNoteRequests->loadNote()->NOTE_LOADED: ' + note.id,
      });
      setNoteToOpen(note);
    } else {
      SystemEventsHandler.onInfo({
        info:
          '===> useOpenNoteRequests->loadNote()->UNABLE_TO_LOAD_NOTE: ' +
          noteId,
      });
    }
  }, []);

  const getRequestedToOpenFromWidgetNote = useCallback(async () => {
    const noteToOpenId = await Services.services().notesService.getNoteToOpenId();
    SystemEventsHandler.onInfo({
      info:
        'useOpenNoteRequests()->getRequestedToOpenFromWidgetNote()->WILL_RUN_CALLBACK->NOTE_TO_OPEN_ID: ' +
        noteToOpenId,
    });
    if (noteToOpenId) {
      loadNote(noteToOpenId);
    }
  }, [loadNote]);

  useAppStateChangeCallback({
    callback: getRequestedToOpenFromWidgetNote,
    runOnGoingToForeground: true,
    runOnAppStart: true,
  });
  // ===

  useEffect(() => {
    if (requestedToOpenNoteId > 0) {
      SystemEventsHandler.onInfo({
        info:
          '===> useOpenNoteRequests->WILL_LOAD_NOTE: ' + requestedToOpenNoteId,
      });
      loadNote(requestedToOpenNoteId);
    }
  }, [requestedToOpenNoteId, loadNote]);

  useEffect(() => {
    if (noteToOpen && navigationReady) {
      SystemEventsHandler.onInfo({
        info:
          '===> useOpenNoteRequests->WILL_OPEN_LOADED_NOTE: ' +
          JSON.stringify(noteToOpen.id),
      });

      navigation.reset({
        routes: [
          {name: AppRoutes.NotesList},
          {name: AppRoutes.Note, params: {note: noteToOpen}},
        ],
      });

      // navigation.navigate(AppRoutes.NotesList);
      // navigation.navigate(AppRoutes.Note, {note: noteToOpen});

      // ===
      // navigation.goBack();
      // navigation.goBack();
      // ===

      dispatch(AppActions.notes.actions.clearRequestedToOpenNoteId());

      setNoteToOpen(null);
    }
  }, [noteToOpen, navigation, navigationReady, dispatch]);
};

export default useOpenNoteRequests;

// import {useEffect, useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
// import AppRoutes from '../../../../data/common/routes/AppRoutes';
// import AppActions from '../../../../store/actions/AppActions';
// import Services from '../../../../services/Services';
//
// const useOpenNoteRequests = ({navigationReady, navigation}) => {
//   const dispatch = useDispatch();
//
//   const [noteToOpen, setNoteToOpen] = useState(null);
//
//   const requestedToOpenNoteId = useSelector(
//     store => store.notes.requestedToOpenNoteId,
//   );
//
//   useEffect(() => {
//     const loadNote = async () => {
//       const note = await Services.services().notesService.getNote({
//         noteId: requestedToOpenNoteId,
//       });
//
//       if (note) {
//         SystemEventsHandler.onInfo({
//           info: '===> useOpenNoteRequests->NOTE_LOADED: ' + note.id,
//         });
//         setNoteToOpen(note);
//       } else {
//         SystemEventsHandler.onInfo({
//           info:
//             '===> useOpenNoteRequests->UNABLE_TO_LOAD_NOTE: ' +
//             requestedToOpenNoteId,
//         });
//       }
//     };
//
//     if (requestedToOpenNoteId > 0) {
//       SystemEventsHandler.onInfo({
//         info:
//           '===> useOpenNoteRequests->WILL_LOAD_NOTE: ' + requestedToOpenNoteId,
//       });
//
//       loadNote();
//     }
//   }, [requestedToOpenNoteId]);
//
//   useEffect(() => {
//     if (noteToOpen && navigationReady) {
//       SystemEventsHandler.onInfo({
//         info:
//           '===> useOpenNoteRequests->WILL_OPEN_LOADED_NOTE: ' +
//           JSON.stringify(noteToOpen.id),
//       });
//
//       navigation.reset({
//         routes: [
//           {name: AppRoutes.NotesList},
//           {name: AppRoutes.Note, params: {note: noteToOpen}},
//         ],
//       });
//
//       // navigation.navigate(AppRoutes.NotesList);
//       // navigation.navigate(AppRoutes.Note, {note: noteToOpen});
//
//       dispatch(AppActions.notes.actions.clearRequestedToOpenNoteId());
//
//       // ===
//       setNoteToOpen(null);
//       // ===
//     }
//   }, [noteToOpen, navigation, navigationReady, dispatch]);
// };
//
// export default useOpenNoteRequests;
