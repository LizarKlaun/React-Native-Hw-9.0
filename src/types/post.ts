import { MediaFile } from './media';

export interface FileAttachment {
  name: string;
  uri: string;
  size?: number;
  mimeType?: string;
}

export interface NoteItem {
  uid: string;
  title: string;
  content: string;
  media: MediaFile | null;
  attachedFile: FileAttachment | null;
  timestamp: number;
}