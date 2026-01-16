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

export default function NotificationsScreen({ navigation }) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [notifications, setNotifications] = useState({
    newFollowers: true,
    comments: true,
    likes: false,
    mentions: true,
    directMessages: true,
    posts: false,
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationCategories = [
    {
      title: 'Social Activity',
      items: [
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
          description: 'When someone mentions you',
        },
      ],
    },
    {
      title: 'Messages & Posts',
      items: [
        {
          key: 'directMessages',
          label: 'Direct Messages',
          description: 'When you receive a new message',
        },
        {
          key: 'posts',
          label: 'Post Updates',
          description: 'When people you follow post',
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
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Choose what notifications you want to receive. You can turn off all notifications or customize by type.
          </Text>
        </View>

        <View style={styles.mainToggle}>
          <View style={styles.mainToggleInfo}>
            <Text style={styles.mainToggleTitle}>🔔 Push Notifications</Text>
            <Text style={styles.mainToggleDescription}>
              Enable or disable all push notifications
            </Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.background}
          />
        </View>

        {pushEnabled && (
          <>
            {notificationCategories.map((category, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>{category.title}</Text>
                {category.items.map((item) => (
                  <View key={item.key} style={styles.notificationItem}>
                    <View style={styles.notificationInfo}>
                      <Text style={styles.notificationLabel}>{item.label}</Text>
                      <Text style={styles.notificationDescription}>
                        {item.description}
                      </Text>
                    </View>
                    <Switch
                      value={notifications[item.key]}
                      onValueChange={() => toggleNotification(item.key)}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={colors.background}
                    />
                  </View>
                ))}
              </View>
            ))}
          </>
        )}

        {!pushEnabled && (
          <View style={styles.disabledState}>
            <Text style={styles.disabledStateText}>
              Push notifications are currently disabled. Enable them above to customize notification preferences.
            </Text>
          </View>
        )}
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
  mainToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mainToggleInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  mainToggleTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  mainToggleDescription: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  notificationItem: {
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
  notificationInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  notificationLabel: {
    fontSize: typography.body.fontSize,
    marginBottom: spacing.xs,
  },
  notificationDescription: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  disabledState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  disabledStateText: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
});
