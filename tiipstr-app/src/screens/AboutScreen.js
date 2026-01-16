import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

export default function AboutScreen({ navigation }) {
  const handleLinkPress = async (url, title) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Unable to open ${title}`);
      }
    } catch (error) {
      Alert.alert('Error', `Failed to open ${title}`);
    }
  };

  const appInfo = [
    { label: 'Version', value: '1.0.0' },
    { label: 'Build', value: '2024.12.001' },
  ];

  const links = [
    { title: 'Terms of Service', icon: '📄', url: 'https://tiipstr.com/terms' },
    { title: 'Privacy Policy', icon: '🔒', url: 'https://tiipstr.com/privacy' },
    { title: 'Community Guidelines', icon: '👥', url: 'https://tiipstr.com/guidelines' },
    { title: 'Licenses', icon: '⚖️', url: 'https://tiipstr.com/licenses' },
  ];

  const contactLinks = [
    { title: 'Contact Us', icon: '✉️', url: 'mailto:support@tiipstr.com' },
    { title: 'Report a Problem', icon: '🐛', url: 'mailto:support@tiipstr.com?subject=Problem Report' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>T</Text>
          </View>
          <Text style={styles.appName}>Tiipstr</Text>
          <Text style={styles.tagline}>Share your service experiences</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          {appInfo.map((item, index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal & Policies</Text>
          {links.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={styles.linkItem}
              onPress={() => handleLinkPress(link.url, link.title)}
            >
              <View style={styles.linkInfo}>
                <Text style={styles.linkIcon}>{link.icon}</Text>
                <Text style={styles.linkText}>{link.title}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Tiipstr</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>
              Tiipstr is a platform for sharing honest reviews and experiences about services.
              Our mission is to help people make informed decisions by reading real feedback
              from other customers.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact & Support</Text>
          {contactLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={styles.linkItem}
              onPress={() => handleLinkPress(link.url, link.title)}
            >
              <View style={styles.linkInfo}>
                <Text style={styles.linkIcon}>{link.icon}</Text>
                <Text style={styles.linkText}>{link.title}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Tiipstr. All rights reserved.
          </Text>
          <Text style={styles.footerText}>
            Made with ❤️ for honest reviews
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
  logoContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.background,
  },
  appName: {
    fontSize: typography.title.fontSize,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  tagline: {
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoLabel: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
  linkItem: {
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
  linkInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  linkText: {
    fontSize: typography.body.fontSize,
  },
  chevron: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  descriptionBox: {
    backgroundColor: colors.inputBackground,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  descriptionText: {
    fontSize: typography.body.fontSize,
    color: colors.text,
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginTop: spacing.lg,
  },
  footerText: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
});
