import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { useAuth } from '../hooks/useAuth';
import { searchUsers } from '../services/userService';
import { followUser, unfollowUser, isFollowing } from '../services/followService';
import EmptyState from '../components/EmptyState';

export default function SearchResultsScreen({ navigation }) {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followingStates, setFollowingStates] = useState({});
  const [loadingFollows, setLoadingFollows] = useState({});

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      searchForUsers();
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const searchForUsers = async () => {
    try {
      setLoading(true);
      const users = await searchUsers(searchQuery);

      // Filter out current user from results
      const filteredUsers = users.filter(user => user.userId !== currentUser.uid);

      setResults(filteredUsers);

      // Check following status for each user
      const followStates = {};
      for (const user of filteredUsers) {
        const following = await isFollowing(currentUser.uid, user.userId);
        followStates[user.userId] = following;
      }
      setFollowingStates(followStates);
    } catch (error) {
      console.error('Search error:', error);
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
        // Follow
        await followUser(currentUser.uid, userId, username);
        setFollowingStates({ ...followingStates, [userId]: true });
      }
    } catch (error) {
      console.error('Follow/unfollow error:', error);
    } finally {
      setLoadingFollows({ ...loadingFollows, [userId]: false });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
      </View>

      <ScrollView style={styles.content}>
        {searchQuery.trim().length === 0 ? (
          <EmptyState
            icon="🔍"
            title="Search for users"
            message="Type at least 2 characters to search for users to follow"
          />
        ) : loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : results.length === 0 ? (
          <EmptyState
            icon="😕"
            title="No users found"
            message={`No users matching "${searchQuery}"`}
          />
        ) : (
          <>
            <Text style={styles.resultsTitle}>
              {results.length} {results.length === 1 ? 'user' : 'users'} found
            </Text>

            {results.map((user) => (
              <View key={user.userId} style={styles.resultCard}>
                <TouchableOpacity
                  style={styles.userResult}
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
                  <View style={styles.userInfo}>
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
                  style={[
                    styles.followButton,
                    followingStates[user.userId] && styles.followingButton,
                  ]}
                  onPress={() => handleFollowToggle(user.userId, user.username)}
                  disabled={loadingFollows[user.userId]}
                >
                  {loadingFollows[user.userId] ? (
                    <ActivityIndicator size="small" color={colors.background} />
                  ) : (
                    <Text
                      style={[
                        styles.followButtonText,
                        followingStates[user.userId] && styles.followingButtonText,
                      ]}
                    >
                      {followingStates[user.userId] ? 'Following' : 'Follow'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </>
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
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body.fontSize,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  resultsTitle: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: '600',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.textSecondary,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userResult: {
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
  userInfo: {
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
    borderRadius: borderRadius.md,
    minWidth: 90,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  followButtonText: {
    color: colors.background,
    fontSize: typography.small.fontSize,
    fontWeight: '600',
  },
  followingButtonText: {
    color: colors.text,
  },
});
