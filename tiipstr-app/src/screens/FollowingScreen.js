import React, { useState } from 'react';
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
import { getFollowing, unfollowUser } from '../services/followService';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function FollowingScreen({ navigation }) {
  const { currentUser } = useAuth();
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUnfollows, setLoadingUnfollows] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      if (currentUser) {
        fetchFollowing();
      }
    }, [currentUser])
  );

  const fetchFollowing = async () => {
    try {
      setLoading(true);
      const followingList = await getFollowing(currentUser.uid);
      setFollowing(followingList);
    } catch (error) {
      console.error('Error fetching following:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      setLoadingUnfollows({ ...loadingUnfollows, [userId]: true });
      await unfollowUser(currentUser.uid, userId);

      // Remove from local state
      setFollowing(following.filter(user => user.userId !== userId));
    } catch (error) {
      console.error('Unfollow error:', error);
    } finally {
      setLoadingUnfollows({ ...loadingUnfollows, [userId]: false });
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading following..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Following</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {following.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="Not following anyone yet"
            message="Find people to follow in the search tab"
          />
        ) : (
          following.map((user) => (
            <View key={user.userId} style={styles.userCard}>
              <TouchableOpacity
                style={styles.userInfo}
                onPress={() => navigation.navigate('UserProfile', {
                  userId: user.userId,
                  username: user.username,
                })}
              >
                {user.profilePicUrl ? (
                  <Image
                    source={{ uri: user.profilePicUrl }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>👤</Text>
                  </View>
                )}
                <View style={styles.userDetails}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{user.displayName || user.username}</Text>
                    {user.accountType === 'company' && (
                      <Text style={styles.verifiedBadge}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.username}>@{user.username}</Text>
                  {user.bio ? (
                    <Text style={styles.bio} numberOfLines={1}>
                      {user.bio}
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.followingButton}
                onPress={() => handleUnfollow(user.userId)}
                disabled={loadingUnfollows[user.userId]}
              >
                {loadingUnfollows[user.userId] ? (
                  <ActivityIndicator size="small" color={colors.text} />
                ) : (
                  <Text style={styles.followingButtonText}>
                    Following
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
  followingButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    minWidth: 100,
    alignItems: 'center',
  },
  followingButtonText: {
    fontSize: typography.small.fontSize,
    fontWeight: '600',
    color: colors.text,
  },
});
