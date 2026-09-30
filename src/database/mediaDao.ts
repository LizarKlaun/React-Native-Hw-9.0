import { getDatabase } from './db';
import { NoteItem, FileAttachment } from '../types/post';

export const prepareNotesTable = (): void => {
  const database = getDatabase();
  database.execSync(`
    CREATE TABLE IF NOT EXISTS flow_notes (
      uid TEXT PRIMARY KEY NOT NULL,
      title TEXT,
      content TEXT,
      media_uri TEXT,
      media_type TEXT,
      file_name TEXT,
      file_uri TEXT,
      file_mime TEXT,
      created_at INTEGER
    );
  `);
};

export const insertNoteRecord = (note: NoteItem): void => {
  const database = getDatabase();
  database.runSync(
    `INSERT INTO flow_notes 
     (uid, title, content, media_uri, media_type, file_name, file_uri, file_mime, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      note.uid,
      note.title,
      note.content,
      note.media?.uri || null,
      note.media?.type || null,
      note.attachedFile?.name || null,
      note.attachedFile?.uri || null,
      note.attachedFile?.mimeType || null,
      note.timestamp,
    ]
  );
};

export const fetchAllNotes = (): NoteItem[] => {
  const database = getDatabase();
  const rows = database.getAllSync<any>('SELECT * FROM flow_notes ORDER BY created_at DESC');

  return rows.map((r: any) => {
    const file: FileAttachment | null = r.file_uri
      ? { name: r.file_name || 'Прикрепленный файл', uri: r.file_uri, mimeType: r.file_mime }
      : null;

    return {
      uid: r.uid,
      title: r.title || '',
      content: r.content || '',
      media: r.media_uri ? { uri: r.media_uri, type: r.media_type } : null,
      attachedFile: file,
      timestamp: r.created_at,
    };
  });
};

export const removeNoteRecord = (uid: string): void => {
  const database = getDatabase();
  database.runSync('DELETE FROM flow_notes WHERE uid = ?', [uid]);
};