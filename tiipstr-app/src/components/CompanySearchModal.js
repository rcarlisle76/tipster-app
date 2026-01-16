import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { searchCompanies } from '../services/userService';

export default function CompanySearchModal({ visible, onClose, onSelectCompany }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      searchForCompanies();
    } else {
      setCompanies([]);
    }
  }, [searchQuery]);

  const searchForCompanies = async () => {
    try {
      setLoading(true);
      const results = await searchCompanies(searchQuery);
      setCompanies(results);
    } catch (error) {
      console.error('Error searching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCompany = (company) => {
    onSelectCompany(company);
    setSearchQuery('');
    setCompanies([]);
    onClose();
  };

  const renderCompanyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.companyItem}
      onPress={() => handleSelectCompany(item)}
    >
      <View style={styles.companyInfo}>
        {item.profilePicUrl ? (
          <Image source={{ uri: item.profilePicUrl }} style={styles.companyAvatar} />
        ) : (
          <View style={styles.companyAvatarPlaceholder}>
            <Text style={styles.companyAvatarText}>🏢</Text>
          </View>
        )}
        <View style={styles.companyDetails}>
          <Text style={styles.companyName}>{item.displayName || item.username}</Text>
          <Text style={styles.companyUsername}>@{item.username}</Text>
          {item.bio ? (
            <Text style={styles.companyBio} numberOfLines={1}>
              {item.bio}
            </Text>
          ) : null}
        </View>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Tag Company</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a company..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            autoCapitalize="none"
          />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={companies}
            renderItem={renderCompanyItem}
            keyExtractor={(item) => item.userId}
            ListEmptyComponent={
              searchQuery.length >= 2 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No companies found</Text>
                  <Text style={styles.emptySubtext}>
                    Try a different search term
                  </Text>
                </View>
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Search for a company</Text>
                  <Text style={styles.emptySubtext}>
                    Type at least 2 characters to search
                  </Text>
                </View>
              )
            }
          />
        )}
      </View>
    </Modal>
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
  placeholder: {
    width: 60,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body.fontSize,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  companyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  companyAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  companyAvatarText: {
    fontSize: 24,
  },
  companyDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: 2,
  },
  companyUsername: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  companyBio: {
    fontSize: typography.small.fontSize,
    color: colors.text,
    marginTop: spacing.xs,
  },
  chevron: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
  },
  emptyText: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
