import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, spacing, typography } from '../constants/theme';
import { useAuth } from '../hooks/useAuth';
import { getUserPosts } from '../services/postService';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function MeScreen({ navigation }) {
  const { currentUser, userProfile } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      if (currentUser) {
        fetchPosts();
      }
    }, [currentUser])
  );

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const userPosts = await getUserPosts(currentUser.uid);
      setPosts(userPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPostContent = (content, post) => {
    // Split content by @mentions
    const mentionRegex = /@(\w+)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = mentionRegex.exec(content)) !== null) {
      // Add text before the mention
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.substring(lastIndex, match.index)
        });
      }

      // Add the mention
      parts.push({
        type: 'mention',
        content: match[0],
        username: match[1]
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex)
      });
    }

    return (
      <Text style={styles.postText} numberOfLines={2}>
        {parts.map((part, index) => {
          if (part.type === 'mention') {
            return (
              <Text
                key={index}
                style={styles.mention}
                onPress={() => {
                  // Navigate to the tagged company profile if available
                  if (post.taggedCompany && post.taggedCompany.username === part.username) {
                    navigation.navigate('UserProfile', {
                      userId: post.taggedCompany.userId,
                      username: post.taggedCompany.username,
                    });
                  }
                }}
              >
                {part.content}
              </Text>
            );
          } else {
            return <Text key={index}>{part.content}</Text>;
          }
        })}
      </Text>
    );
  };

  if (!userProfile) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{userProfile.username || 'User'}</Text>
          {userProfile.accountType === 'company' && (
            <Text style={styles.verifiedBadge}>✓</Text>
          )}
        </View>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.profileSection}>
        {userProfile.profilePicUrl ? (
          <Image
            source={{ uri: userProfile.profilePicUrl }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
        )}

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.postsCount || 0}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => navigation.navigate('Followers')}
          >
            <Text style={styles.statNumber}>{userProfile.followersCount || 0}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => navigation.navigate('Following')}
          >
            <Text style={styles.statNumber}>{userProfile.followingCount || 0}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.postsContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : posts.length === 0 ? (
          <EmptyState
            icon="📝"
            title="No posts yet"
            message="Share your first tip with the community!"
          />
        ) : (
          <View style={styles.postsGrid}>
            {posts.map((post) => (
              <View key={post.postId} style={styles.postCard}>
                {post.imageUrl ? (
                  <Image
                    source={{ uri: post.imageUrl }}
                    style={styles.postImage}
                    resizeMode="cover"
                    onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
                  />
                ) : (
                  <View style={styles.postImagePlaceholder}>
                    <Text style={styles.postEmoji}>📸</Text>
                  </View>
                )}
                {renderPostContent(post.content, post)}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SearchResults')}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Post')}>
          <Text style={styles.navIcon}>➕</Text>
          <Text style={styles.navLabel}>Post</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>👤</Text>
          <Text style={styles.navLabelActive}>Profile</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingsIcon: {
    fontSize: 24,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  username: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: 'bold',
  },
  verifiedBadge: {
    fontSize: 16,
    color: '#1DA1F2',
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24,
  },
  profileSection: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  editButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
  postsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.xs,
  },
  postCard: {
    width: '48%',
    margin: '1%',
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    padding: spacing.sm,
  },
  postImage: {
    width: '100%',
    height: 120,
    borderRadius: 6,
    marginBottom: spacing.sm,
  },
  postImagePlaceholder: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 6,
    marginBottom: spacing.sm,
  },
  postEmoji: {
    fontSize: 32,
  },
  postText: {
    fontSize: typography.small.fontSize,
    color: colors.text,
  },
  mention: {
    color: colors.primary,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  navItem: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  navIconActive: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  navLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  navLabelActive: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
});
