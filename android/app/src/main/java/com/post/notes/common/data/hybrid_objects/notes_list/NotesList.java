package com.post.notes.common.data.hybrid_objects.notes_list;


import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.modules.modules_common.data_types.hybrid_object.HybridObject;

import java.util.ArrayList;
import java.util.List;

public class NotesList implements HybridObject {
    public static final String ARRAY_OBJECT_KEY = "notesArray";
    private List<Note> mNotesList;

    public NotesList() {
        mNotesList = new ArrayList<>();
    }

    public void add(Note note) {
        mNotesList.add(note);
    }

    public Note get(int index) {
        if (index < 0 || index >= mNotesList.size()) {
            return null;
        }

        return mNotesList.get(index);
    }

    public int size() {
        return mNotesList.size();
    }

    public List<Note> notesList() {
        return mNotesList;
    }

    @Override
    public WritableMap toWritableMap() {
        WritableMap writableMap = new WritableNativeMap();
        writableMap.putArray(ARRAY_OBJECT_KEY, toWritableArray());

        return writableMap;
    }

    @Override
    public WritableArray toWritableArray() {
        WritableArray notesList = new WritableNativeArray();
        for (Note note : mNotesList) {
            notesList.pushMap(note.toWritableMap());
        }

        return notesList;
    }

    @Override
    public String stringify() {
        return null;
    }

    @Override
    public boolean isEmpty() {
        return false;
    }
}
