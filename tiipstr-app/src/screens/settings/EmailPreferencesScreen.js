import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

export default function EmailPreferencesScreen({ navigation }) {
  const [emailPreferences, setEmailPreferences] = useState({
    newFollowers: true,
    comments: true,
    likes: false,
    mentions: true,
    directMessages: true,
    weeklyDigest: true,
    productUpdates: false,
    promotions: false,
    newsletter: true,
  });

  const togglePreference = (key) => {
    setEmailPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const emailCategories = [
    {
      title: 'Activity Notifications',
      preferences: [
        {
          key: 'newFollowers',
          label: 'New Followers',
          description: 'When someone follows you',
        },
        {
          key: 'comments',
          label: 'Comments',
          description: 'When someone comments on your posts',
        },
        {
          key: 'likes',
          label: 'Likes',
          description: 'When someone likes your posts',
        },
        {
          key: 'mentions',
          label: 'Mentions',
          description: 'When someone mentions you in a post',
        },
        {
          key: 'directMessages',
          label: 'Direct Messages',
          description: 'When you receive a new message',
        },
      ],
    },
    {
      title: 'Digests & Updates',
      preferences: [
        {
          key: 'weeklyDigest',
          label: 'Weekly Digest',
          description: 'Weekly summary of your activity',
        },
        {
          key: 'productUpdates',
          label: 'Product Updates',
          description: 'New features and improvements',
        },
        {
          key: 'newsletter',
          label: 'Newsletter',
          description: 'Tips and community highlights',
        },
      ],
    },
    {
      title: 'Marketing',
      preferences: [
        {
          key: 'promotions',
          label: 'Promotions',
          description: 'Special offers and discounts',
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Email Preferences</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Choose what emails you want to receive from Tiipstr. You can always change these settings later.
          </Text>
        </View>

        {emailCategories.map((category, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{category.title}</Text>
            {category.preferences.map((pref) => (
              <View key={pref.key} style={styles.preferenceItem}>
                <View style={styles.preferenceInfo}>
                  <Text style={styles.preferenceLabel}>{pref.label}</Text>
                  <Text style={styles.preferenceDescription}>
                    {pref.description}
                  </Text>
                </View>
                <Switch
                  value={emailPreferences[pref.key]}
                  onValueChange={() => togglePreference(pref.key)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.background}
                />
              </View>
            ))}
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
  infoBox: {
    backgroundColor: colors.inputBackground,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  infoText: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  preferenceInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  preferenceLabel: {
    fontSize: typography.body.fontSize,
    marginBottom: spacing.xs,
  },
  preferenceDescription: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
});
