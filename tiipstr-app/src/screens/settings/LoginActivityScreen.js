import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

export default function LoginActivityScreen({ navigation }) {
  // Only show current session - real session tracking would require additional implementation
  const loginSessions = [
    {
      id: '1',
      device: 'Current Device',
      location: 'Your current location',
      timestamp: 'Active now',
      isCurrent: true,
    },
  ];

  const handleLogoutSession = (sessionId, device) => {
    Alert.alert(
      'End Session',
      `Are you sure you want to log out of ${device}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Session ended successfully');
          }
        }
      ]
    );
  };

  const handleLogoutAll = () => {
    Alert.alert(
      'Log Out All Sessions',
      'This will log you out of all devices except this one. You\'ll need to log in again on those devices.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out All',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Logged out of all other sessions');
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
        <Text style={styles.title}>Login Activity</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Your current active session is shown below. Additional session tracking across multiple devices is not currently enabled.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Active Sessions</Text>

        {loginSessions.map((session) => (
          <View key={session.id} style={styles.sessionItem}>
            <View style={styles.sessionInfo}>
              <Text style={styles.deviceText}>{session.device}</Text>
              <Text style={styles.locationText}>{session.location}</Text>
              <Text style={styles.timestampText}>{session.timestamp}</Text>
            </View>
            {session.isCurrent && (
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>Active</Text>
              </View>
            )}
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
  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sessionInfo: {
    flex: 1,
  },
  deviceText: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  locationText: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  timestampText: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  logoutButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: '#E74C3C',
  },
  logoutButtonText: {
    fontSize: typography.small.fontSize,
    color: '#E74C3C',
  },
  currentBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
  },
  currentBadgeText: {
    fontSize: typography.small.fontSize,
    color: colors.background,
    fontWeight: '600',
  },
  logoutAllButton: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: '#E74C3C',
  },
  logoutAllButtonText: {
    fontSize: typography.body.fontSize,
    color: '#E74C3C',
    fontWeight: '600',
  },
});
