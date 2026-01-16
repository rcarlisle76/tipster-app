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
import { getFollowers, followUser, unfollowUser, isFollowing } from '../services/followService';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function FollowersScreen({ navigation }) {
  const { currentUser } = useAuth();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followingStates, setFollowingStates] = useState({});
  const [loadingFollows, setLoadingFollows] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      if (currentUser) {
        fetchFollowers();
      }
    }, [currentUser])
  );

  const fetchFollowers = async () => {
    try {
      setLoading(true);
      const followersList = await getFollowers(currentUser.uid);
      setFollowers(followersList);

      // Check if current user is following each follower back
      const followStates = {};
      for (const follower of followersList) {
        const following = await isFollowing(currentUser.uid, follower.userId);
        followStates[follower.userId] = following;
      }
      setFollowingStates(followStates);
    } catch (error) {
      console.error('Error fetching followers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async (userId, username) => {
    try {
      setLoadingFollows({ ...loadingFollows, [userId]: true });

      if (followingStates[userId]) {
        // Unfollow
        await unfollowUser(currentUser.uid, userId);
        setFollowingStates({ ...followingStates, [userId]: false });
      } else {
        // Follow back
        await followUser(currentUser.uid, userId, username);
        setFollowingStates({ ...followingStates, [userId]: true });
      }
    } catch (error) {
      console.error('Follow/unfollow error:', error);
    } finally {
      setLoadingFollows({ ...loadingFollows, [userId]: false });
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading followers..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Followers</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {followers.length === 0 ? (
          <EmptyState
            icon="👥"
            title="No followers yet"
            message="When people follow you, they'll appear here"
          />
        ) : (
          followers.map((follower) => (
            <View key={follower.userId} style={styles.userCard}>
              <TouchableOpacity
                style={styles.userInfo}
                onPress={() => navigation.navigate('UserProfile', {
                  userId: follower.userId,
                  username: follower.username,
                })}
              >
                {follower.profilePicUrl ? (
                  <Image
                    source={{ uri: follower.profilePicUrl }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>👤</Text>
                  </View>
                )}
                <View style={styles.userDetails}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{follower.displayName || follower.username}</Text>
                    {follower.accountType === 'company' && (
                      <Text style={styles.verifiedBadge}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.username}>@{follower.username}</Text>
                  {follower.bio ? (
                    <Text style={styles.bio} numberOfLines={1}>
                      {follower.bio}
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.followButton,
                  followingStates[follower.userId] && styles.followingButton,
                ]}
                onPress={() => handleFollowToggle(follower.userId, follower.username)}
                disabled={loadingFollows[follower.userId]}
              >
                {loadingFollows[follower.userId] ? (
                  <ActivityIndicator size="small" color={colors.background} />
                ) : (
                  <Text
                    style={[
                      styles.followButtonText,
                      followingStates[follower.userId] && styles.followingButtonText,
                    ]}
                  >
                    {followingStates[follower.userId] ? 'Following' : 'Follow Back'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ))
        )}
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
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 24,
  },
  userDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: 2,
  },
  verifiedBadge: {
    fontSize: 14,
    color: '#1DA1F2',
    fontWeight: 'bold',
  },
  username: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  bio: {
    fontSize: typography.small.fontSize,
    color: colors.text,
    marginTop: spacing.xs,
  },
  followButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    minWidth: 100,
    alignItems: 'center',
  },
  followButtonText: {
    fontSize: typography.small.fontSize,
    fontWeight: '600',
    color: colors.background,
  },
  followingButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  followingButtonText: {
    color: colors.text,
  },
});
