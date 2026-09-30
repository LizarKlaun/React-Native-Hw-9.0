export interface MediaFile {
  uri: string;
  type: 'image' | 'video';
  width?: number;
  height?: number;
}