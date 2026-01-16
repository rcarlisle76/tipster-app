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

export default function SubscriptionScreen({ navigation }) {
  // Mock subscription data - in a real app, this would come from your backend
  const currentPlan = {
    name: 'Premium',
    price: '$9.99/month',
    nextBillingDate: 'January 15, 2025',
    features: [
      'Unlimited posts',
      'No ads',
      'Priority support',
      'Advanced analytics',
      'Custom themes',
    ],
  };

  const handleUpgrade = () => {
    Alert.alert('Upgrade', 'Premium plan upgrade options would be shown here.');
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your premium subscription? You will lose access to premium features at the end of your current billing period.',
      [
        { text: 'Keep Subscription', style: 'cancel' },
        {
          text: 'Cancel Subscription',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Subscription Cancelled',
              'Your subscription has been cancelled. You will retain access to premium features until January 15, 2025.'
            );
          }
        }
      ]
    );
  };

  const handleUpdatePayment = () => {
    navigation.navigate('PaymentMethods');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Subscription</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text style={styles.planName}>{currentPlan.name}</Text>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>Active</Text>
            </View>
          </View>
          <Text style={styles.planPrice}>{currentPlan.price}</Text>
          <Text style={styles.billingText}>
            Next billing date: {currentPlan.nextBillingDate}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium Features</Text>
          {currentPlan.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manage Subscription</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleUpdatePayment}
          >
            <Text style={styles.actionButtonText}>Update Payment Method</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleUpgrade}
          >
            <Text style={styles.actionButtonText}>Upgrade Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={[styles.actionButtonText, styles.cancelButtonText]}>
              Cancel Subscription
            </Text>
          </TouchableOpacity>
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
  planCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  planName: {
    fontSize: typography.title.fontSize,
    fontWeight: 'bold',
    color: colors.background,
  },
  activeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  activeBadgeText: {
    fontSize: typography.small.fontSize,
    color: colors.background,
    fontWeight: '600',
  },
  planPrice: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: '600',
    color: colors.background,
    marginBottom: spacing.xs,
  },
  billingText: {
    fontSize: typography.small.fontSize,
    color: colors.background,
    opacity: 0.9,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featureIcon: {
    fontSize: 18,
    color: colors.primary,
    marginRight: spacing.sm,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  actionButton: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  cancelButton: {
    borderColor: '#E74C3C',
    marginTop: spacing.md,
  },
  cancelButtonText: {
    color: '#E74C3C',
  },
});
