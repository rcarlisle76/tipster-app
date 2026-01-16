import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

export default function BillingHistoryScreen({ navigation }) {
  // Mock billing history - in a real app, this would come from a payment provider
  const transactions = [
    {
      id: '1',
      date: 'Dec 15, 2024',
      description: 'Premium Subscription',
      amount: '$9.99',
      status: 'Paid',
      invoiceUrl: '#',
    },
    {
      id: '2',
      date: 'Nov 15, 2024',
      description: 'Premium Subscription',
      amount: '$9.99',
      status: 'Paid',
      invoiceUrl: '#',
    },
    {
      id: '3',
      date: 'Oct 15, 2024',
      description: 'Premium Subscription',
      amount: '$9.99',
      status: 'Paid',
      invoiceUrl: '#',
    },
    {
      id: '4',
      date: 'Sep 15, 2024',
      description: 'Premium Subscription',
      amount: '$9.99',
      status: 'Paid',
      invoiceUrl: '#',
    },
  ];

  const handleDownloadInvoice = (transactionId, date) => {
    Alert.alert('Download Invoice', `Invoice for ${date} will be downloaded.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Billing History</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            View your past transactions and download invoices for your records.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Transactions</Text>

        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
              <Text style={styles.transactionDescription}>
                {transaction.description}
              </Text>
              <View style={styles.transactionMeta}>
                <Text style={styles.transactionAmount}>{transaction.amount}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>{transaction.status}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => handleDownloadInvoice(transaction.id, transaction.date)}
            >
              <Text style={styles.downloadButtonText}>Invoice</Text>
            </TouchableOpacity>
          </View>
        ))}

        {transactions.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No transactions yet</Text>
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
  transactionItem: {
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
  transactionInfo: {
    flex: 1,
  },
  transactionDate: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  transactionDescription: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  transactionAmount: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.text,
  },
  statusBadge: {
    backgroundColor: '#27AE60',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  statusBadgeText: {
    fontSize: typography.small.fontSize,
    color: colors.background,
    fontWeight: '600',
  },
  downloadButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  downloadButtonText: {
    fontSize: typography.small.fontSize,
    color: colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyStateText: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
});
