import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useTheme';
import { Movie } from '@/src/types/movie';
import React from 'react';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {(movie.posterPath || movie.customPosterUri) && (
        <Image
          source={{ uri: movie.customPosterUri || `https://image.tmdb.org/t/p/w200${movie.posterPath}` }}
          style={styles.poster}
        />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {movie.title}
          </Text>
          {movie.isFavorite && (
            <Ionicons name="heart" size={20} color={colors.favorite} />
          )}
        </View>

        {movie.releaseDate && (
          <Text style={[styles.year, { color: colors.textSecondary }]}>
            {new Date(movie.releaseDate).getFullYear()}
          </Text>
        )}

        {movie.myRating && (
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color={colors.favorite} />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {movie.myRating}/10
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  poster: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  year: {
    fontSize: 14,
    marginTop: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
});