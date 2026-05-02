import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {navigation} from '../navigation';
import {theme} from '../theme';

const ContactFilterScreen = () => {
  const [selectedCategory, setSelectedCategory] = ['trabajo'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigation.goBack(); // Return to ContactosScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtrar por categoría:</Text>
      <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => handleCategoryChange('trabajo')}
        >
          <Text style={styles.categoryText}>Trabajo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => handleCategoryChange('personal')}
        >
          <Text style={styles.categoryText}>Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => handleCategoryChange('emergencia')}
        >
          <Text style={styles.categoryText}>Emergencia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  title: {
    fontSize: 18,
    color: theme.colors.primaryDark,
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  categoryButton: {
    padding: 12,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 8,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    alignItems: 'center',
    margin: 5,
  },
  categoryText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: '600',
  }
});

export default ContactFilterScreen;