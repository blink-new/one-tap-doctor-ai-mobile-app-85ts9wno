import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  city: string;
  rating: number;
  experience: number;
  languages: string[];
  availability: 'online' | 'busy' | 'offline';
  consultationModes: string[];
}

interface ComparisonModalProps {
  visible: boolean;
  onClose: () => void;
  doctors: Doctor[];
  comparison: string;
  loading: boolean;
}

export default function ComparisonModal({ visible, onClose, doctors, comparison, loading }: ComparisonModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Doctor Comparison</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Doctor Cards */}
          <View style={styles.doctorsContainer}>
            {doctors.map((doctor, index) => (
              <View key={doctor.id} style={styles.doctorCard}>
                <View style={styles.doctorHeader}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>{doctor.rating}</Text>
                  </View>
                </View>
                <Text style={styles.specialization}>{doctor.specialization}</Text>
                <Text style={styles.location}>{doctor.city}</Text>
                <Text style={styles.experience}>{doctor.experience} years experience</Text>
                <Text style={styles.languages}>Languages: {doctor.languages.join(', ')}</Text>
              </View>
            ))}
          </View>

          {/* AI Comparison */}
          <View style={styles.comparisonSection}>
            <Text style={styles.comparisonTitle}>AI Analysis</Text>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Analyzing doctors...</Text>
              </View>
            ) : (
              <View style={styles.comparisonCard}>
                <Text style={styles.comparisonText}>{comparison}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  doctorsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  doctorCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  doctorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  specialization: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '500',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  experience: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  languages: {
    fontSize: 12,
    color: '#888',
  },
  comparisonSection: {
    marginTop: 8,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  comparisonCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
  },
  comparisonText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
});