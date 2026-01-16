import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

export default function PrivacyScreen({ navigation }) {
  const [privacySettings, setPrivacySettings] = useState({
    privateAccount: false,
    activityStatus: true,
    readReceipts: true,
    allowSearchByEmail: false,
    allowSearchByPhone: false,
    showFollowersCount: true,
    showFollowingCount: true,
  });

  const toggleSetting = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const privacyCategories = [
    {
      title: 'Account Privacy',
      items: [
        {
          key: 'privateAccount',
          label: 'Private Account',
          description: 'Only approved followers can see your posts',
        },
      ],
    },
    {
      title: 'Activity',
      items: [
        {
          key: 'activityStatus',
          label: 'Activity Status',
          description: 'Show when you\'re active on Tiipstr',
        },
        {
          key: 'readReceipts',
          label: 'Read Receipts',
          description: 'Let people know when you\'ve read their messages',
        },
      ],
    },
    {
      title: 'Discoverability',
      items: [
        {
          key: 'allowSearchByEmail',
          label: 'Email Lookup',
          description: 'Let people find you by your email address',
        },
        {
          key: 'allowSearchByPhone',
          label: 'Phone Lookup',
          description: 'Let people find you by your phone number',
        },
      ],
    },
    {
      title: 'Profile Visibility',
      items: [
        {
          key: 'showFollowersCount',
          label: 'Show Followers Count',
          description: 'Display your follower count on your profile',
        },
        {
          key: 'showFollowingCount',
          label: 'Show Following Count',
          description: 'Display your following count on your profile',
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
        <Text style={styles.title}>Privacy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Control how others can interact with you and what information is visible on your profile.
          </Text>
        </View>

        {privacyCategories.map((category, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{category.title}</Text>
            {category.items.map((item) => (
              <View key={item.key} style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Text style={styles.settingDescription}>
                    {item.description}
                  </Text>
                </View>
                <Switch
                  value={privacySettings[item.key]}
                  onValueChange={() => toggleSetting(item.key)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.background}
                />
              </View>
            ))}
          </View>
        ))}

        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>ℹ️ Privacy Note</Text>
          <Text style={styles.noteText}>
            Even with a private account, your profile picture and bio are visible to everyone. Your posts and followers/following lists will only be visible to approved followers.
          </Text>
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
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  settingItem: {
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
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingLabel: {
    fontSize: typography.body.fontSize,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  noteBox: {
    backgroundColor: '#E3F2FD',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  noteTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: spacing.sm,
  },
  noteText: {
    fontSize: typography.small.fontSize,
    color: '#1976D2',
    lineHeight: 20,
  },
});
