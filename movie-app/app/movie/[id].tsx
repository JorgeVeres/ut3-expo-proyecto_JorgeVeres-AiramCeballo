import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useMemo } from 'react';
import { useTheme } from '@/src/hooks/useTheme';
import { useMoviesStore } from '@/src/stores/useMoviesStore';
import Button from '@/src/components/ui/Button';
import AnimatedNoteCard from '@/src/components/movies/AnimatedNoteCard';
import React from 'react';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const router = useRouter();
  const [showNotes, setShowNotes] = useState(false);
  
  // Suscripciones separadas
  const movies = useMoviesStore(state => state.movies);
  const toggleFavorite = useMoviesStore(state => state.toggleFavorite);
  const deleteMovie = useMoviesStore(state => state.deleteMovie);
  
  // Buscar la película con useMemo
  const movie = useMemo(() => {
    return movies.find(m => m.id === id);
  }, [movies, id]);

  if (!movie) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Película no encontrada
          </Text>
          <Button title="Volver" onPress={() => router.back()} />
        </View>
      </View>
    );
  }

  const handleDelete = async () => {
    await deleteMovie(movie.id);
    router.back();
  };

  const handleToggleFavorite = async () => {
    await toggleFavorite(movie.id);
  };

  // Validar si tiene póster válido
  const posterUri = movie.customPosterUri || movie.posterPath;
  const hasValidPoster = posterUri && posterUri !== 'N/A' && posterUri.length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Ionicons name="close" size={28} color={colors.text} />
      </TouchableOpacity>

      <ScrollView>
        {hasValidPoster ? (
          <Image
            source={{ uri: posterUri }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.posterPlaceholder, { backgroundColor: colors.border }]}>
            <Ionicons name="film-outline" size={80} color={colors.textSecondary} />
            <Text style={[styles.noImageText, { color: colors.textSecondary }]}>
              Sin póster
            </Text>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              {movie.title}
            </Text>
            <TouchableOpacity onPress={handleToggleFavorite}>
              <Ionicons
                name={movie.isFavorite ? 'heart' : 'heart-outline'}
                size={32}
                color={movie.isFavorite ? colors.favorite : colors.text}
              />
            </TouchableOpacity>
          </View>

          {movie.releaseDate && (
            <Text style={[styles.date, { color: colors.textSecondary }]}>
              {new Date(movie.releaseDate).getFullYear()}
            </Text>
          )}

          {movie.myRating && (
            <View style={styles.rating}>
              <Ionicons name="star" size={20} color={colors.favorite} />
              <Text style={[styles.ratingText, { color: colors.text }]}>
                {movie.myRating}/10
              </Text>
            </View>
          )}

          {movie.overview && (
            <Text style={[styles.overview, { color: colors.text }]}>
              {movie.overview}
            </Text>
          )}

          {movie.notes && (
            <TouchableOpacity onPress={() => setShowNotes(!showNotes)}>
              <View style={[styles.notesButton, { backgroundColor: colors.surface }]}>
                <Ionicons name="document-text" size={20} color={colors.primary} />
                <Text style={[styles.notesButtonText, { color: colors.text }]}>
                  {showNotes ? 'Ocultar' : 'Ver'} mis notas
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <Button
            title="Eliminar película"
            onPress={handleDelete}
            style={{ ...styles.deleteButton, borderColor: colors.error }}
          />
        </View>
      </ScrollView>

      {showNotes && movie.notes && (
        <AnimatedNoteCard
          notes={movie.notes}
          onClose={() => setShowNotes(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  poster: {
    width: '100%',
    height: 500,
  },
  posterPlaceholder: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
  },
  date: {
    fontSize: 16,
    marginTop: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '600',
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  notesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  notesButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
  },
});