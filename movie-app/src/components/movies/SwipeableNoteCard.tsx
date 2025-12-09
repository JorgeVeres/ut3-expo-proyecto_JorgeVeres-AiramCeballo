import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Movie } from '../../types/movie';
import { useTheme } from '../../hooks/useTheme';
import { spacing, borderRadius } from '../../theme/spacing';
import { textStyles } from '../../theme/typography';
import { truncateText, getRatingStars, getYear } from '../../utils/movieUtils';

interface SwipeableMovieCardProps {
  movie: Movie;
  onPress: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}

export const SwipeableMovieCard: React.FC<SwipeableMovieCardProps> = ({
  movie,
  onPress,
  onDelete,
  onToggleFavorite,
}) => {
  const { colors } = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(lastOffset.current + gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = -80;
        
        if (gestureState.dx < threshold) {
          // Swipe left -> show delete
          Animated.spring(translateX, {
            toValue: -80,
            useNativeDriver: true,
          }).start();
          lastOffset.current = -80;
        } else {
          // Reset
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          lastOffset.current = 0;
        }
      },
    })
  ).current;

  const posterUri = movie.customPosterUri || movie.posterPath;

  return (
    <View style={styles.container}>
      {/* Delete button (behind card) */}
      <View style={[styles.deleteButton, { backgroundColor: colors.error }]}>
        <Ionicons name="trash-outline" size={24} color="#FFF" />
      </View>

      {/* Card */}
      <Animated.View
        style={[
          styles.card,
          { 
            backgroundColor: colors.surface,
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Pressable
          style={styles.cardContent}
          onPress={onPress}
          android_ripple={{ color: colors.border }}
        >
          {/* Poster */}
          <View style={styles.posterContainer}>
            {posterUri ? (
              <Image
                source={{ uri: posterUri }}
                style={styles.poster}
                contentFit="cover"
                transition={200}
              />
            ) : (
              <View style={[styles.posterPlaceholder, { backgroundColor: colors.border }]}>
                <Ionicons name="film-outline" size={40} color={colors.textSecondary} />
              </View>
            )}
          </View>

          {/* Info */}
          <View style={styles.info}>
            <View style={styles.header}>
              <Text 
                style={[styles.title, { color: colors.text }]} 
                numberOfLines={2}
              >
                {movie.title}
              </Text>
              
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                hitSlop={8}
              >
                <Ionicons
                  name={movie.isFavorite ? 'star' : 'star-outline'}
                  size={24}
                  color={movie.isFavorite ? colors.favorite : colors.textSecondary}
                />
              </Pressable>
            </View>

            <Text style={[styles.year, { color: colors.textSecondary }]}>
              {getYear(movie.releaseDate)}
            </Text>

            {movie.overview && (
              <Text 
                style={[styles.overview, { color: colors.textSecondary }]} 
                numberOfLines={2}
              >
                {truncateText(movie.overview, 100)}
              </Text>
            )}

            <View style={styles.footer}>
              {movie.myRating && (
                <View style={styles.ratingContainer}>
                  <Text style={[styles.rating, { color: colors.primary }]}>
                    {getRatingStars(movie.myRating)}
                  </Text>
                  <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
                    {movie.myRating.toFixed(1)}
                  </Text>
                </View>
              )}
              
              {movie.genres && movie.genres.length > 0 && (
                <View style={[styles.genreTag, { backgroundColor: colors.border }]}>
                  <Text style={[styles.genreText, { color: colors.textSecondary }]}>
                    {movie.genres[0]}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    height: 140,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  card: {
    flex: 1,
    borderRadius: borderRadius.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    padding: spacing.md,
  },
  posterContainer: {
    width: 80,
    height: '100%',
    marginRight: spacing.md,
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.md,
  },
  posterPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  title: {
    ...textStyles.h3,
    flex: 1,
  },
  year: {
    ...textStyles.caption,
    marginTop: spacing.xs,
  },
  overview: {
    ...textStyles.bodySmall,
    flex: 1,
    marginTop: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rating: {
    fontSize: 12,
  },
  ratingText: {
    ...textStyles.caption,
    fontWeight: '600',
  },
  genreTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
  },
  genreText: {
    ...textStyles.caption,
    fontSize: 10,
  },
});