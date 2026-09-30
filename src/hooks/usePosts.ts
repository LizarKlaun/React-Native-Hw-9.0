import { useState, useCallback, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { NoteItem, FileAttachment } from '../types/post';
import { MediaFile } from '../types/media';
import {
  prepareNotesTable,
  insertNoteRecord,
  fetchAllNotes,
  removeNoteRecord,
} from '../database/mediaDao';

export const usePosts = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [attachedFile, setAttachedFile] = useState<FileAttachment | null>(null);

  useEffect(() => {
    prepareNotesTable();
    const data = fetchAllNotes();
    setNotes(data);
  }, []);

  // Функция прикрепления документа/файла
  const pickDocument = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: '*/*',
      });

      if (!response.canceled && response.assets && response.assets.length > 0) {
        const picked = response.assets[0];
        setAttachedFile({
          name: picked.name,
          uri: picked.uri,
          size: picked.size,
          mimeType: picked.mimeType,
        });
      }
    } catch (error) {
      console.error('Ошибка при выборе файла:', error);
    }
  }, []);

  const clearFile = useCallback(() => {
    setAttachedFile(null);
  }, []);

  // Функция создания заметки
  const createNote = useCallback(
    (title: string, content: string, media: MediaFile | null) => {
      if (!title.trim() && !content.trim() && !media && !attachedFile) {
        return false;
      }

      const newNote: NoteItem = {
        uid: `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        title: title.trim(),
        content: content.trim(),
        media,
        attachedFile,
        timestamp: Date.now(),
      };

      insertNoteRecord(newNote);
      setNotes((prev) => [newNote, ...prev]);
      setAttachedFile(null);
      return true;
    },
    [attachedFile]
  );

  const deleteNote = useCallback((id: string) => {
    removeNoteRecord(id);
    setNotes((prev) => prev.filter((item) => item.uid !== id));
  }, []);

  return {
    notes,
    attachedFile,
    pickDocument,
    clearFile,
    createNote,
    deleteNote,
  };
};