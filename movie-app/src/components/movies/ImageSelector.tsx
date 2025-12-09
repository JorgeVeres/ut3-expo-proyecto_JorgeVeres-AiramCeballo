import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useTheme';
import { useImagePicker } from '@/src/hooks/useImagePicker';
import React from 'react';

interface ImageSelectorProps {
  imageUri?: string;
  onImageSelected: (uri: string | undefined) => void;
}

export default function ImageSelector({ imageUri, onImageSelected }: ImageSelectorProps) {
  const { colors } = useTheme();
  const { pickImage, takePhoto } = useImagePicker();

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) onImageSelected(uri);
  };

  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) onImageSelected(uri);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>
        Póster personalizado
      </Text>

      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <TouchableOpacity
            style={[styles.removeButton, { backgroundColor: colors.error }]}
            onPress={() => onImageSelected(undefined)}
          >
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.surface }]}
          onPress={handlePickImage}
        >
          <Ionicons name="images" size={24} color={colors.primary} />
          <Text style={[styles.buttonText, { color: colors.text }]}>
            Galería
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.surface }]}
          onPress={handleTakePhoto}
        >
          <Ionicons name="camera" size={24} color={colors.primary} />
          <Text style={[styles.buttonText, { color: colors.text }]}>
            Cámara
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});