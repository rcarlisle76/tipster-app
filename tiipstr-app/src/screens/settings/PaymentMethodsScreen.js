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

export default function PaymentMethodsScreen({ navigation }) {
  // Mock payment methods - in a real app, this would come from a payment provider
  const paymentMethods = [
    {
      id: '1',
      type: 'Visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true,
    },
    {
      id: '2',
      type: 'Mastercard',
      last4: '5555',
      expiryMonth: '08',
      expiryYear: '2026',
      isDefault: false,
    },
  ];

  const handleAddCard = () => {
    Alert.alert('Add Payment Method', 'This feature requires integration with a payment provider like Stripe.');
  };

  const handleRemoveCard = (cardId, last4) => {
    Alert.alert(
      'Remove Payment Method',
      `Are you sure you want to remove card ending in ${last4}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Payment method removed');
          }
        }
      ]
    );
  };

  const handleSetDefault = (cardId, last4) => {
    Alert.alert('Success', `Card ending in ${last4} is now your default payment method`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Payment Methods</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Manage your payment methods. Your default payment method will be used for all transactions.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCard}
        >
          <Text style={styles.addButtonText}>+ Add Payment Method</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Saved Payment Methods</Text>

        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.cardItem}>
            <View style={styles.cardInfo}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardType}>{method.type}</Text>
                {method.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardNumber}>•••• •••• •••• {method.last4}</Text>
              <Text style={styles.cardExpiry}>
                Expires {method.expiryMonth}/{method.expiryYear}
              </Text>
            </View>
            <View style={styles.cardActions}>
              {!method.isDefault && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleSetDefault(method.id, method.last4)}
                >
                  <Text style={styles.actionButtonText}>Set Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.actionButton, styles.removeButton]}
                onPress={() => handleRemoveCard(method.id, method.last4)}
              >
                <Text style={[styles.actionButtonText, styles.removeButtonText]}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  addButtonText: {
    fontSize: typography.body.fontSize,
    color: colors.background,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  cardItem: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardInfo: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardType: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginRight: spacing.sm,
  },
  defaultBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  defaultBadgeText: {
    fontSize: typography.small.fontSize,
    color: colors.background,
    fontWeight: '600',
  },
  cardNumber: {
    fontSize: typography.body.fontSize,
    marginBottom: spacing.xs,
  },
  cardExpiry: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: typography.small.fontSize,
    color: colors.primary,
    fontWeight: '600',
  },
  removeButton: {
    borderColor: '#E74C3C',
  },
  removeButtonText: {
    color: '#E74C3C',
  },
});
