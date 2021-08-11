package com.post.notes.common.app_storages.notes_storage;


import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.WritableMap;
import com.post.notes.common.app_storages.helper.AppStoragesHelper;
import com.post.notes.common.data.hybrid_objects.category.Category;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
import com.post.notes.common.data.hybrid_objects.notes_list_settings.NotesListSettings;
import com.tencent.mmkv.MMKV;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

public class AppNotesStorage {
    private final String NOTE_IMAGE_SEPARATOR = "_";

    private final String NOTES_LIST_SETTINGS_MMKV_ID = "noteListSettingsMMKVID";
    private final String NOTES_LIST_SETTINGS_KEY = "notesListSettings";

    private final String NOTES_MMKV_ID = "notesMMKVID";

    private final String NOTES_IMAGES_MMKV_ID = "notesImagesMMKVID";

    private final String CATEGORIES_LIST_MMKV_ID = "categoriesListMMKVID";
    private final String CATEGORIES_LIST_KEY = "categoriesList";

    private final String APP_SETTINGS_MMKV_ID = "appSettingsMMKVID";
    private final String APP_SETTINGS_KEY = "appSettings";

    private final String VAULT_DATA_MMKV_ID = "vaultDataMMKVID";
    private final String VAULT_PASSWORD_KEY = "vaultPassword";

    public AppNotesStorage() {

    }

