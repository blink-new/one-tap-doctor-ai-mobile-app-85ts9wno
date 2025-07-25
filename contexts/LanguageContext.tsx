import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'hi' | 'ku';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    symptomChecker: 'Symptom Checker',
    doctors: 'Doctors',
    about: 'About',
    
    // Home Screen
    welcomeTitle: 'Welcome to One-Tap Doctor',
    welcomeSubtitle: 'Quick access to trusted doctors in Uttarakhand',
    emergencyCall: 'Emergency Call',
    checkSymptoms: 'Check Symptoms',
    findDoctors: 'Find Doctors',
    
    // Symptom Checker
    symptomTitle: 'AI Symptom Checker',
    symptomPlaceholder: 'Describe your symptoms...',
    analyzeSymptoms: 'Analyze Symptoms',
    analyzing: 'Analyzing...',
    
    // Doctors
    doctorsTitle: 'Find Doctors',
    dehradun: 'Dehradun',
    haldwani: 'Haldwani',
    available: 'Available',
    offline: 'Offline',
    experience: 'years experience',
    rating: 'Rating',
    bookVideo: 'Book Video Call',
    bookPhone: 'Book Phone Call',
    compare: 'Compare',
    
    // About
    aboutTitle: 'About One-Tap Doctor',
    founderTitle: 'About the Founder',
    missionTitle: 'Our Mission',
    contactWebsite: 'Visit Website',
    
    // Common
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
  hi: {
    // Navigation
    home: 'होम',
    symptomChecker: 'लक्षण जांच',
    doctors: 'डॉक्टर',
    about: 'हमारे बारे में',
    
    // Home Screen
    welcomeTitle: 'वन-टैप डॉक्टर में आपका स्वागत है',
    welcomeSubtitle: 'उत्तराखंड में विश्वसनीय डॉक्टरों तक त्वरित पहुंच',
    emergencyCall: 'आपातकालीन कॉल',
    checkSymptoms: 'लक्षण जांचें',
    findDoctors: 'डॉक्टर खोजें',
    
    // Symptom Checker
    symptomTitle: 'AI लक्षण जांचकर्ता',
    symptomPlaceholder: 'अपने लक्षणों का वर्णन करें...',
    analyzeSymptoms: 'लक्षणों का विश्लेषण करें',
    analyzing: 'विश्लेषण कर रहे हैं...',
    
    // Doctors
    doctorsTitle: 'डॉक्टर खोजें',
    dehradun: 'देहरादून',
    haldwani: 'हल्द्वानी',
    available: 'उपलब्ध',
    offline: 'ऑफलाइन',
    experience: 'साल का अनुभव',
    rating: 'रेटिंग',
    bookVideo: 'वीडियो कॉल बुक करें',
    bookPhone: 'फोन कॉल बुक करें',
    compare: 'तुलना करें',
    
    // About
    aboutTitle: 'वन-टैप डॉक्टर के बारे में',
    founderTitle: 'संस्थापक के बारे में',
    missionTitle: 'हमारा मिशन',
    contactWebsite: 'वेबसाइट पर जाएं',
    
    // Common
    close: 'बंद करें',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
  },
  ku: {
    // Navigation
    home: 'घर',
    symptomChecker: 'लक्षण जांच',
    doctors: 'वैद्य',
    about: 'हमर बारे मा',
    
    // Home Screen
    welcomeTitle: 'वन-टैप डॉक्टर मा स्वागत छ',
    welcomeSubtitle: 'उत्तराखंड मा भरोसेमंद वैद्यों तक जल्दी पहुंच',
    emergencyCall: 'आपातकालीन कॉल',
    checkSymptoms: 'लक्षण देखो',
    findDoctors: 'वैद्य खोजो',
    
    // Symptom Checker
    symptomTitle: 'AI लक्षण जांचकर्ता',
    symptomPlaceholder: 'अपना लक्षण बताओ...',
    analyzeSymptoms: 'लक्षण जांचो',
    analyzing: 'जांच करी रै छ...',
    
    // Doctors
    doctorsTitle: 'वैद्य खोजो',
    dehradun: 'देहरादून',
    haldwani: 'हल्द्वानी',
    available: 'उपलब्ध',
    offline: 'ऑफलाइन',
    experience: 'साल को अनुभव',
    rating: 'रेटिंग',
    bookVideo: 'वीडियो कॉल बुक करो',
    bookPhone: 'फोन कॉल बुक करो',
    compare: 'तुलना करो',
    
    // About
    aboutTitle: 'वन-टैप डॉक्टर को बारे मा',
    founderTitle: 'संस्थापक को बारे मा',
    missionTitle: 'हमारो मिशन',
    contactWebsite: 'वेबसाइट देखो',
    
    // Common
    close: 'बंद करो',
    cancel: 'रद्द करो',
    confirm: 'पुष्टि करो',
    loading: 'लोड होई रै छ...',
    error: 'गलती',
    success: 'सफलता',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage && ['en', 'hi', 'ku'].includes(savedLanguage)) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};