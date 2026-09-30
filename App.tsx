import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { usePosts } from './src/hooks/usePosts';
import { useMediaPicker } from './src/hooks/useMediaPicker';
import { MediaPreview } from './src/components/MediaPreview';
import { ControlButtons } from './src/components/ControlButtons';

export default function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { selectedMedia, pickFromGallery, takePhoto, clearMedia } = useMediaPicker();
  const { notes, attachedFile, pickDocument, clearFile, createNote, deleteNote } = usePosts();

  const handleSaveNote = () => {
    const success = createNote(title, content, selectedMedia);
    if (success) {
      setTitle('');
      setContent('');
      clearMedia();
    } else {
      Alert.alert('Ошибка', 'Заполните хотя бы одно поле или добавьте файл!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.uid}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>PhotoFlow 📸📝</Text>

            {/* Ввод текста заметки */}
            <TextInput
              style={styles.input}
              placeholder="Заголовок заметки..."
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Текст заметки..."
              multiline
              numberOfLines={3}
              value={content}
              onChangeText={setContent}
            />

            {/* Предпросмотр медиа */}
            <MediaPreview media={selectedMedia} onClear={clearMedia} />

            {/* Кнопки медиа */}
            <ControlButtons onPickGallary={pickFromGallery} onTakePhoto={takePhoto} />

            {/* Блок прикрепления документов/файлов */}
            <View style={styles.fileSection}>
              <TouchableOpacity style={styles.filePickerBtn} onPress={pickDocument}>
                <Text style={styles.filePickerBtnText}>📎 Прикрепить файл к заметке</Text>
              </TouchableOpacity>

              {attachedFile && (
                <View style={styles.filePreviewCard}>
                  <Text style={styles.fileNameText} numberOfLines={1}>
                    📄 {attachedFile.name}
                  </Text>
                  <TouchableOpacity onPress={clearFile}>
                    <Text style={styles.removeFileText}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Кнопка создания */}
            <TouchableOpacity style={styles.saveNoteBtn} onPress={handleSaveNote}>
              <Text style={styles.saveNoteBtnText}>Опубликовать заметку 🚀</Text>
            </TouchableOpacity>

            <Text style={styles.feedTitle}>Сохраненные заметки:</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            {item.title ? <Text style={styles.noteTitle}>{item.title}</Text> : null}
            {item.content ? <Text style={styles.noteContent}>{item.content}</Text> : null}

            {item.media && <MediaPreview media={item.media} onClear={() => {}} />}

            {item.attachedFile && (
              <View style={styles.attachedFileBadge}>
                <Text style={styles.attachedFileBadgeText}>📁 {item.attachedFile.name}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteNote(item.uid)}>
              <Text style={styles.deleteBtnText}>Удалить заметку</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  fileSection: {
    marginTop: 12,
  },
  filePickerBtn: {
    backgroundColor: '#64748b',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  filePickerBtnText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  filePreviewCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  fileNameText: {
    flex: 1,
    color: '#334155',
    fontWeight: '500',
  },
  removeFileText: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 8,
  },
  saveNoteBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  saveNoteBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  feedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    color: '#1e293b',
  },
  noteCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  noteContent: {
    fontSize: 15,
    color: '#334155',
    marginBottom: 10,
  },
  attachedFileBadge: {
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#0284c7',
  },
  attachedFileBadgeText: {
    color: '#475569',
    fontSize: 13,
  },
  deleteBtn: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  deleteBtnText: {
    color: '#ef4444',
    fontWeight: '600',
  },
});