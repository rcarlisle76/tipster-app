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
import { getUserProfile } from '../services/userService';
import { getUserPosts } from '../services/postService';
import { followUser, unfollowUser, isFollowing } from '../services/followService';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function UserProfileScreen({ route, navigation }) {
  const { userId, username } = route.params;
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [userId])
  );

  const fetchUserData = async () => {
    try {
      setLoading(true);

      // Fetch user profile
      const profile = await getUserProfile(userId);
      console.log('Loaded profile:', profile.username, 'accountType:', profile.accountType);
      setUserProfile(profile);

      // Fetch user posts
      const userPosts = await getUserPosts(userId);
      setPosts(userPosts);

      // Check if current user is following this user
      const followingStatus = await isFollowing(currentUser.uid, userId);
      setFollowing(followingStatus);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async () => {
    try {
      setFollowLoading(true);

      if (following) {
        await unfollowUser(currentUser.uid, userId);
        setFollowing(false);
        // Update local follower count
        setUserProfile({
          ...userProfile,
          followersCount: (userProfile.followersCount || 0) - 1,
        });
      } else {
        await followUser(currentUser.uid, userId, userProfile.username);
        setFollowing(true);
        // Update local follower count
        setUserProfile({
          ...userProfile,
          followersCount: (userProfile.followersCount || 0) + 1,
        });
      }
    } catch (error) {
      console.error('Follow/unfollow error:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <EmptyState icon="😕" title="User not found" message="This user doesn't exist" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{userProfile.username || 'User'}</Text>
          {userProfile.accountType === 'company' && (
            <Text style={styles.verifiedBadge}>✓</Text>
          )}
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
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

          <Text style={styles.displayName}>{userProfile.displayName}</Text>
          <Text style={styles.usernameText}>@{userProfile.username}</Text>

          {userProfile.bio ? (
            <Text style={styles.bio}>{userProfile.bio}</Text>
          ) : null}

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile.postsCount || 0}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile.followersCount || 0}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile.followingCount || 0}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.followButton, following && styles.followingButton]}
            onPress={handleFollowToggle}
            disabled={followLoading}
          >
            {followLoading ? (
              <ActivityIndicator size="small" color={colors.background} />
            ) : (
              <Text style={[styles.followButtonText, following && styles.followingButtonText]}>
                {following ? 'Following' : 'Follow'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.postsSection}>
          <Text style={styles.postsTitle}>Posts</Text>

          {posts.length === 0 ? (
            <EmptyState
              icon="📝"
              title="No posts yet"
              message={`${userProfile.username} hasn't posted anything yet`}
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
                    />
                  ) : (
                    <View style={styles.postImagePlaceholder}>
                      <Text style={styles.postEmoji}>📸</Text>
                    </View>
                  )}
                  <Text style={styles.postText} numberOfLines={2}>
                    {post.content}
                  </Text>
                </View>
              ))}
            </View>
          )}
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
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 50,
  },
  displayName: {
    fontSize: typography.title.fontSize,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  usernameText: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  bio: {
    fontSize: typography.body.fontSize,
    textAlign: 'center',
    color: colors.text,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
  followButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  followButtonText: {
    color: colors.background,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
  followingButtonText: {
    color: colors.text,
  },
  postsSection: {
    paddingVertical: spacing.md,
  },
  postsTitle: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: '600',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
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
});
