import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { signUpWithEmail } from '../services/authService';
import { isUsernameAvailable } from '../services/userService';
import { handleError } from '../utils/errorHandler';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('personal'); // 'personal' or 'company'
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (username.length < 3) {
      Alert.alert('Error', 'Username must be at least 3 characters long');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Check if username is available
      const usernameIsAvailable = await isUsernameAvailable(username);
      if (!usernameIsAvailable) {
        Alert.alert('Error', 'This username is already taken. Please choose another.');
        setLoading(false);
        return;
      }

      // Create account
      await signUpWithEmail(email, password, username, accountType);

      // Navigate to ProfilePic screen
      navigation.navigate('ProfilePic');
    } catch (error) {
      Alert.alert('Signup Failed', handleError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>tiipstr</Text>
            <Text style={styles.signupText}>create account</Text>
          </View>

          <View style={styles.accountTypeContainer}>
            <Text style={styles.accountTypeLabel}>Account Type</Text>
            <View style={styles.accountTypeButtons}>
              <TouchableOpacity
                style={[
                  styles.accountTypeButton,
                  accountType === 'personal' && styles.accountTypeButtonActive,
                ]}
                onPress={() => setAccountType('personal')}
              >
                <Text
                  style={[
                    styles.accountTypeButtonText,
                    accountType === 'personal' && styles.accountTypeButtonTextActive,
                  ]}
                >
                  👤 Personal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.accountTypeButton,
                  accountType === 'company' && styles.accountTypeButtonActive,
                ]}
                onPress={() => setAccountType('company')}
              >
                <Text
                  style={[
                    styles.accountTypeButtonText,
                    accountType === 'company' && styles.accountTypeButtonTextActive,
                  ]}
                >
                  🏢 Company
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.background} />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.loginText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  signupText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.body.fontSize,
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.background,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  loginText: {
    color: colors.primary,
    fontSize: typography.small.fontSize,
  },
  accountTypeContainer: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  accountTypeLabel: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.sm,
    color: colors.text,
  },
  accountTypeButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  accountTypeButton: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  accountTypeButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  accountTypeButtonText: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  accountTypeButtonTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});
