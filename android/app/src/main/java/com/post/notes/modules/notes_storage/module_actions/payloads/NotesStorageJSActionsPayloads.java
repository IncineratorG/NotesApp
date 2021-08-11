package com.post.notes.modules.notes_storage.module_actions.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.GetNoteImagePayload;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.GetNotePayload;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.RemoveMultipleNotesPayload;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.RemoveNoteImagePayload;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.RemoveNotePayload;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.SaveNoteImagePayload;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.UpdateAppSettingsPayload;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.UpdateCategoriesListPayload;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.UpdateMultipleNotesPayload;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.UpdateNotePayload;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.UpdateNotesListSettingsPayload;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.UpdateVaultPasswordPayload;

public class NotesStorageJSActionsPayloads {
    public static UpdateNotesListSettingsPayload updateNotesListSettingsPayload(ReadableMap payloadMap) {
        return  new UpdateNotesListSettingsPayload(payloadMap);
    }

    public static UpdateCategoriesListPayload updateCategoriesListPayload(ReadableMap payloadMap) {
        return new UpdateCategoriesListPayload(payloadMap);
    }


    public static UpdateNotePayload updateNotePayload(ReadableMap payloadMap) {
        return new UpdateNotePayload(payloadMap);
    }

    public static UpdateMultipleNotesPayload updateMultipleNotesPayload(ReadableMap paylaodMap) {
        return new UpdateMultipleNotesPayload(paylaodMap);
    }

    public static UpdateAppSettingsPayload updateAppSettingsPayload(ReadableMap payloadMap) {
        return new UpdateAppSettingsPayload(payloadMap);
    }

    public static RemoveNotePayload removeNotePayload(ReadableMap payloadMap) {
        return new RemoveNotePayload(payloadMap);
    }

    public static RemoveMultipleNotesPayload removeMultipleNotesPayload(ReadableMap payloadMap) {
        return new RemoveMultipleNotesPayload(payloadMap);
    }

    public static GetNotePayload getNotePayload(ReadableMap payloadMap) {
        return new GetNotePayload(payloadMap);
    }

    public static SaveNoteImagePayload saveNoteImagePayload(ReadableMap payloadMap) {
        return new SaveNoteImagePayload(payloadMap);
    }

    public static RemoveNoteImagePayload removeNoteImagePayload(ReadableMap payloadMap) {
        return new RemoveNoteImagePayload(payloadMap);
    }

    public static GetNoteImagePayload getNoteImagePayload(ReadableMap payloadMap) {
        return new GetNoteImagePayload(payloadMap);
    }

    public static UpdateVaultPasswordPayload updateVaultPasswordPayload(ReadableMap payloadMap) {
        return new UpdateVaultPasswordPayload(payloadMap);
    }
}
