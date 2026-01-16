import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

export default function HelpScreen({ navigation }) {
  const helpTopics = [
    { id: 1, title: 'Getting Started', icon: '🚀' },
    { id: 2, title: 'Account Settings', icon: '⚙️' },
    { id: 3, title: 'Creating Posts', icon: '✏️' },
    { id: 4, title: 'Privacy & Safety', icon: '🔒' },
    { id: 5, title: 'Contact Support', icon: '💬' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>HELP</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchSection}>
          <Text style={styles.searchPlaceholder}>🔍 Search for help</Text>
        </View>

        <Text style={styles.sectionTitle}>Popular Topics</Text>

        {helpTopics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={styles.topicCard}
            onPress={() => navigation.navigate('HelpDetail', { topic: topic.title })}
          >
            <Text style={styles.topicIcon}>{topic.icon}</Text>
            <Text style={styles.topicTitle}>{topic.title}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.contactText}>
            Contact us at support@tiipstr.com
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
    fontSize: typography.title.fontSize,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  searchSection: {
    margin: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchPlaceholder: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: '600',
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topicIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  topicTitle: {
    flex: 1,
    fontSize: typography.body.fontSize,
  },
  arrow: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  contactSection: {
    margin: spacing.md,
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  contactText: {
    fontSize: typography.body.fontSize,
    color: colors.primary,
  },
});
