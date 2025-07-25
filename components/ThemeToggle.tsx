import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, ThemeMode } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const ThemeToggle: React.FC = () => {
  const { theme, themeMode, setThemeMode, colors } = useTheme();
  const { t } = useLanguage();

  const getNextThemeMode = (): ThemeMode => {
    switch (themeMode) {
      case 'light':
        return 'dark';
      case 'dark':
        return 'system';
      case 'system':
        return 'light';
      default:
        return 'light';
    }
  };

  const getThemeIcon = (): string => {
    switch (themeMode) {
      case 'light':
        return '🌞';
      case 'dark':
        return '🌙';
      case 'system':
        return '🔄';
      default:
        return '🌞';
    }
  };

  const getThemeLabel = (): string => {
    switch (themeMode) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'Auto';
      default:
        return 'Light';
    }
  };

  const handleThemeToggle = () => {
    const nextMode = getNextThemeMode();
    setThemeMode(nextMode);
  };

  return (
    <TouchableOpacity
      style={[styles.toggleButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={handleThemeToggle}
    >
      <Text style={styles.themeIcon}>{getThemeIcon()}</Text>
      <Text style={[styles.themeLabel, { color: colors.text }]}>
        {getThemeLabel()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  themeIcon: {
    fontSize: 14,
  },
  themeLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ThemeToggle;