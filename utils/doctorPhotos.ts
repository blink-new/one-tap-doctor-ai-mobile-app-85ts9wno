import AsyncStorage from '@react-native-async-storage/async-storage';

interface DoctorPhotoCache {
  [key: string]: {
    url: string;
    timestamp: number;
  };
}

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days
const CACHE_KEY = 'doctor_photos_cache';

// Professional avatar placeholders
const AVATAR_PLACEHOLDERS = [
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1594824475317-87b0b5b0c3e1?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face',
];

export const getDoctorPhoto = async (doctorName: string, specialization: string, city: string): Promise<string> => {
  const cacheKey = `${doctorName}_${specialization}_${city}`.toLowerCase().replace(/\s+/g, '_');
  
  try {
    // Check cache first
    const cachedData = await getCachedPhoto(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // Try to fetch from search API (simulated for now)
    const photoUrl = await fetchDoctorPhotoFromAPI(doctorName, specialization, city);
    
    if (photoUrl) {
      // Cache the result
      await cachePhoto(cacheKey, photoUrl);
      return photoUrl;
    }

    // Fallback to placeholder
    const placeholderUrl = getPlaceholderAvatar(doctorName);
    await cachePhoto(cacheKey, placeholderUrl);
    return placeholderUrl;

  } catch (error) {
    console.error('Error fetching doctor photo:', error);
    return getPlaceholderAvatar(doctorName);
  }
};

const getCachedPhoto = async (cacheKey: string): Promise<string | null> => {
  try {
    const cacheData = await AsyncStorage.getItem(CACHE_KEY);
    if (!cacheData) return null;

    const cache: DoctorPhotoCache = JSON.parse(cacheData);
    const cachedItem = cache[cacheKey];

    if (cachedItem && (Date.now() - cachedItem.timestamp) < CACHE_DURATION) {
      return cachedItem.url;
    }

    return null;
  } catch (error) {
    console.error('Error reading photo cache:', error);
    return null;
  }
};

const cachePhoto = async (cacheKey: string, url: string): Promise<void> => {
  try {
    const cacheData = await AsyncStorage.getItem(CACHE_KEY);
    const cache: DoctorPhotoCache = cacheData ? JSON.parse(cacheData) : {};

    cache[cacheKey] = {
      url,
      timestamp: Date.now(),
    };

    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error caching photo:', error);
  }
};

const fetchDoctorPhotoFromAPI = async (doctorName: string, specialization: string, city: string): Promise<string | null> => {
  // In a real implementation, you would use Google Custom Search API or Bing Image Search API
  // For now, we'll simulate this with some logic to return professional medical photos
  
  const searchQuery = `${doctorName} ${specialization} ${city} doctor`;
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo purposes, return a professional medical photo based on specialization
  const medicalPhotos = {
    'general physician': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    'cardiologist': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    'pediatrician': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
    'dermatologist': 'https://images.unsplash.com/photo-1594824475317-87b0b5b0c3e1?w=400&h=400&fit=crop&crop=face',
    'orthopedic': 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face',
    'ent specialist': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    'gynecologist': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    'neurologist': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
  };

  const specializationKey = specialization.toLowerCase();
  return medicalPhotos[specializationKey as keyof typeof medicalPhotos] || null;
};

const getPlaceholderAvatar = (doctorName: string): string => {
  // Use doctor name to consistently return the same placeholder
  const nameHash = doctorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = nameHash % AVATAR_PLACEHOLDERS.length;
  return AVATAR_PLACEHOLDERS[index];
};

export const clearPhotoCache = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.error('Error clearing photo cache:', error);
  }
};