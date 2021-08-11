import useAppMenuNotesListController from './app-menu/useAppMenuNotesListController';
import useSortOptionsMenuNoteListController from './sort-options-menu/useSortOptionMenuNoteListController';
import useNotesListController from './notes-list/useNotesListController';
import useHeaderNotesListController from './header-buttons/useHeaderNotesListController';

const useNotesListRootController = model => {
  const appMenuController = useAppMenuNotesListController(model);
  const sortOptionsMenuController = useSortOptionsMenuNoteListController(model);
  const headerController = useHeaderNotesListController(model);
  const notesListController = useNotesListController(model);

  return {
    appMenuController,
    sortOptionsMenuController,
    headerController,
    notesListController,
  };
};

export default useNotesListRootController;
