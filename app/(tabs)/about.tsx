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
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AboutScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const handleWebsitePress = () => {
    Linking.openURL('https://rajatwork.online');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:contact@rajatwork.online');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+919876543210');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>{t('aboutTitle')}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Bridging healthcare gaps in Uttarakhand
          </Text>
        </View>

        {/* Founder Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-circle" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('founderTitle')}</Text>
          </View>
          
          <View style={[styles.founderCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.founderName, { color: colors.text }]}>Rajat Tripathi</Text>
            <Text style={[styles.founderTitle, { color: colors.accent }]}>Founder & CEO</Text>
            
            <Text style={[styles.founderDescription, { color: colors.text }]}>
              Hi, I'm Rajat Tripathi, the founder of One-Tap Doctor. With a background in technology and a deep passion for solving healthcare challenges in India, I created this app to bridge the gap between people in remote Uttarakhand and the trusted doctors they deserve.
            </Text>

            <TouchableOpacity 
              style={[styles.websiteButton, { backgroundColor: colors.primary }]} 
              onPress={handleWebsitePress}
            >
              <Ionicons name="globe" size={16} color="#FFFFFF" />
              <Text style={styles.websiteButtonText}>{t('contactWebsite')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="heart" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('missionTitle')}</Text>
          </View>
          
          <View style={[styles.missionCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.missionText, { color: colors.text }]}>
              Our goal is to make healthcare accessible to everyone, even in the remotest towns and villages of Uttarakhand. We believe that a quick diagnosis and access to the right doctor can save lives, and we're here to make that happen — one tap at a time.
            </Text>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>What We Offer</Text>
          </View>
          
          <View style={styles.featuresContainer}>
            <View style={[styles.featureItem, { backgroundColor: colors.background }]}>
              <Ionicons name="chatbubble-ellipses" size={20} color={colors.accent} />
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>AI Symptom Checker</Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  Get instant AI-powered analysis of your symptoms and personalized doctor recommendations
                </Text>
              </View>
            </View>

            <View style={[styles.featureItem, { backgroundColor: colors.background }]}>
              <Ionicons name="medical" size={20} color={colors.accent} />
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>Local Doctor Network</Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  Access to verified doctors in Dehradun and Haldwani with real-time availability
                </Text>
              </View>
            </View>

            <View style={[styles.featureItem, { backgroundColor: colors.background }]}>
              <Ionicons name="videocam" size={20} color={colors.accent} />
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>Video Consultations</Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  Book video calls with doctors from the comfort of your home
                </Text>
              </View>
            </View>

            <View style={[styles.featureItem, { backgroundColor: colors.background }]}>
              <Ionicons name="analytics" size={20} color={colors.accent} />
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>Smart Comparisons</Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  AI-powered doctor comparisons to help you choose the best fit
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="mail" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Get in Touch</Text>
          </View>
          
          <View style={styles.contactContainer}>
            <TouchableOpacity 
              style={[styles.contactItem, { backgroundColor: colors.background }]} 
              onPress={handleWebsitePress}
            >
              <Ionicons name="globe" size={20} color={colors.accent} />
              <Text style={[styles.contactText, { color: colors.text }]}>rajatwork.online</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.contactItem, { backgroundColor: colors.background }]} 
              onPress={handleEmailPress}
            >
              <Ionicons name="mail" size={20} color={colors.accent} />
              <Text style={[styles.contactText, { color: colors.text }]}>contact@rajatwork.online</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.contactItem, { backgroundColor: colors.background }]} 
              onPress={handlePhonePress}
            >
              <Ionicons name="call" size={20} color={colors.accent} />
              <Text style={[styles.contactText, { color: colors.text }]}>+91 98765 43210</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bar-chart" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Impact</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: colors.background }]}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>50+</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Doctors</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.background }]}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>2</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Cities</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.background }]}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>24/7</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>AI Support</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Made with ❤️ for the people of Uttarakhand
          </Text>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>Version 1.0.0</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  founderCard: {
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  founderName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  founderTitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  founderDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  websiteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  missionCard: {
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  missionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  featuresContainer: {
    paddingHorizontal: 24,
  },
  featureItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureContent: {
    flex: 1,
    marginLeft: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  contactContainer: {
    paddingHorizontal: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
  footer: {
    alignItems: 'center',
    padding: 24,
    marginTop: 16,
  },
  footerText: {
    fontSize: 16,
    marginBottom: 8,
  },
  versionText: {
    fontSize: 12,
  },
});