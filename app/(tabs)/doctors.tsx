import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
  Modal,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { getDoctorPhoto } from '../../utils/doctorPhotos';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  city: 'Dehradun' | 'Haldwani';
  experience: number;
  rating: number;
  languages: string[];
  availability: 'Online' | 'Offline' | 'Busy';
  consultationModes: ('Video' | 'Phone' | 'In-Person')[];
  phone: string;
  photoUrl?: string;
}

const doctorsData: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Asha Rawat',
    specialization: 'General Physician',
    city: 'Dehradun',
    experience: 8,
    rating: 4.8,
    languages: ['Hindi', 'English'],
    availability: 'Online',
    consultationModes: ['Video', 'Phone', 'In-Person'],
    phone: '+91-9876543210',
  },
  {
    id: '2',
    name: 'Dr. Manoj Joshi',
    specialization: 'Family Doctor',
    city: 'Haldwani',
    experience: 12,
    rating: 4.6,
    languages: ['Hindi', 'Garhwali'],
    availability: 'Online',
    consultationModes: ['Phone', 'In-Person'],
    phone: '+91-9876543211',
  },
  {
    id: '3',
    name: 'Dr. Meena Kapoor',
    specialization: 'Gastroenterologist',
    city: 'Dehradun',
    experience: 15,
    rating: 4.9,
    languages: ['Hindi', 'English'],
    availability: 'Online',
    consultationModes: ['Video', 'In-Person'],
    phone: '+91-9876543212',
  },
  {
    id: '4',
    name: 'Dr. Dinesh Pandey',
    specialization: 'Cardiologist',
    city: 'Haldwani',
    experience: 10,
    rating: 4.7,
    languages: ['Hindi', 'English', 'Garhwali'],
    availability: 'Busy',
    consultationModes: ['Video', 'Phone'],
    phone: '+91-9876543213',
  },
  {
    id: '5',
    name: 'Dr. Priya Sharma',
    specialization: 'Pediatrician',
    city: 'Dehradun',
    experience: 7,
    rating: 4.8,
    languages: ['Hindi', 'English'],
    availability: 'Online',
    consultationModes: ['Video', 'Phone', 'In-Person'],
    phone: '+91-9876543214',
  },
  {
    id: '6',
    name: 'Dr. Rajesh Kumar',
    specialization: 'Orthopedic',
    city: 'Haldwani',
    experience: 14,
    rating: 4.5,
    languages: ['Hindi', 'English'],
    availability: 'Offline',
    consultationModes: ['In-Person'],
    phone: '+91-9876543215',
  },
];

