import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@/src/hooks/useTheme';
import { useMoviesStore } from '@/src/stores/useMoviesStore';
import Input from '@/src/components/ui/Input';
import Button from '@/src/components/ui/Button';
import ImageSelector from './ImageSelector';
import React from 'react';

interface MovieFormProps {
  onSuccess: () => void;
}

export default function MovieForm({ onSuccess }: MovieFormProps) {
  const { colors } = useTheme();
  const { addMovie } = useMoviesStore();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');
  const [imageUri, setImageUri] = useState<string>();

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await addMovie({
      title: title.trim(),
      releaseDate: year ? `${year}-01-01` : undefined,
      myRating: rating ? parseFloat(rating) : undefined,
      notes: notes.trim() || undefined,
      customPosterUri: imageUri,
    });

    onSuccess();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        Agregar Película
      </Text>

      <Input
        placeholder="Título *"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Input
        placeholder="Año (ej: 2024)"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
        maxLength={4}
        style={styles.input}
      />

      <Input
        placeholder="Mi puntuación (0-10)"
        value={rating}
        onChangeText={setRating}
        keyboardType="decimal-pad"
        maxLength={4}
        style={styles.input}
      />

      <Input
        placeholder="Notas personales"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
        style={{ ...styles.input, ...styles.textArea }}
      />

      <ImageSelector imageUri={imageUri} onImageSelected={setImageUri} />

      <Button
        title="Agregar Película"
        onPress={handleSubmit}
        disabled={!title.trim()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    marginBottom: 0,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});