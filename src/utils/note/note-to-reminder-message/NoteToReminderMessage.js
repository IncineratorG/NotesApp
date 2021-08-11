import TextTransformer from '../text-transformer/TextTransformer';

const NoteToReminderMessage = () => {
  const convert = ({note}) => {
    if (!note.isList) {
      return note.noteText;
    }

    const decoratedNoteTextData = note.noteText
      .split('\n')
      .map((value, index) => {
        if (!TextTransformer.isTextChecked({text: value})) {
          return value;
        }

        let uncheckedText = TextTransformer.makeTextUnchecked({text: value});
        uncheckedText = '\u2713 ' + uncheckedText;
        return uncheckedText;
      });

    let decoratedNoteText = '';
    decoratedNoteTextData.forEach((text, index) => {
      if (index === decoratedNoteTextData.length) {
        decoratedNoteText = decoratedNoteText + text;
      } else {
        decoratedNoteText = decoratedNoteText + text + '\n';
      }
    });

    return decoratedNoteText;
  };

  return {
    convert,
  };
};

export default NoteToReminderMessage();
