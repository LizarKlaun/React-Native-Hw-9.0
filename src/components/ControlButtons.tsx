import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ControlButtonsProps {
  onPickGallary: () => void;
  onTakePhoto: () => void;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  onPickGallary,
  onTakePhoto,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.btn, styles.galleryBtn]} onPress={onPickGallary}>
        <Text style={styles.btnText}>📁 Галерея</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styles.cameraBtn]} onPress={onTakePhoto}>
        <Text style={styles.btnText}>📷 Камера</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryBtn: {
    backgroundColor: '#10b981',
  },
  cameraBtn: {
    backgroundColor: '#3b82f6',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});