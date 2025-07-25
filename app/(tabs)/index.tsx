import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const handleEmergencyCall = () => {
    Linking.openURL('tel:108'); // Emergency number in India
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>One-Tap Doctor</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('welcomeSubtitle')}
          </Text>
        </View>

        {/* Emergency Button */}
        <TouchableOpacity 
          style={[styles.emergencyButton, { backgroundColor: colors.error }]} 
          onPress={handleEmergencyCall}
        >
          <Ionicons name="call" size={24} color="#FFFFFF" />
          <Text style={styles.emergencyText}>{t('emergencyCall')} (108)</Text>
        </TouchableOpacity>

        {/* Main Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.background }]}
            onPress={() => router.push('/symptom-checker')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.surface }]}>
              <Ionicons name="chatbubble-ellipses" size={32} color={colors.primary} />
            </View>
            <Text style={[styles.actionTitle, { color: colors.text }]}>
              {t('symptomTitle')}
            </Text>
            <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>
              Describe your symptoms and get AI-powered recommendations
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.background }]}
            onPress={() => router.push('/doctors')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.surface }]}>
              <Ionicons name="medical" size={32} color={colors.accent} />
            </View>
            <Text style={[styles.actionTitle, { color: colors.text }]}>
              {t('findDoctors')}
            </Text>
            <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>
              Browse doctors in Dehradun and Haldwani
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>50+</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Doctors Available</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>2</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Cities Covered</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>24/7</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>AI Support</Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Why Choose One-Tap Doctor?
          </Text>
          
          <View style={styles.featureItem}>
            <Ionicons name="flash" size={20} color={colors.primary} />
            <Text style={[styles.featureText, { color: colors.text }]}>
              Instant AI symptom analysis
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="location" size={20} color={colors.primary} />
            <Text style={[styles.featureText, { color: colors.text }]}>
              Local doctors in your area
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="videocam" size={20} color={colors.primary} />
            <Text style={[styles.featureText, { color: colors.text }]}>
              Video & phone consultations
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
            <Text style={[styles.featureText, { color: colors.text }]}>
              Trusted healthcare professionals
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  emergencyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  actionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  actionCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  actionDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  featuresContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 12,
  },
});