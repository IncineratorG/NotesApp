import React from 'react';
import NotesOrderingView from './views/NotesOrderingView';
import useNotesOrderingModel from './models/useNotesOrderingModel';
import useNotesOrderingController from './controllers/useNotesOrderingController';

const NotesOrdering = () => {
  const model = useNotesOrderingModel();
  const controller = useNotesOrderingController(model);

  return <NotesOrderingView model={model} controller={controller} />;
};

export default React.memo(NotesOrdering);