    public boolean saveNotesListSettings(Context context, NotesListSettings notesListSettings) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_LIST_SETTINGS_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->saveNotesListSettings()->MMKV_IS_NULL");
            return false;
        }

        return mmkv.encode(NOTES_LIST_SETTINGS_KEY, notesListSettings.stringify());
    }

    public NotesListSettings getNotesListSettings(Context context) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_LIST_SETTINGS_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->getNotesListSettings()->MMKV_IS_NULL");
            return null;
        }

        return new NotesListSettings(mmkv.decodeString(NOTES_LIST_SETTINGS_KEY));
    }

    public boolean updateNote(Context context, Note note) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->updateNote()->MMKV_IS_NULL");
            return false;
        }

        return mmkv.encode(String.valueOf(note.id()), note.stringify());
    }

    public boolean updateMultipleNotes(Context context, List<Note> notesList) {
        for (int i = 0; i < notesList.size(); ++i) {
            Note note = notesList.get(i);
            updateNote(context, note);
        }

        return true;
    }

    public boolean removeNote(Context context, String noteId) {
        if (noteId == null) {
            return false;
        }

        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->removeNote()->MMKV_IS_NULL");
            return false;
        }

        mmkv.removeValueForKey(noteId);
        removeAllNoteImages(context, noteId);
        return true;
    }

    public boolean removeMultipleNotes(Context context, String[] noteIds) {
        if (noteIds == null) {
            return false;
        }

        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->removeMultipleNotes()->MMKV_IS_NULL");
            return false;
        }

        mmkv.removeValuesForKeys(noteIds);
        for (int i = 0; i < noteIds.length; ++i) {
            removeAllNoteImages(context, noteIds[i]);
        }
        return true;
    }

    public boolean removeAllNotes(Context context) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->removeAllNotes()->MMKV_IS_NULL");
            return false;
        }

        mmkv.clearAll();

        return true;
    }

    public NotesList getNotesList(Context context) {
        NotesList notesList = new NotesList();

        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->getNotesList()->MMKV_IS_NULL");
            return notesList;
        }

        String[] keys = mmkv.allKeys();
        if (keys == null) {
            return notesList;
        }

        List<String> badKeys = new ArrayList<>();
        for (String key : keys) {
            String stringifiedNote = mmkv.decodeString(key);
            Note note  = new Note(stringifiedNote);
            WritableMap noteJsObject = note.toWritableMap();
            if (noteJsObject == null) {
                Log.d("tag", "AppNotesStorage->getNotesList()->NOTE_JS_OBJECT_IS_NULL: " + stringifiedNote);
                badKeys.add(key);
            } else {
                notesList.add(note);
            }
        }

        if (badKeys.size() > 0) {
            Log.d("tag", "AppNotesStorage->getNotesList()->BAD_NOTES_SIZE: " + badKeys.size());
//            mmkv.removeValuesForKeys(badKeys.toArray(new String[0]));
        }

        return notesList;
    }

    public Note getNote(Context context, String noteId) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->getNote()->MMKV_IS_NULL");
            return null;
        }

        return new Note(mmkv.decodeString(noteId));
    }

    public String getNoteImage(Context context, String noteId, String imageId) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_IMAGES_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->getNoteImage()->MMKV_IS_NULL");
            return null;
        }

        String noteImageInternalId = noteImageInternalId(noteId, imageId);
        return mmkv.decodeString(noteImageInternalId);
    }

    public String saveNoteImage(Context context, String noteId, String imageBase64Data) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_IMAGES_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->saveNoteImage()->MMKV_IS_NULL");
            return null;
        }

        String imageId = String.valueOf(System.currentTimeMillis());
        String imageInternalId = noteImageInternalId(noteId, imageId);

        boolean result = mmkv.encode(imageInternalId, imageBase64Data);
        if (result) {
            return imageId;
        }
        return null;
    }

    public boolean updateNoteImage(Context context,
                                   String noteId,
                                   String imageId,
                                   String imageBase64Data) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_IMAGES_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->updateNoteImage()->MMKV_IS_NULL");
            return false;
        }

        String imageInternalId = noteImageInternalId(noteId, imageId);

        return mmkv.encode(imageInternalId, imageBase64Data);
    }

    public boolean removeNoteImage(Context context, String noteId, String imageId) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_IMAGES_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->removeNoteImage()->MMKV_IS_NULL");
            return false;
        }

        String imageInternalId = noteImageInternalId(noteId, imageId);
        mmkv.removeValueForKey(imageInternalId);

        return true;
    }

    public boolean removeAllNoteImages(Context context, String noteId) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_IMAGES_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->removeAllNoteImages()->MMKV_IS_NULL");
            return false;
        }

        String[] imageInternalIds = mmkv.allKeys();
        if (imageInternalIds == null) {
            return true;
        }

        List<String> imagesToRemoveInternalIds = new ArrayList<>();
        for (int i = 0; i < imageInternalIds.length; ++i) {
            String imageInternalId = imageInternalIds[i];
            if (isInternalImageIdBelongToNote(imageInternalId, noteId)) {
                imagesToRemoveInternalIds.add(imageInternalId);
            }
        }

        mmkv.removeValuesForKeys(imagesToRemoveInternalIds.toArray(new String[0]));
        return true;
    }

    public boolean removeAllImages(Context context) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, NOTES_IMAGES_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->removeAllImages()->MMKV_IS_NULL");
            return false;
        }

        mmkv.clearAll();

        return true;
    }

    public String getStringifiedCategoriesList(Context context) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, CATEGORIES_LIST_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->getStringifiedCategoriesList()->MMKV_IS_NULL");
            return null;
        }

        return mmkv.decodeString(CATEGORIES_LIST_KEY);
    }

    public List<Category> getCategoriesList(Context context) {
        List<Category> categories = new ArrayList<>();

        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, CATEGORIES_LIST_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->getCategoriesList()->MMKV_IS_NULL");
            return categories;
        }

        String stringifiedCategoriesList = mmkv.decodeString(CATEGORIES_LIST_KEY);
        if (stringifiedCategoriesList != null) {
            try {
                JSONArray jsonArray = new JSONArray(stringifiedCategoriesList);
                for (int i = 0; i < jsonArray.length(); ++i) {
                    String stringifiedCategory = jsonArray.getString(i);
                    categories.add(new Category(stringifiedCategory));
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return categories;
    }

    public boolean saveCategoriesList(Context context, String stringifiedCategoriesList) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, CATEGORIES_LIST_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->saveCategoriesList()->MMKV_IS_NULL");
            return false;
        }

        return mmkv.encode(CATEGORIES_LIST_KEY, stringifiedCategoriesList);
    }

    public String getStringifiedAppSettings(Context context) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, APP_SETTINGS_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->getStringifiedAppSettings()->MMKV_IS_NULL");
            return null;
        }

        return mmkv.decodeString(APP_SETTINGS_KEY);
    }

    public boolean saveAppSettings(Context context, String stringifiedAppSettings) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, APP_SETTINGS_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->saveAppSettings()->MMKV_IS_NULL");
            return false;
        }

        return mmkv.encode(APP_SETTINGS_KEY, stringifiedAppSettings);
    }

    public String getVaultPassword(Context context) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, VAULT_DATA_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->getVaultPassword()->MMKV_IS_NULL");
            return null;
        }

        return mmkv.decodeString(VAULT_PASSWORD_KEY);
    }

    public boolean setVaultPassword(Context context, String password) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, VAULT_DATA_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppNotesStorage->setVaultPassword()->MMKV_IS_NULL");
            return false;
        }

        if (password == null) {
            mmkv.removeValueForKey(VAULT_PASSWORD_KEY);
        } else {
            mmkv.encode(VAULT_PASSWORD_KEY, password);
        }

        return true;
    }

    private String noteImageInternalId(String noteId, String imageId) {
        return noteId + NOTE_IMAGE_SEPARATOR + imageId;
    }

    private boolean isInternalImageIdBelongToNote(String internalImageId, String noteId) {
        return internalImageId.startsWith(noteId);
    }
}
