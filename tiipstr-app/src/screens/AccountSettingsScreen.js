import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors, spacing, typography } from '../constants/theme';
import { useAuth } from '../hooks/useAuth';

export default function AccountSettingsScreen({ navigation }) {
  const { userProfile } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Account Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Edit Profile</Text>
              <Text style={styles.settingDescription}>Update your display name and bio</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('ProfilePhoto')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Profile Photo</Text>
              <Text style={styles.settingDescription}>Change your profile picture</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Change Password</Text>
              <Text style={styles.settingDescription}>Update your account password</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('TwoFactorAuth')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Two-Factor Authentication</Text>
              <Text style={styles.settingDescription}>Add an extra layer of security</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('LoginActivity')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Login Activity</Text>
              <Text style={styles.settingDescription}>See where you're logged in</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Posts & Tagging</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('PostVisibility')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Post Visibility</Text>
              <Text style={styles.settingDescription}>Control who can see your posts</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('TaggingSettings')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Tagging</Text>
              <Text style={styles.settingDescription}>Control who can tag you in posts</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('CommentsSettings')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Comments</Text>
              <Text style={styles.settingDescription}>Control who can comment on your posts</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment & Billing</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('PaymentMethods')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Payment Methods</Text>
              <Text style={styles.settingDescription}>Manage credit cards and payment options</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('BillingHistory')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Billing History</Text>
              <Text style={styles.settingDescription}>View past transactions and invoices</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('Subscription')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Subscription</Text>
              <Text style={styles.settingDescription}>Manage your premium subscription</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Management</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('EmailPreferences')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Email Preferences</Text>
              <Text style={styles.settingDescription}>Choose what emails you receive</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('BlockedUsers')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Blocked Users</Text>
              <Text style={styles.settingDescription}>Manage blocked accounts</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('DownloadData')}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>Download Your Data</Text>
              <Text style={styles.settingDescription}>Request a copy of your information</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, styles.dangerItem]}
            onPress={() => navigation.navigate('DeleteAccount')}
          >
            <View style={styles.settingInfo}>
              <Text style={[styles.settingText, styles.dangerText]}>Delete Account</Text>
              <Text style={styles.settingDescription}>Permanently delete your account</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
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
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.small.fontSize,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  settingInfo: {
    flex: 1,
  },
  settingText: {
    fontSize: typography.body.fontSize,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  chevron: {
    fontSize: 24,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  dangerItem: {
    marginTop: spacing.lg,
  },
  dangerText: {
    color: '#E74C3C',
  },
});
