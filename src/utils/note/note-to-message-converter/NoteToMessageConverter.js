import TextTransformer from '../text-transformer/TextTransformer';

const NoteToMessageConverter = () => {
  const noteAsTextConverter = ({note}) => {
    if (note.title) {
      return note.title + '\n\n' + note.noteText;
    } else {
      return note.noteText;
    }
  };

  const noteAsListConverter = ({note}) => {
    let noteItems = TextTransformer.toList({text: note.noteText});
    noteItems = TextTransformer.moveCheckedItemsToBottom({listData: noteItems});

    let noteTextForm = note.title ? note.title + '\n\n' : '';
    for (let i = 0; i < noteItems.length; ++i) {
      noteTextForm = noteTextForm + noteItems[i].text;
      if (i !== noteItems.length - 1) {
        noteTextForm = noteTextForm + '\n';
      }
    }

    return noteTextForm;
  };

  const convert = ({note}) => {
    return note.isList
      ? noteAsListConverter({note})
      : noteAsTextConverter({note});
  };

  return {
    convert,
  };
};

export default NoteToMessageConverter();
