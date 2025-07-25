import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { blink } from '../../lib/blink';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function SymptomCheckerScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI health assistant. Please describe your symptoms and I\'ll help you find the right doctor.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const analyzeSymptoms = async (symptoms: string) => {
    setIsLoading(true);
    
    try {
      const prompt = `You are a virtual medical assistant for a mobile app called "One-Tap Doctor" that helps users in Uttarakhand, India. Based on the user's symptoms, return:

1. A short summary of the possible condition (in simple language).
2. A recommendation for the type of doctor they should consult.
3. A recommendation for the top 2 doctors in either Dehradun or Haldwani (use realistic Indian doctor names).
4. A brief reason why those doctors are suitable.

Format your response clearly with emojis and sections.

User's symptoms: "${symptoms}"`;

      const { text } = await blink.ai.generateText({
        prompt,
        model: 'gpt-4o-mini',
        maxTokens: 500,
      });

      addMessage(text, false);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      addMessage(
        'I apologize, but I\'m having trouble analyzing your symptoms right now. Please try again or consult with a doctor directly.',
        false
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    addMessage(userMessage, true);
    setInputText('');
    
    analyzeSymptoms(userMessage);
  };

  const clearChat = () => {
    Alert.alert(
      'Clear Chat',
      'Are you sure you want to start a new conversation?',
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            setMessages([
              {
                id: '1',
                text: 'Hello! I\'m your AI health assistant. Please describe your symptoms and I\'ll help you find the right doctor.',
                isUser: false,
                timestamp: new Date(),
              },
            ]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>{t('symptomTitle')}</Text>
        <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
          <Ionicons name="refresh" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.isUser 
                  ? [styles.userBubble, { backgroundColor: colors.primary }]
                  : [styles.aiBubble, { backgroundColor: colors.background }],
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.isUser 
                    ? styles.userText 
                    : [styles.aiText, { color: colors.text }],
                ]}
              >
                {message.text}
              </Text>
            </View>
          </View>
        ))}
        
        {isLoading && (
          <View style={[styles.messageContainer, styles.aiMessage]}>
            <View style={[styles.messageBubble, styles.aiBubble, { backgroundColor: colors.background }]}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={[styles.messageText, styles.aiText, { marginLeft: 8, color: colors.text }]}>
                {t('analyzing')}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={[styles.inputContainer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <TextInput
          style={[styles.textInput, { borderColor: colors.border, color: colors.text }]}
          value={inputText}
          onChangeText={setInputText}
          placeholder={t('symptomPlaceholder')}
          placeholderTextColor={colors.textSecondary}
          multiline
          maxLength={500}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[
            styles.sendButton, 
            { backgroundColor: colors.primary },
            (!inputText.trim() || isLoading) && { backgroundColor: colors.border }
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Disclaimer */}
      <View style={[styles.disclaimer, { backgroundColor: colors.surface }]}>
        <Ionicons name="information-circle" size={16} color={colors.warning} />
        <Text style={[styles.disclaimerText, { color: colors.textSecondary }]}>
          This is for informational purposes only. Always consult a qualified doctor.
        </Text>
      </View>
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
  clearButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 16,
    borderRadius: 16,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    // Color will be set dynamically
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  disclaimerText: {
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
});