export default function DoctorsScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<'All' | 'Dehradun' | 'Haldwani'>('All');
  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [doctorsWithPhotos, setDoctorsWithPhotos] = useState<Doctor[]>(doctorsData);

  useEffect(() => {
    // Fetch photos for all doctors
    const fetchPhotos = async () => {
      const updatedDoctors = await Promise.all(
        doctorsData.map(async (doctor) => {
          const photoUrl = await getDoctorPhoto(doctor.name, doctor.specialization, doctor.city);
          return { ...doctor, photoUrl };
        })
      );
      setDoctorsWithPhotos(updatedDoctors);
    };

    fetchPhotos();
  }, []);

  const filteredDoctors = doctorsWithPhotos.filter(doctor => 
    selectedCity === 'All' || doctor.city === selectedCity
  );

  const handleDoctorSelect = (doctor: Doctor) => {
    if (selectedDoctors.find(d => d.id === doctor.id)) {
      setSelectedDoctors(prev => prev.filter(d => d.id !== doctor.id));
    } else if (selectedDoctors.length < 2) {
      setSelectedDoctors(prev => [...prev, doctor]);
    } else {
      Alert.alert('Limit Reached', 'You can only compare 2 doctors at a time.');
    }
  };

  const handleVideoCall = (doctor: Doctor) => {
    Alert.alert(
      'Video Consultation',
      `Book a video call with ${doctor.name}?`,
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: 'Book Now',
          onPress: () => {
            Alert.alert('Booking Confirmed', `Video consultation with ${doctor.name} has been scheduled. You will receive a call shortly.`);
          },
        },
      ]
    );
  };

  const handlePhoneCall = (doctor: Doctor) => {
    Alert.alert(
      'Phone Call',
      `Call ${doctor.name} directly?`,
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: 'Call Now',
          onPress: () => Linking.openURL(`tel:${doctor.phone}`),
        },
      ]
    );
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Online': return colors.success;
      case 'Busy': return colors.warning;
      case 'Offline': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const renderDoctor = (doctor: Doctor) => {
    const isSelected = selectedDoctors.find(d => d.id === doctor.id);
    
    return (
      <View key={doctor.id} style={[
        styles.doctorCard, 
        { backgroundColor: colors.background, borderColor: colors.border },
        isSelected && { borderColor: colors.primary, borderWidth: 2 }
      ]}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => handleDoctorSelect(doctor)}
        >
          <Ionicons 
            name={isSelected ? "checkbox" : "square-outline"} 
            size={20} 
            color={isSelected ? colors.primary : colors.textSecondary} 
          />
        </TouchableOpacity>

        <View style={styles.doctorHeader}>
          <Image
            source={{ uri: doctor.photoUrl }}
            style={styles.doctorPhoto}
            defaultSource={{ uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face' }}
          />
          <View style={styles.doctorInfo}>
            <Text style={[styles.doctorName, { color: colors.text }]}>{doctor.name}</Text>
            <Text style={[styles.specialization, { color: colors.accent }]}>{doctor.specialization}</Text>
            
            <View style={styles.detailsRow}>
              <Ionicons name="location" size={14} color={colors.textSecondary} />
              <Text style={[styles.detailText, { color: colors.textSecondary }]}>{doctor.city}</Text>
              <Ionicons name="time" size={14} color={colors.textSecondary} style={{ marginLeft: 16 }} />
              <Text style={[styles.detailText, { color: colors.textSecondary }]}>{doctor.experience} {t('experience')}</Text>
            </View>

            <View style={styles.detailsRow}>
              <Ionicons name="star" size={14} color={colors.warning} />
              <Text style={[styles.detailText, { color: colors.textSecondary }]}>{doctor.rating}</Text>
              <View style={[styles.availabilityBadge, { backgroundColor: getAvailabilityColor(doctor.availability) }]}>
                <Text style={styles.availabilityText}>{t(doctor.availability.toLowerCase())}</Text>
              </View>
            </View>

            <Text style={[styles.languagesText, { color: colors.textSecondary }]}>
              Languages: {doctor.languages.join(', ')}
            </Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          {doctor.consultationModes.includes('Video') && doctor.availability === 'Online' && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.success }]}
              onPress={() => handleVideoCall(doctor)}
            >
              <Ionicons name="videocam" size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>{t('bookVideo')}</Text>
            </TouchableOpacity>
          )}
          
          {doctor.consultationModes.includes('Phone') && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.accent }]}
              onPress={() => handlePhoneCall(doctor)}
            >
              <Ionicons name="call" size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>{t('bookPhone')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>{t('doctorsTitle')}</Text>
        {selectedDoctors.length === 2 && (
          <TouchableOpacity
            style={[styles.compareButton, { backgroundColor: colors.accent }]}
            onPress={() => setShowComparison(true)}
          >
            <Text style={styles.compareButtonText}>{t('compare')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* City Filter */}
      <View style={[styles.filterContainer, { backgroundColor: colors.background }]}>
        {['All', 'Dehradun', 'Haldwani'].map((city) => (
          <TouchableOpacity
            key={city}
            style={[
              styles.filterButton,
              { backgroundColor: colors.surface },
              selectedCity === city && { backgroundColor: colors.primary },
            ]}
            onPress={() => setSelectedCity(city as any)}
          >
            <Text
              style={[
                styles.filterButtonText,
                { color: colors.textSecondary },
                selectedCity === city && { color: '#FFFFFF' },
              ]}
            >
              {city === 'All' ? 'All' : t(city.toLowerCase())}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Doctors List */}
      <ScrollView style={styles.doctorsList} showsVerticalScrollIndicator={false}>
        {filteredDoctors.map(renderDoctor)}
      </ScrollView>

      {/* Comparison Modal */}
      <Modal
        visible={showComparison}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.surface }]}>
          <View style={[styles.modalHeader, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Compare Doctors</Text>
            <TouchableOpacity onPress={() => setShowComparison(false)}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.comparisonContent}>
            {selectedDoctors.map((doctor, index) => (
              <View key={doctor.id} style={[styles.comparisonCard, { backgroundColor: colors.background }]}>
                <View style={styles.comparisonHeader}>
                  <Image
                    source={{ uri: doctor.photoUrl }}
                    style={styles.comparisonPhoto}
                  />
                  <View>
                    <Text style={[styles.comparisonDoctorName, { color: colors.text }]}>{doctor.name}</Text>
                    <Text style={[styles.comparisonSpecialization, { color: colors.accent }]}>{doctor.specialization}</Text>
                  </View>
                </View>
                
                <View style={styles.comparisonDetails}>
                  <Text style={[styles.comparisonLabel, { color: colors.textSecondary }]}>Experience:</Text>
                  <Text style={[styles.comparisonValue, { color: colors.text }]}>{doctor.experience} years</Text>
                </View>
                
                <View style={styles.comparisonDetails}>
                  <Text style={[styles.comparisonLabel, { color: colors.textSecondary }]}>Rating:</Text>
                  <Text style={[styles.comparisonValue, { color: colors.text }]}>{doctor.rating} ⭐</Text>
                </View>
                
                <View style={styles.comparisonDetails}>
                  <Text style={[styles.comparisonLabel, { color: colors.textSecondary }]}>City:</Text>
                  <Text style={[styles.comparisonValue, { color: colors.text }]}>{doctor.city}</Text>
                </View>
                
                <View style={styles.comparisonDetails}>
                  <Text style={[styles.comparisonLabel, { color: colors.textSecondary }]}>Languages:</Text>
                  <Text style={[styles.comparisonValue, { color: colors.text }]}>{doctor.languages.join(', ')}</Text>
                </View>
                
                <View style={styles.comparisonDetails}>
                  <Text style={[styles.comparisonLabel, { color: colors.textSecondary }]}>Consultation:</Text>
                  <Text style={[styles.comparisonValue, { color: colors.text }]}>{doctor.consultationModes.join(', ')}</Text>
                </View>
              </View>
            ))}

            {selectedDoctors.length === 2 && (
              <View style={[styles.recommendationCard, { backgroundColor: colors.surface }]}>
                <Text style={[styles.recommendationTitle, { color: colors.primary }]}>AI Recommendation</Text>
                <Text style={[styles.recommendationText, { color: colors.text }]}>
                  Based on availability and ratings, {selectedDoctors[0].rating > selectedDoctors[1].rating ? selectedDoctors[0].name : selectedDoctors[1].name} might be a better choice for your consultation.
                </Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  compareButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  compareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  doctorsList: {
    flex: 1,
    padding: 16,
  },
  doctorCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
  },
  selectButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  doctorHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  doctorPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
    marginRight: 40,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 'auto',
  },
  availabilityText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  languagesText: {
    fontSize: 12,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  comparisonContent: {
    flex: 1,
    padding: 16,
  },
  comparisonCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  comparisonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  comparisonPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  comparisonDoctorName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  comparisonSpecialization: {
    fontSize: 14,
  },
  comparisonDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  comparisonLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  comparisonValue: {
    fontSize: 14,
  },
  recommendationCard: {
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
  },
});