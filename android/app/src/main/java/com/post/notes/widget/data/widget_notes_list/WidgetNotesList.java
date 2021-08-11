package com.post.notes.widget.data.widget_notes_list;


import com.post.notes.common.data.hybrid_objects.category.Category;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
import com.post.notes.common.data.hybrid_objects.notes_list_settings.NotesListSettings;
import com.post.notes.common.data.hybrid_objects.vault_notes_ids_list.VaultNotesIdsList;
import com.post.notes.widget.utils.text_transformer.TextTransformer;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

public class WidgetNotesList {
    private static final String MANUAL_SORT_TYPE = "manual";
    private static final String ALPHABETICAL_SORT_TYPE = "alphabetical";
    private static final String LAST_UPDATE_DATE_SORT_TYPE = "byLastUpdateDate";
    private static final String CREATION_DATE_SORT_TYPE = "byCreationDate";
    private static final String REMINDER_DATE_SORT_TYPE = "byReminderDate";

    private StringBuilder mStringBuilder;
    private List<Note> mNotes;
    private Map<Long, Category> mCategoriesMap;
    private NotesListSettings mNotesListSettings;

    public WidgetNotesList() {
        mStringBuilder = new StringBuilder();
        mNotes = new ArrayList<>();
        mCategoriesMap = new HashMap<>();
        mNotesListSettings = null;
    }

    public WidgetNotesList(NotesList notesList,
                           List<Category> categories,
                           NotesListSettings notesListSettings) {
        mStringBuilder = new StringBuilder();

        mNotes = composeNotesList(notesList.notesList(), notesListSettings);

        mCategoriesMap = new HashMap<>();
        for (Category c : categories) {
            mCategoriesMap.put(c.id(), c);
        }
    }

    public WidgetNotesList(List<Note> notesList,
                           List<Category> categories,
                           NotesListSettings notesListSettings) {
        mStringBuilder = new StringBuilder();

        mNotes = composeNotesList(notesList, notesListSettings);

        mCategoriesMap = new HashMap<>();
        for (Category c : categories) {
            mCategoriesMap.put(c.id(), c);
        }
    }

    public void clear() {
        mNotes.clear();
    }

    public int size() {
        return mNotes.size();
    }

    public String noteId(int position) {
        if (position >= mNotes.size()) {
            return "";
        }

        return String.valueOf(mNotes.get(position).id());
    }

    public String noteTitle(int position) {
        if (position >= mNotes.size()) {
            return "";
        }

        return mNotes.get(position).title();
    }

    public String noteText(int position) {
        if (position >= mNotes.size()) {
            return "";
        }

        Note note = mNotes.get(position);
        if (!note.isList()) {
            return note.noteText();
        }

        List<String> noteItemsList = TextTransformer.toList(note.noteText(), note.moveCheckedToBottom());

        mStringBuilder.setLength(0);
        for (int i = 0; i < noteItemsList.size(); ++i) {
            String noteItem = noteItemsList.get(i);
            if (TextTransformer.isChecked(noteItem)) {
                mStringBuilder.append(TextTransformer.makeItemUnchecked(noteItem));
            } else {
                mStringBuilder.append(noteItem);
            }

            if (i > 0) {
                break;
            }
            mStringBuilder.append("\n");
        }

        return mStringBuilder.toString();
    }

    public String noteTextFontSizeType(int position) {
        if (position >= mNotes.size()) {
            return "";
        }

        Note note = mNotes.get(position);
        if (note == null) {
            return "";
        }

        return note.textSize();
    }

    public String noteColor(int position) {
        if (position >= mNotes.size()) {
            return "#ffffff";
        }

        Note note = mNotes.get(position);
        Category category = mCategoriesMap.get(note.categoryId());
        if (category == null) {
            return "#ffffff";
        }

        return category.color();
    }

