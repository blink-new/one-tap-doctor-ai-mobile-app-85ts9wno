import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageToggle from '../../components/LanguageToggle';
import ThemeToggle from '../../components/ThemeToggle';

function TabHeader() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <SafeAreaView style={[styles.headerContainer, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.appTitle, { color: colors.text }]}>
            One-Tap Doctor
          </Text>
        </View>
        <View style={styles.headerRight}>
          <LanguageToggle />
          <ThemeToggle />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function TabLayout() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <>
      <TabHeader />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            paddingBottom: 8,
            paddingTop: 8,
            height: 80,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('home'),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="symptom-checker"
          options={{
            title: t('symptomChecker'),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-ellipses" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="doctors"
          options={{
            title: t('doctors'),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="medical" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: t('about'),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="information-circle" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerLeft: {
    flex: 1,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});