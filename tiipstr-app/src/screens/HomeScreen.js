import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  Modal,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, spacing, typography } from '../constants/theme';
import { useAuth } from '../hooks/useAuth';
import { getFollowingFeedPosts, getFeedPosts } from '../services/postService';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function HomeScreen({ navigation }) {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [feedFilter, setFeedFilter] = useState('following'); // 'following' or 'all'
  const [showFilterModal, setShowFilterModal] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (currentUser) {
        fetchFeed();
      }
    }, [currentUser, feedFilter])
  );

  const fetchFeed = async () => {
    try {
      setLoading(true);
      let feedPosts;

      if (feedFilter === 'all') {
        // Get all posts
        feedPosts = await getFeedPosts(100);
      } else {
        // Get posts from people you follow
        feedPosts = await getFollowingFeedPosts(currentUser.uid);
      }

      setPosts(feedPosts);
    } catch (error) {
      console.error('Error fetching feed:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeed();
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMins = Math.floor(diffInHours * 60);
      return `${diffInMins}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
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
      <Text style={styles.postContent}>
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

  if (loading) {
    return <LoadingSpinner message="Loading feed..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>tiipstr</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Post')}>
          <Text style={styles.newPostButton}>➕</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.filterDropdown}
        onPress={() => setShowFilterModal(true)}
      >
        <Text style={styles.filterDropdownText}>
          {feedFilter === 'following' ? 'Following' : 'All Posts'}
        </Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={[
                styles.modalOption,
                feedFilter === 'following' && styles.modalOptionActive,
              ]}
              onPress={() => {
                setFeedFilter('following');
                setShowFilterModal(false);
              }}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  feedFilter === 'following' && styles.modalOptionTextActive,
                ]}
              >
                Following
              </Text>
              {feedFilter === 'following' && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
            <View style={styles.modalDivider} />
            <TouchableOpacity
              style={[
                styles.modalOption,
                feedFilter === 'all' && styles.modalOptionActive,
              ]}
              onPress={() => {
                setFeedFilter('all');
                setShowFilterModal(false);
              }}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  feedFilter === 'all' && styles.modalOptionTextActive,
                ]}
              >
                All Posts
              </Text>
              {feedFilter === 'all' && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView
        style={styles.feed}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {posts.length === 0 ? (
          <EmptyState
            icon="✍️"
            title="No posts yet"
            message="Create your first post to get started!"
          />
        ) : (
          posts.map((post) => (
            <View key={post.postId} style={styles.postCard}>
              <View style={styles.postHeader}>
                <TouchableOpacity
                  style={styles.userInfo}
                  onPress={() => {
                    if (post.userId !== currentUser.uid) {
                      navigation.navigate('UserProfile', {
                        userId: post.userId,
                        username: post.username,
                      });
                    } else {
                      navigation.navigate('Me');
                    }
                  }}
                >
                  {post.userProfilePic ? (
                    <Image
                      source={{ uri: post.userProfilePic }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>👤</Text>
                    </View>
                  )}
                  <View>
                    <View style={styles.usernameRow}>
                      <Text style={styles.username}>{post.username}</Text>
                      {post.accountType === 'company' && (
                        <Text style={styles.verifiedBadge}>✓</Text>
                      )}
                    </View>
                    <Text style={styles.timestamp}>
                      {formatTimestamp(post.createdAt)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {renderPostContent(post.content, post)}

              {post.imageUrl ? (
                <Image
                  source={{ uri: post.imageUrl }}
                  style={styles.postImage}
                  resizeMode="cover"
                  onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
                />
              ) : null}

              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>❤️</Text>
                  <Text style={styles.actionText}>{post.likesCount || 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>💬</Text>
                  <Text style={styles.actionText}>
                    {post.commentsCount || 0}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>🔄</Text>
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navIconActive}>🏠</Text>
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('SearchResults')}
        >
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Post')}
        >
          <Text style={styles.navIcon}>➕</Text>
          <Text style={styles.navLabel}>Post</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Me')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
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
  headerTitle: {
    fontSize: typography.title.fontSize,
    fontWeight: 'bold',
  },
  newPostButton: {
    fontSize: 24,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterDropdownText: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.text,
  },
  dropdownIcon: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 120,
  },
  modalContent: {
    backgroundColor: colors.background,
    marginHorizontal: spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  modalOptionActive: {
    backgroundColor: colors.inputBackground,
  },
  modalOptionText: {
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  modalOptionTextActive: {
    fontWeight: '600',
    color: colors.primary,
  },
  modalDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  checkmark: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
  feed: {
    flex: 1,
  },
  postCard: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    fontSize: 20,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  username: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
  verifiedBadge: {
    fontSize: 14,
    color: '#1DA1F2',
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  postContent: {
    fontSize: typography.body.fontSize,
    lineHeight: 22,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  mention: {
    color: colors.primary,
    fontWeight: '600',
  },
  postImage: {
    width: '100%',
    height: 300,
    marginBottom: spacing.sm,
  },
  postActions: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  actionIcon: {
    fontSize: 18,
    marginRight: spacing.xs,
  },
  actionText: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
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
