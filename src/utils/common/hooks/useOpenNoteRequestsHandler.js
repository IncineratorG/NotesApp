import {useEffect, useState, useCallback, useLayoutEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {SystemEventsHandler} from '../system-events-handler/SystemEventsHandler';
import AppActions from '../../../store/actions/AppActions';
import Services from '../../../services/Services';

const useOpenNoteRequestsHandler = ({
  routeName,
  dispatch,
  openNoteCallback,
}) => {
  const [currentRouteName, setCurrentRouteName] = useState(null);
  const [currentOpenNoteCallback, setCurrentOpenNoteCallback] = useState(null);
  const [noteToOpen, setNoteToOpen] = useState(null);

  const requestedToOpenNoteId = useSelector(
    store => store.notes.requestedToOpenNoteId,
  );

  const updateHandlerData = useCallback(() => {
    // SystemEventsHandler.onInfo({info: '==> HAS_FOCUS: ' + routeName});

    setCurrentRouteName(routeName);
    setCurrentOpenNoteCallback(() => openNoteCallback);

    return () => {
      // SystemEventsHandler.onInfo({info: '==> LOOSE_FOCUS: ' + routeName});

      setCurrentRouteName(null);
      setCurrentOpenNoteCallback(null);
    };
  }, [routeName, openNoteCallback]);

  useFocusEffect(updateHandlerData);

  useEffect(() => {
    if (
      requestedToOpenNoteId &&
      requestedToOpenNoteId > 0 &&
      currentRouteName
    ) {
      const loadNote = async () => {
        SystemEventsHandler.onInfo({
          info:
            'useOpenNoteRequestsHandler()->WILL_LOAD_NOTE: ' +
            requestedToOpenNoteId,
        });

        const note = await Services.services().notesService.getNote({
          noteId: requestedToOpenNoteId,
        });

        setNoteToOpen(note);
      };

      dispatch(AppActions.notes.actions.clearRequestedToOpenNoteId());

      loadNote();
    }
  }, [
    requestedToOpenNoteId,
    currentRouteName,
    currentOpenNoteCallback,
    dispatch,
  ]);

  useEffect(() => {
    if (noteToOpen) {
      SystemEventsHandler.onInfo({
        info: 'useOpenNoteRequestsHandler()->WILL_OPEN_NOTE',
      });

      currentOpenNoteCallback(noteToOpen);

      setNoteToOpen(null);
    }
  }, [noteToOpen, currentOpenNoteCallback]);
};

export default useOpenNoteRequestsHandler;

// import {useEffect, useState, useCallback} from 'react';
// import {useFocusEffect} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import {SystemEventsHandler} from '../system-events-handler/SystemEventsHandler';
// import AppActions from '../../../store/actions/AppActions';
// import Services from '../../../services/Services';
//
// const useOpenNoteRequestsHandler = ({
//   routeName,
//   dispatch,
//   openNoteCallback,
// }) => {
//   const [currentRouteName, setCurrentRouteName] = useState(null);
//   const [
//     openNoteCallbackForCurrentRoute,
//     setOpenNoteCallbackForCurrentRoute,
//   ] = useState(null);
//   const [noteToOpen, setNoteToOpen] = useState(null);
//
//   const requestedToOpenNoteId = useSelector(
//     store => store.notes.requestedToOpenNoteId,
//   );
//
//   const updateCurrentRouteData = useCallback(() => {
//     setCurrentRouteName(routeName);
//     setOpenNoteCallbackForCurrentRoute(openNoteCallback);
//
//     return () => {
//       setCurrentRouteName(null);
//       setOpenNoteCallbackForCurrentRoute(null);
//     };
//   }, [routeName, openNoteCallback]);
//
//   useFocusEffect(updateCurrentRouteData);
//
//   // ===
//   useEffect(() => {
//     if (requestedToOpenNoteId) {
//       SystemEventsHandler.onInfo({
//         info: '==> HERE: ' + currentRouteName + ' - ' + requestedToOpenNoteId,
//       });
//     }
//   }, [requestedToOpenNoteId, currentRouteName]);
//   // ===
//
//   useEffect(() => {
//     setCurrentRouteName(routeName);
//     setOpenNoteCallbackForCurrentRoute(openNoteCallback);
//   }, [routeName, openNoteCallback]);
//
//   useEffect(() => {
//     if (
//       requestedToOpenNoteId > 0 &&
//       currentRouteName &&
//       openNoteCallbackForCurrentRoute
//     ) {
//       const loadNote = async () => {
//         SystemEventsHandler.onInfo({
//           info:
//             'useOpenNoteRequestsHandler()->WILL_LOAD_NOTE: ' +
//             requestedToOpenNoteId,
//         });
//
//         const note = await Services.services().notesService.getNote({
//           noteId: Number(requestedToOpenNoteId),
//         });
//
//         setNoteToOpen(note);
//       };
//
//       dispatch(AppActions.notes.actions.clearRequestedToOpenNoteId());
//
//       loadNote();
//     }
//   }, [
//     requestedToOpenNoteId,
//     currentRouteName,
//     openNoteCallbackForCurrentRoute,
//     dispatch,
//   ]);
//
//   useEffect(() => {
//     if (noteToOpen && openNoteCallbackForCurrentRoute) {
//       SystemEventsHandler.onInfo({
//         info: 'useOpenNoteRequestsHandler()->WILL_RUN_CALLBACK',
//       });
//       openNoteCallbackForCurrentRoute(noteToOpen);
//       setNoteToOpen(null);
//     }
//   }, [noteToOpen, openNoteCallbackForCurrentRoute]);
// };
//
// export default useOpenNoteRequestsHandler;

// import {useEffect, useCallback} from 'react';
// import {useFocusEffect} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import Services from '../../../services/Services';
// import {SystemEventsHandler} from '../system-events-handler/SystemEventsHandler';
// import AppActions from '../../../store/actions/AppActions';
//
// const useOpenNoteRequestsHandler = ({
//   screenName,
//   dispatch,
//   openNoteCallback,
// }) => {
//   const requestedToOpenNoteId = useSelector(
//     store => store.notes.requestedToOpenNoteId,
//   );
//
//   const onOpenNoteCallback = useCallback(
//     async (noteId, callback) => {
//       const note = await Services.services().notesService.getNote({
//         noteId: Number(noteId),
//       });
//
//       SystemEventsHandler.onInfo({
//         info:
//           'useOpenNoteRequestsHandler()->WILL_OPEN_NOTE->NOTE_ID: ' + noteId,
//       });
//
//       dispatch(AppActions.notes.actions.clearRequestedToOpenNoteId());
//     },
//     [dispatch],
//   );
//
//   const looseFocusCallback = useCallback(() => {
//     SystemEventsHandler.onInfo({info: '==> LOOSE_FOCUS <=='});
//   }, []);
//
//   const acquireFocusCallback = useCallback(() => {
//     SystemEventsHandler.onInfo({info: '==> HAS_FOCUS <=='});
//
//     return () => looseFocusCallback();
//   }, [looseFocusCallback]);
//
//   // ===
//   const setScreenData = useCallback(() => {
//
//   }, []);
//
//   useFocusEffect(setScreenData);
//   // ===
//
//   // useEffect(() => {
//   //   SystemEventsHandler.onInfo({info: '===> HERE <==='});
//   //   return () => {
//   //     SystemEventsHandler.onInfo({info: '===> HERE_CLEANUP <==='});
//   //   };
//   // }, []);
//
//   // useEffect(() => {
//   //   if (requestedToOpenNoteId && requestedToOpenNoteId > 0) {
//   //     onOpenNoteCallback(requestedToOpenNoteId, openNoteCallback);
//   //   }
//   // }, [requestedToOpenNoteId, openNoteCallback, onOpenNoteCallback]);
// };
//
// export default useOpenNoteRequestsHandler;
