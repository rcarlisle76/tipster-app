import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

export default function ProfilePicScreen({ navigation }) {
  const handleChoosePicture = () => {
    console.log('Choose picture pressed');
    // TODO: Implement image picker
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>tiipstr</Text>
        <Text style={styles.subtitle}>Upload your profile picture</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarPlaceholder}>👤</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleChoosePicture}>
          <Text style={styles.buttonText}>Choose Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingTop: spacing.xxl,
    marginBottom: spacing.xxl,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  avatarContainer: {
    marginBottom: spacing.xxl,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.inputBackground,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    fontSize: 60,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  buttonText: {
    color: colors.background,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: spacing.md,
  },
  skipText: {
    color: colors.textSecondary,
    fontSize: typography.small.fontSize,
  },
});
