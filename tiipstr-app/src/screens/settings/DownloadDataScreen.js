import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

export default function DownloadDataScreen({ navigation }) {
  const [requesting, setRequesting] = useState(false);

  const dataCategories = [
    {
      title: 'Profile Information',
      description: 'Your display name, username, bio, and profile picture',
    },
    {
      title: 'Posts',
      description: 'All posts you\'ve created, including images and text',
    },
    {
      title: 'Comments',
      description: 'All comments you\'ve made on posts',
    },
    {
      title: 'Followers & Following',
      description: 'Lists of your followers and people you follow',
    },
    {
      title: 'Likes',
      description: 'Posts you\'ve liked',
    },
    {
      title: 'Account Activity',
      description: 'Login history and account settings',
    },
  ];

  const handleRequestData = async () => {
    Alert.alert(
      'Request Data Download',
      'We\'ll prepare a copy of your data and email you a download link within 48 hours. The link will be valid for 7 days.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Request Data',
          onPress: async () => {
            try {
              setRequesting(true);
              // Simulate API call
              await new Promise(resolve => setTimeout(resolve, 2000));
              Alert.alert(
                'Request Received',
                'Your data download request has been received. We\'ll send you an email with a download link within 48 hours.',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
              );
            } catch (error) {
              Alert.alert('Error', 'Failed to request data download. Please try again.');
            } finally {
              setRequesting(false);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Download Your Data</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📦 Data Export</Text>
          <Text style={styles.infoText}>
            Request a copy of your Tiipstr data. You'll receive a download link via email within 48 hours. The archive will be in JSON format and will include all your data listed below.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>What's Included</Text>

        {dataCategories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <View style={styles.categoryIcon}>
              <Text style={styles.categoryIconText}>✓</Text>
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </View>
          </View>
        ))}

        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ The download link will expire after 7 days. Make sure to download your data before it expires.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.requestButton}
          onPress={handleRequestData}
          disabled={requesting}
        >
          {requesting ? (
            <ActivityIndicator size="small" color={colors.background} />
          ) : (
            <Text style={styles.requestButtonText}>Request Data Download</Text>
          )}
        </TouchableOpacity>
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
  infoBox: {
    backgroundColor: colors.inputBackground,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  infoTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  categoryItem: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryIcon: {
    marginRight: spacing.md,
  },
  categoryIconText: {
    fontSize: 20,
    color: colors.primary,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  categoryDescription: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  warningBox: {
    backgroundColor: '#FFF3CD',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  warningText: {
    fontSize: typography.small.fontSize,
    color: '#856404',
    lineHeight: 20,
  },
  requestButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  requestButtonText: {
    fontSize: typography.body.fontSize,
    color: colors.background,
    fontWeight: '600',
  },
});
