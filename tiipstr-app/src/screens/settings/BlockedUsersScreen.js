import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

export default function BlockedUsersScreen({ navigation }) {
  // Mock blocked users - in a real app, this would come from Firestore
  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: '1',
      username: 'spam_user_123',
      displayName: 'Spam User',
      profilePicUrl: null,
    },
    {
      id: '2',
      username: 'annoying_person',
      displayName: 'Annoying Person',
      profilePicUrl: null,
    },
  ]);

  const handleUnblock = (userId, username) => {
    Alert.alert(
      'Unblock User',
      `Are you sure you want to unblock @${username}? They will be able to follow you and see your posts again.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unblock',
          onPress: () => {
            setBlockedUsers(prev => prev.filter(user => user.id !== userId));
            Alert.alert('Success', `@${username} has been unblocked`);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Blocked Users</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Blocked users cannot follow you, see your posts, or send you messages. You won't see their content either.
          </Text>
        </View>

        {blockedUsers.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>
              {blockedUsers.length} Blocked User{blockedUsers.length !== 1 ? 's' : ''}
            </Text>
            {blockedUsers.map((user) => (
              <View key={user.id} style={styles.userItem}>
                <View style={styles.userInfo}>
                  {user.profilePicUrl ? (
                    <Image
                      source={{ uri: user.profilePicUrl }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarPlaceholderText}>
                        {user.displayName?.[0]?.toUpperCase() || '?'}
                      </Text>
                    </View>
                  )}
                  <View style={styles.userText}>
                    <Text style={styles.displayName}>{user.displayName}</Text>
                    <Text style={styles.username}>@{user.username}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.unblockButton}
                  onPress={() => handleUnblock(user.id, user.username)}
                >
                  <Text style={styles.unblockButtonText}>Unblock</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No blocked users</Text>
            <Text style={styles.emptyStateText}>
              When you block someone, they'll appear here
            </Text>
          </View>
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
    padding: spacing.md,
  },
  infoBox: {
    backgroundColor: colors.inputBackground,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  infoText: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
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
    marginRight: spacing.md,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarPlaceholderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.background,
  },
  userText: {
    flex: 1,
  },
  displayName: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  username: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  unblockButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  unblockButtonText: {
    fontSize: typography.small.fontSize,
    color: colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyStateTitle: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  emptyStateText: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
