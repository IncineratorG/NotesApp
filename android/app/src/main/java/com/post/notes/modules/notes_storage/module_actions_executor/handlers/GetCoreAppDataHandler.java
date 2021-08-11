package com.post.notes.modules.notes_storage.module_actions_executor.handlers;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
import com.post.notes.common.data.hybrid_objects.notes_list_settings.NotesListSettings;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

public class GetCoreAppDataHandler implements JSActionHandler {
    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        String stringifiedAppSettings = AppStorages.get().notesStorage().getStringifiedAppSettings(context);
        NotesListSettings notesListSettings = AppStorages.get().notesStorage().getNotesListSettings(context);
        if (notesListSettings == null) {
            String nullString = null;
            notesListSettings = new NotesListSettings(nullString);
        }
        NotesList notesList = AppStorages.get().notesStorage().getNotesList(context);
        String stringifiedCategoriesList = AppStorages.get().notesStorage().getStringifiedCategoriesList(context);
        String vaultPassword = AppStorages.get().notesStorage().getVaultPassword(context);

        WritableMap jsPayload = new WritableNativeMap();

        jsPayload.putString("appSettings", stringifiedAppSettings);
        jsPayload.putMap("notesListSettings", notesListSettings.toWritableMap());
        jsPayload.putArray("notesList", notesList.toWritableArray());
        if (stringifiedCategoriesList == null) {
            jsPayload.putNull("categoriesList");
        } else {
            jsPayload.putString("categoriesList", stringifiedCategoriesList);
        }
        if (vaultPassword == null) {
            jsPayload.putNull("vaultPassword");
        } else {
            jsPayload.putString("vaultPassword", vaultPassword);
        }

        result.resolve(jsPayload);
    }
}
