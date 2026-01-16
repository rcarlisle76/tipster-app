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
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { useAuth } from '../hooks/useAuth';
import { createPost } from '../services/postService';
import CompanySearchModal from '../components/CompanySearchModal';

export default function PostScreen({ navigation }) {
  const { currentUser, userProfile } = useAuth();
  const [postContent, setPostContent] = useState('');
  const [taggedCompany, setTaggedCompany] = useState(null);
  const [showCompanySearch, setShowCompanySearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!postContent.trim()) {
      Alert.alert('Error', 'Please enter some content for your post');
      return;
    }

    try {
      setLoading(true);
      await createPost(
        currentUser.uid,
        userProfile.username || 'Anonymous',
        postContent.trim(),
        null, // imageUrl
        taggedCompany // tagged company
      );
      console.log('Post created successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCompany = (company) => {
    setTaggedCompany(company);
  };

  const handleRemoveCompany = () => {
    setTaggedCompany(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>tiipstr</Text>
        <TouchableOpacity onPress={handlePost} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text style={styles.postButton}>Post</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Share your service complaint</Text>

        <TouchableOpacity
          style={styles.tagCompanyButton}
          onPress={() => setShowCompanySearch(true)}
        >
          <Text style={styles.tagCompanyIcon}>🏢</Text>
          <Text style={styles.tagCompanyText}>
            {taggedCompany ? 'Change Company' : 'Tag Company (Optional)'}
          </Text>
        </TouchableOpacity>

        {taggedCompany && (
          <View style={styles.taggedCompanyContainer}>
            <View style={styles.taggedCompanyInfo}>
              <Text style={styles.taggedCompanyLabel}>Tagged:</Text>
              <Text style={styles.taggedCompanyName}>
                {taggedCompany.displayName || taggedCompany.username}
              </Text>
            </View>
            <TouchableOpacity onPress={handleRemoveCompany}>
              <Text style={styles.removeButton}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.imageUpload}>
          <Text style={styles.imagePlaceholder}>📷</Text>
          <Text style={styles.imageText}>Add Photo (Optional)</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Describe your experience with this service..."
          value={postContent}
          onChangeText={setPostContent}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
      </ScrollView>

      <CompanySearchModal
        visible={showCompanySearch}
        onClose={() => setShowCompanySearch(false)}
        onSelectCompany={handleSelectCompany}
      />
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
  cancelButton: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  title: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: 'bold',
  },
  postButton: {
    fontSize: typography.body.fontSize,
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  label: {
    fontSize: typography.body.fontSize,
    marginBottom: spacing.md,
    color: colors.textSecondary,
  },
  imageUpload: {
    height: 120,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  imagePlaceholder: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  imageText: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.body.fontSize,
    minHeight: 150,
  },
  tagCompanyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  tagCompanyIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  tagCompanyText: {
    fontSize: typography.body.fontSize,
    color: colors.primary,
    fontWeight: '600',
  },
  taggedCompanyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary + '15',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  taggedCompanyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taggedCompanyLabel: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
  taggedCompanyName: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.primary,
  },
  removeButton: {
    fontSize: 20,
    color: colors.textSecondary,
    paddingHorizontal: spacing.sm,
  },
});
