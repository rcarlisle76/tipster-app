import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

export default function MyReviewsScreen({ navigation }) {
  const reviews = [
    {
      id: 1,
      place: 'Coffee House',
      rating: 5,
      comment: 'Amazing coffee and great atmosphere!',
      date: '2 days ago',
    },
    {
      id: 2,
      place: 'Pizza Corner',
      rating: 4,
      comment: 'Best pizza in town, highly recommend',
      date: '1 week ago',
    },
    {
      id: 3,
      place: 'Sushi Bar',
      rating: 5,
      comment: 'Fresh ingredients and excellent service',
      date: '2 weeks ago',
    },
  ];

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My reviews</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.placeName}>{review.place}</Text>
              <Text style={styles.date}>{review.date}</Text>
            </View>
            <Text style={styles.stars}>{renderStars(review.rating)}</Text>
            <Text style={styles.comment}>{review.comment}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 24,
  },
  title: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  reviewCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  placeName: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
  date: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  stars: {
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  comment: {
    fontSize: typography.body.fontSize,
    color: colors.text,
    lineHeight: 20,
  },
});
