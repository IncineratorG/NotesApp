package com.post.notes.modules.notes_storage.module_actions_executor;


import android.appwidget.AppWidgetManager;
import android.content.ComponentName;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;
import com.post.notes.modules.modules_common.data_types.js_actions_executor.JSActionsExecutor;
import com.post.notes.modules.notes_storage.module_actions.types.NotesStorageJSActionTypes;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.GetAllCategoriesHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.GetAllNotesHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.GetAppSettingsHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.GetCoreAppDataHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.GetNoteHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.GetNoteImageHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.GetNotesListSettingsHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.GetVaultPasswordHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.RemoveMultipleNotesHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.RemoveNoteHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.RemoveNoteImageHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.SaveNoteImageHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.UpdateAppSettingsHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.UpdateCategoriesListHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.UpdateMultipleNotesHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.UpdateNoteHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.UpdateNotesListSettingsHandler;
import com.post.notes.modules.notes_storage.module_actions_executor.handlers.UpdateVaultPasswordHandler;
import com.post.notes.modules.notes_storage.module_errors.NotesStorageErrors;
import com.post.notes.widget.NotesWidget;

import java.util.HashMap;
import java.util.Map;

public class NotesStorageJSActionsExecutor implements JSActionsExecutor {
    private static final String ACTION_TYPE = "type";
    private final Map<String, JSActionHandler> mHandlers;

    public NotesStorageJSActionsExecutor() {
        mHandlers = new HashMap<>();
        mHandlers.put(NotesStorageJSActionTypes.GET_CORE_APP_DATA, new GetCoreAppDataHandler());
        mHandlers.put(NotesStorageJSActionTypes.GET_NOTES_LIST_SETTINGS, new GetNotesListSettingsHandler());
        mHandlers.put(NotesStorageJSActionTypes.UPDATE_NOTES_LIST_SETTINGS, new UpdateNotesListSettingsHandler());
        mHandlers.put(NotesStorageJSActionTypes.GET_ALL_NOTES, new GetAllNotesHandler());
        mHandlers.put(NotesStorageJSActionTypes.GET_NOTE, new GetNoteHandler());
        mHandlers.put(NotesStorageJSActionTypes.UPDATE_NOTE, new UpdateNoteHandler());
        mHandlers.put(NotesStorageJSActionTypes.UPDATE_MULTIPLE_NOTES, new UpdateMultipleNotesHandler());
        mHandlers.put(NotesStorageJSActionTypes.REMOVE_NOTE, new RemoveNoteHandler());
        mHandlers.put(NotesStorageJSActionTypes.REMOVE_MULTIPLE_NOTES, new RemoveMultipleNotesHandler());
        mHandlers.put(NotesStorageJSActionTypes.SAVE_NOTE_IMAGE, new SaveNoteImageHandler());
        mHandlers.put(NotesStorageJSActionTypes.GET_NOTE_IMAGE, new GetNoteImageHandler());
        mHandlers.put(NotesStorageJSActionTypes.REMOVE_NOTE_IMAGE, new RemoveNoteImageHandler());
        mHandlers.put(NotesStorageJSActionTypes.GET_ALL_CATEGORIES, new GetAllCategoriesHandler());
        mHandlers.put(NotesStorageJSActionTypes.UPDATE_CATEGORIES_LIST, new UpdateCategoriesListHandler());
        mHandlers.put(NotesStorageJSActionTypes.GET_APP_SETTINGS, new GetAppSettingsHandler());
        mHandlers.put(NotesStorageJSActionTypes.UPDATE_APP_SETTINGS, new UpdateAppSettingsHandler());
        mHandlers.put(NotesStorageJSActionTypes.UPDATE_VAULT_PASSWORD, new UpdateVaultPasswordHandler());
        mHandlers.put(NotesStorageJSActionTypes.GET_VAULT_PASSWORD, new GetVaultPasswordHandler());
    }

    @Override
    public void execute(ReactApplicationContext context, ReadableMap action, Promise result) {
        if (action == null) {
            ModuleError error = NotesStorageErrors.badAction();
            result.reject(error.code(), error.message());
            return;
        }

        final String type = action.getString(ACTION_TYPE);
        if (type == null) {
            ModuleError error = NotesStorageErrors.badActionType();
            result.reject(error.code(), error.message());
            return;
        }

        JSActionHandler actionHandler = mHandlers.get(type);
        if (actionHandler != null) {
            actionHandler.handle(context, action, result);

            NotesWidget.update(
                    context,
                    AppWidgetManager
                            .getInstance(context)
                            .getAppWidgetIds(new ComponentName(context, NotesWidget.class))
            );
        } else {
            ModuleError error = NotesStorageErrors.unknownActionType();
            result.reject(error.code(), error.message());
        }
    }
}
