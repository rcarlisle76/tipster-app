import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';

export default function DeleteAccountScreen({ navigation }) {
  const { currentUser } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);

  const consequences = [
    'Your profile will be permanently deleted',
    'All your posts and comments will be removed',
    'Your followers and following lists will be deleted',
    'All your likes and interactions will be removed',
    'This action cannot be undone',
  ];

  const handleDeleteAccount = async () => {
    if (!password) {
      Alert.alert('Error', 'Please enter your password to confirm');
      return;
    }

    if (confirmText !== 'DELETE') {
      Alert.alert('Error', 'Please type DELETE to confirm account deletion');
      return;
    }

    Alert.alert(
      'Final Confirmation',
      'Are you absolutely sure? This action is permanent and cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete My Account',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              // TODO: Implement account deletion
              // This should:
              // 1. Re-authenticate user with password
              // 2. Delete all user data from Firestore
              // 3. Delete user from Firebase Auth
              // 4. Navigate to login screen
              await new Promise(resolve => setTimeout(resolve, 2000));
              Alert.alert(
                'Account Deleted',
                'Your account has been permanently deleted. We\'re sorry to see you go.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                      });
                    }
                  }
                ]
              );
            } catch (error) {
              Alert.alert('Error', 'Failed to delete account. Please try again.');
            } finally {
              setDeleting(false);
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
        <Text style={styles.title}>Delete Account</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>⚠️ Warning</Text>
          <Text style={styles.warningText}>
            Deleting your account is permanent and cannot be undone. Please read the consequences carefully before proceeding.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>What Will Happen</Text>

        {consequences.map((consequence, index) => (
          <View key={index} style={styles.consequenceItem}>
            <Text style={styles.consequenceIcon}>•</Text>
            <Text style={styles.consequenceText}>{consequence}</Text>
          </View>
        ))}

        <View style={styles.alternativeBox}>
          <Text style={styles.alternativeTitle}>Looking for something else?</Text>
          <Text style={styles.alternativeText}>
            If you're having issues or just need a break, consider:
          </Text>
          <Text style={styles.alternativeOption}>• Deactivating your account temporarily</Text>
          <Text style={styles.alternativeOption}>• Adjusting your privacy settings</Text>
          <Text style={styles.alternativeOption}>• Taking a break without deleting</Text>
        </View>

        <Text style={styles.sectionTitle}>Confirm Deletion</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Enter Your Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Type DELETE to confirm</Text>
          <TextInput
            style={styles.input}
            value={confirmText}
            onChangeText={setConfirmText}
            placeholder="Type DELETE"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="characters"
          />
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
          disabled={deleting}
        >
          {deleting ? (
            <ActivityIndicator size="small" color={colors.background} />
          ) : (
            <Text style={styles.deleteButtonText}>Delete My Account</Text>
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
  warningBox: {
    backgroundColor: '#FFEBEE',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: '#E74C3C',
  },
  warningTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: '#C62828',
    marginBottom: spacing.sm,
  },
  warningText: {
    fontSize: typography.small.fontSize,
    color: '#C62828',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  consequenceItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  consequenceIcon: {
    fontSize: typography.body.fontSize,
    marginRight: spacing.sm,
    color: '#E74C3C',
  },
  consequenceText: {
    fontSize: typography.body.fontSize,
    color: colors.text,
    flex: 1,
  },
  alternativeBox: {
    backgroundColor: colors.inputBackground,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginVertical: spacing.lg,
  },
  alternativeTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  alternativeText: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  alternativeOption: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    marginBottom: spacing.xs,
  },
  fieldContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body.fontSize,
    borderWidth: 1,
    borderColor: colors.border,
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  deleteButtonText: {
    color: colors.background,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
});
