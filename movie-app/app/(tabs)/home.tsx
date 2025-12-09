import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from '@/src/hooks/useTheme';
import { useMoviesStore } from '@/src/stores/useMoviesStore';
import { useSettingsStore } from '@/src/stores/useSettingsStore';
import { useShakeDetector } from '@/src/hooks/useShakeDetector';
import SearchBar from '@/src/components/ui/SearchBar';
import MovieCard from '@/src/components/movies/MovieCard';
import EmptyState from '@/src/components/ui/EmptyState';
import FAB from '@/src/components/ui/FAB';
import BottomSheet from '@/src/components/ui/BottomSheet';
import MovieForm from '@/src/components/movies/MovieForm';
import React from 'react';

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  
  // Separar las suscripciones del store
  const movies = useMoviesStore(state => state.movies);
  const searchQuery = useMoviesStore(state => state.searchQuery);
  const setSearchQuery = useMoviesStore(state => state.setSearchQuery);
  const loadMovies = useMoviesStore(state => state.loadMovies);
  const getRandomMovie = useMoviesStore(state => state.getRandomMovie);
  const getFilteredMovies = useMoviesStore(state => state.getFilteredMovies);
  const shakeEnabled = useSettingsStore(state => state.shakeEnabled);

  // Calcular películas filtradas con useMemo
  const filteredMovies = useMemo(() => {
    return getFilteredMovies();
  }, [movies, searchQuery, getFilteredMovies]);

  useShakeDetector(() => {
    const randomMovie = getRandomMovie();
    if (randomMovie) {
      router.push(`/movie/${randomMovie.id}`);
    }
  }, shakeEnabled);

  useEffect(() => {
    loadMovies();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMovies();
    setRefreshing(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar películas..."
      />

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => router.push(`/movie/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            icon="film-outline"
            title="No hay películas"
            message="Agrega tu primera película"
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <FAB icon="add" onPress={() => setSheetVisible(true)} />

      <BottomSheet visible={sheetVisible} onClose={() => setSheetVisible(false)}>
        <MovieForm onSuccess={() => setSheetVisible(false)} />
      </BottomSheet>
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