import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

export default function HelpDetailScreen({ navigation, route }) {
  const { topic } = route.params;

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'You can reach us at:\n\nEmail: support@tiipstr.com\nPhone: 1-800-TIIPSTR',
      [
        { text: 'OK' },
        {
          text: 'Send Email',
          onPress: () => Linking.openURL('mailto:support@tiipstr.com')
        }
      ]
    );
  };

  const helpContent = {
    'Getting Started': {
      icon: '🚀',
      sections: [
        {
          title: 'Welcome to Tiipstr!',
          content: 'Tiipstr is a platform for sharing honest reviews and experiences about services. Here\'s how to get started:'
        },
        {
          title: '1. Complete Your Profile',
          content: 'Add a profile picture and bio to help others know who you are. Go to your profile and tap "Edit Profile".'
        },
        {
          title: '2. Follow People',
          content: 'Search for friends or people with similar interests. Their posts will appear in your home feed.'
        },
        {
          title: '3. Share Your Experiences',
          content: 'Tap the "+" button to create a post about a service experience. Be honest and specific!'
        },
        {
          title: '4. Engage with Others',
          content: 'Like and comment on posts that resonate with you. Help build a community of honest reviews.'
        },
      ]
    },
    'Account Settings': {
      icon: '⚙️',
      sections: [
        {
          title: 'Managing Your Account',
          content: 'Access your account settings from the profile page by tapping the settings icon.'
        },
        {
          title: 'Edit Profile',
          content: 'Change your display name, bio, and profile picture at any time from the Edit Profile screen.'
        },
        {
          title: 'Advanced Settings',
          content: 'Access security settings, payment methods, privacy controls, and more in Advanced Settings.'
        },
        {
          title: 'Change Password',
          content: 'Keep your account secure by regularly updating your password in Advanced Settings > Security > Change Password.'
        },
        {
          title: 'Two-Factor Authentication',
          content: 'Enable 2FA for extra security. This requires a verification code in addition to your password when logging in.'
        },
      ]
    },
    'Creating Posts': {
      icon: '✏️',
      sections: [
        {
          title: 'Share Your Service Experiences',
          content: 'Posts on Tiipstr should focus on reviewing and rating services you\'ve experienced.'
        },
        {
          title: 'Writing a Good Post',
          content: '• Be specific about the service and location\n• Explain what happened\n• Be honest but fair\n• Include relevant details\n• Add photos if possible'
        },
        {
          title: 'Adding Photos',
          content: 'Tap the camera icon to add photos to your post. Photos help others understand your experience better.'
        },
        {
          title: 'Post Visibility',
          content: 'Choose who can see your posts in Privacy Settings. You can make posts public, followers-only, or private.'
        },
        {
          title: 'Editing or Deleting',
          content: 'To edit or delete a post, tap the three dots on your post and select the appropriate option.'
        },
      ]
    },
    'Privacy & Safety': {
      icon: '🔒',
      sections: [
        {
          title: 'Your Privacy Matters',
          content: 'We take your privacy seriously. Here\'s how to stay safe on Tiipstr:'
        },
        {
          title: 'Privacy Settings',
          content: 'Control who can see your posts, follow you, and interact with your content in Settings > Privacy.'
        },
        {
          title: 'Blocking Users',
          content: 'If someone is bothering you, you can block them. Go to their profile and select "Block User".'
        },
        {
          title: 'Reporting Content',
          content: 'Report inappropriate posts or users by tapping the three dots and selecting "Report". Our team will review it.'
        },
        {
          title: 'Data Protection',
          content: 'Your data is encrypted and secure. You can download or delete your data anytime from Advanced Settings.'
        },
        {
          title: 'Stay Safe',
          content: '• Don\'t share personal information publicly\n• Use a strong password\n• Enable two-factor authentication\n• Be cautious about who you follow'
        },
      ]
    },
    'Contact Support': {
      icon: '💬',
      sections: [
        {
          title: 'We\'re Here to Help',
          content: 'Having trouble? Our support team is ready to assist you.'
        },
        {
          title: 'Email Support',
          content: 'Email us at support@tiipstr.com\nWe typically respond within 24 hours.'
        },
        {
          title: 'Report a Bug',
          content: 'Found a bug? Let us know! Send a detailed description to bugs@tiipstr.com with screenshots if possible.'
        },
        {
          title: 'Feedback & Suggestions',
          content: 'We love hearing your ideas! Send feedback to feedback@tiipstr.com'
        },
        {
          title: 'FAQ',
          content: 'Check our website at www.tiipstr.com/faq for answers to common questions.'
        },
      ]
    },
  };

  const currentContent = helpContent[topic] || helpContent['Getting Started'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Help</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.topicHeader}>
          <Text style={styles.topicIcon}>{currentContent.icon}</Text>
          <Text style={styles.topicTitle}>{topic}</Text>
        </View>

        {currentContent.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        <View style={styles.supportBox}>
          <Text style={styles.supportTitle}>Still need help?</Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContactSupport}
          >
            <Text style={styles.contactButtonText}>Contact Support</Text>
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
  topicHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.inputBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topicIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  topicTitle: {
    fontSize: typography.title.fontSize,
    fontWeight: 'bold',
  },
  section: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  sectionContent: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  supportBox: {
    margin: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  supportTitle: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  contactButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  contactButtonText: {
    color: colors.background,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
});
