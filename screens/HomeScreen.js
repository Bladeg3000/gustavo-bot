import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {startListening, stopListening, speakText} from '../voice';
import {theme} from '../theme';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      startListening();
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    // Lógica de búsqueda aquí
  };

  const quickActions = [
    {id: 1, title: 'Doctores', icon: 'ios-medical', color: '#0066CC', screen: 'Doctores'},
    {id: 2, title: 'Códigos', icon: 'ios-key', color: '#0066CC', screen: 'CódigosPuerta'},
    {id: 3, title: 'IPs', icon: 'ios-wifi', color: '#0066CC', screen: 'DireccionesIP'},
    {id: 4, title: 'Contactos', icon: 'ios-contacts', color: '#0066CC', screen: 'Contactos'},
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado de bienvenida */}
      <View style={styles.welcomeHeader}>
        <Text style={styles.welcomeTitle}>¡Hola!</Text>
        <Text style={styles.welcomeSubtitle}>¿En qué te puedo ayudar hoy?</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="ios-search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Atajos rápidos */}
      <View style={styles.shortcutsContainer}>
        <Text style={styles.sectionTitle}>Accesos rápidos</Text>
        <View style={styles.shortcutsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.shortcutCard, {borderColor: action.color}]}
              onPress={() => navigation.navigate(action.screen)}>
              <Ionicons name={action.icon} size={24} color={action.color} />
              <Text style={[styles.shortcutText, {color: action.color}]}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Botón de voz flotante */}
      <TouchableOpacity
        style={styles.micButton}
        onPressIn={handleVoiceCommand}
        onPressOut={() => setIsListening(false)}>
        <Ionicons
          name={isListening ? 'ios-mic-off' : 'ios-mic'}
          size={32}
          color="#fff"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  welcomeHeader: {
    backgroundColor: theme.colors.primaryDark,
    padding: 24,
    paddingTop: 40,
    paddingBottom: 30,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#E8EFFE',
    marginTop: 8,
    fontFamily: 'Roboto',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    marginTop: -20,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderColor: '#0066CC',
    borderWidth: 1,
    shadowColor: '#0066CC',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Roboto',
  },
  shortcutsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003D99',
    marginBottom: 16,
    fontFamily: 'Montserrat',
  },
  shortcutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shortcutCard: {
    backgroundColor: '#fff',
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 16,
    borderColor: '#0066CC',
    borderLeftWidth: 4,
    shadowColor: '#0066CC',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortcutText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    color: '#003D99',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  micButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0066CC',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default HomeScreen;