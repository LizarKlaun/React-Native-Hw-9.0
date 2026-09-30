import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MediaFile } from '../types/media';

interface MediaPreviewProps {
  media: MediaFile | null;
  onClear: () => void;
}

const VideoPlayerComponent: React.FC<{ uri: string }> = ({ uri }) => {
  const player = useVideoPlayer(uri, (p) => {
    p.loop = true;
    p.play();
  });

  return <VideoView style={styles.media} player={player} allowsPictureInPicture />;
};

export const MediaPreview: React.FC<MediaPreviewProps> = ({ media, onClear }) => {
  if (!media) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Медіафайл не обрано</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {media.type === 'image' ? (
        <Image source={{ uri: media.uri }} style={styles.media} resizeMode="cover" />
      ) : (
        <VideoPlayerComponent uri={media.uri} />
      )}

      {onClear ? (
        <TouchableOpacity style={styles.clearBtn} onPress={onClear}>
          <Text style={styles.clearBtnText}>Видалити медіа</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  emptyContainer: {
    height: 150,
    width: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#cbd5e1',
    borderStyle: 'dashed',
    marginTop: 12,
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  clearBtn: {
    marginTop: 8,
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  clearBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});