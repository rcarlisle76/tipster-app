import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';

export default function TwoFactorAuthScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleTwoFactor = () => {
    Alert.alert(
      isEnabled ? 'Disable 2FA' : 'Enable 2FA',
      isEnabled
        ? 'Are you sure you want to disable two-factor authentication? Your account will be less secure.'
        : 'Enable two-factor authentication for extra security. You\'ll need to set up an authenticator app.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: isEnabled ? 'Disable' : 'Enable',
          onPress: () => {
            setIsEnabled(!isEnabled);
            Alert.alert(
              'Success',
              isEnabled ? '2FA has been disabled' : '2FA has been enabled'
            );
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
        <Text style={styles.title}>Two-Factor Authentication</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>🔒 Extra Security</Text>
          <Text style={styles.infoText}>
            Two-factor authentication adds an extra layer of security to your account by requiring both your password and a verification code.
          </Text>
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingText}>Enable 2FA</Text>
            <Text style={styles.settingDescription}>
              {isEnabled ? 'Your account is protected' : 'Add extra security to your account'}
            </Text>
          </View>
          <Switch
            value={isEnabled}
            onValueChange={toggleTwoFactor}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.background}
          />
        </View>

        {isEnabled && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Backup Codes</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Backup Codes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Generate New Codes</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
    padding: spacing.md,
  },
  infoBox: {
    backgroundColor: colors.inputBackground,
    padding: spacing.md,
    borderRadius: 8,
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.inputBackground,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: typography.body.fontSize,
    textAlign: 'center',
  },
});
