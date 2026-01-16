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

export default function TaggingSettingsScreen({ navigation }) {
  const [whoCanTag, setWhoCanTag] = useState('everyone');
  const [reviewTags, setReviewTags] = useState(false);

  const taggingOptions = [
    {
      id: 'everyone',
      title: 'Everyone',
      description: 'Anyone can tag you in posts',
    },
    {
      id: 'followers',
      title: 'People You Follow',
      description: 'Only people you follow can tag you',
    },
    {
      id: 'nobody',
      title: 'Nobody',
      description: 'No one can tag you in posts',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Tagging</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Control who can tag you in posts and whether you want to review tags before they appear on your profile.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Who Can Tag You</Text>

        {taggingOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionItem,
              whoCanTag === option.id && styles.optionItemSelected,
            ]}
            onPress={() => setWhoCanTag(option.id)}
          >
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <View style={styles.radioButton}>
              {whoCanTag === option.id && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Review Tags</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Manually Approve Tags</Text>
              <Text style={styles.settingDescription}>
                Review tags before they appear on your profile
              </Text>
            </View>
            <Switch
              value={reviewTags}
              onValueChange={setReviewTags}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>
        </View>
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
  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  section: {
    marginTop: spacing.lg,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionItemSelected: {
    borderColor: colors.primary,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  optionDescription: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingInfo: {
    flex: 1,
  },
  settingText: {
    fontSize: typography.body.fontSize,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
});