    private List<Note> composeNotesList(List<Note> allNotesList,
                                        NotesListSettings settings) {
        List<Note> composedNotesList = new ArrayList<>();
        for (int i = 0; i < allNotesList.size(); ++i) {
            Note note = allNotesList.get(i);
            if (!note.deleted() && note.vaultedDateTimestamp() <= 0) {
                composedNotesList.add(note);
            }
        }

        if (settings == null) {
            return composedNotesList;
        }

        switch (settings.sortType()) {
            case (MANUAL_SORT_TYPE): {
                Collections.sort(
                        composedNotesList,
                        (n1, n2) -> (int) (n2.orderPos() - n1.orderPos())
                );
                break;
            }

            case (ALPHABETICAL_SORT_TYPE): {
                Collections.sort(
                        composedNotesList,
                        (n1, n2) -> {
                            String n1Word = n1.title();
                            if (n1Word.isEmpty()) {
                                n1Word = n1.noteText();
                                if (n1.isList()) {
                                    n1Word = TextTransformer.toUncheckedText(n1Word);
                                }
                            }

                            String n2Word = n2.title();
                            if (n2Word.isEmpty()) {
                                n2Word = n2.noteText();
                                if (n2.isList()) {
                                    n2Word = TextTransformer.toUncheckedText(n2Word);
                                }
                            }

                            return n1Word.trim().toLowerCase().compareTo(n2Word.trim().toLowerCase());
                        });
                break;
            }

            case (CREATION_DATE_SORT_TYPE): {
                Collections.sort(
                        composedNotesList,
                        (n1, n2) -> (int) (n2.creationDateTimestamp() - n1.creationDateTimestamp())
                );
                break;
            }

            case (LAST_UPDATE_DATE_SORT_TYPE): {
                Collections.sort(
                        composedNotesList,
                        (n1, n2) -> (int) (n2.updateDateTimestamp() - n1.updateDateTimestamp())
                );
                break;
            }

            case (REMINDER_DATE_SORT_TYPE): {
                long currentDate = System.currentTimeMillis();

                Collections.sort(
                        composedNotesList,
                        (n1, n2) -> {
                            long n1ReminderDate = n1.reminderSelectedDateInMilliseconds();
                            long n2ReminderDate = n2.reminderSelectedDateInMilliseconds();

                            if (n1ReminderDate < 0 && n2ReminderDate < 0) {
                                return (int) (n2.orderPos() - n1.orderPos());
                            }

                            if (n1ReminderDate < 0 && n2ReminderDate > 0) {
                                return 1;
                            }

                            if (n1ReminderDate > 0 && n2ReminderDate < 0) {
                                return -1;
                            }

                            if (n1ReminderDate > 0 && n2ReminderDate > 0) {
                                long n1Distance = n1ReminderDate - currentDate;
                                long n2Distance = n2ReminderDate - currentDate;

                                if (n1Distance == 0) {
                                    n1Distance = 1;
                                }
                                if (n2Distance == 0) {
                                    n2Distance = 1;
                                }

                                if (n1Distance < 0 && n2Distance < 0) {
                                    if (n1Distance < n2Distance) {
                                        return 1;
                                    } else {
                                        return -1;
                                    }
                                }

                                if (n1Distance < 0) {
                                    return 1;
                                }
                                if (n2Distance < 0) {
                                    return -1;
                                }

                                if (n1Distance < n2Distance) {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            }
                            return 0;
                        }
                );
                break;
            }
        }

        if (settings.groupByCategories()) {
            Map<Long, List<Note>> groupsMap = new LinkedHashMap<>();
            for (int i = 0; i < composedNotesList.size(); ++i) {
                Note note = composedNotesList.get(i);

                List<Note> categoryNotesList = groupsMap.get(note.categoryId());
                if (categoryNotesList == null) {
                    categoryNotesList = new ArrayList<>();
                }
                categoryNotesList.add(note);

                groupsMap.put(note.categoryId(), categoryNotesList);
            }

            composedNotesList.clear();

            Set<Long> categoriesSet = groupsMap.keySet();
            for (long categoryId : categoriesSet) {
                composedNotesList.addAll(Objects.requireNonNull(groupsMap.get(categoryId)));
            }
        }

        return composedNotesList;
    }
}
