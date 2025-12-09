import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTheme } from '@/src/hooks/useTheme';
import { useMoviesStore } from '@/src/stores/useMoviesStore';
import MovieCard from '@/src/components/movies/MovieCard';
import EmptyState from '@/src/components/ui/EmptyState';
import React from 'react';

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const movies = useMoviesStore(state => state.movies);

  // Calcular favoritas con useMemo para evitar re-renders
  const favoriteMovies = useMemo(() => {
    return movies.filter(m => m.isFavorite);
  }, [movies]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={favoriteMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => router.push(/movie/${item.id})}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            icon="heart-outline"
            title="Sin favoritas"
            message="Marca películas como favoritas"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  list: {
    padding: 16,
    gap: 12,
  },
});