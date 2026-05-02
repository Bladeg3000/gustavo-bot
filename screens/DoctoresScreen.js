import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {startListening, speakText} from '../voice';
import {database} from '../database';
import {theme} from '../theme';

const DoctoresScreen = ({navigation}) => {
  const [doctores, setDoctores] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar doctores al iniciar
  useEffect(() => {
    loadDoctores();
  }, []);

  const loadDoctores = async () => {
    try {
      const result = await database.execute('SELECT * FROM doctores');
      setDoctores(result.rows);
      setLoading(false);
    } catch (error) {
      alert('Error cargando doctores: ' + error.message);
      setLoading(false);
    }
  };

  const filterDoctores = () => {
    return doctores.filter(doctor => {
      return (doctor.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
              doctor.especialidad.toLowerCase().includes(searchText.toLowerCase()));
    });
  };

  const handleAddDoctor = () => {
    navigation.navigate('AddDoctor');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doctores</Text>
        <Text style={styles.headerSubtitle}>Guarda y consulta información de especialistas

        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddDoctor}>
            <Ionicons name='ios-plus' size={24} color={theme.colors.primary} />
            <Text style={styles.addText}>Añadir Doctor</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Formulario de búsqueda */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchLabel}>Buscar doctor:</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Nombre o especialidad"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de doctores */}
      <View style={styles.listContainer}>
        {loading ?
          <Text style={styles.loadingText}>Cargando...

        : }
        <FlatList
          data={filterDoctores()}
          keyExtractor={item => item.id_doctor.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('DoctorDetails', {doctor: item})}>
              <View style={styles.itemCard}>
                <Text style={styles.itemTitle}>{item.nombre}</Text>
                <Text style={styles.itemSubtitle}>{item.especialidad || 'Sin especialidad'}</Text>
                <View style={styles.itemActions}>
                  <View style={styles.actionButton container: {}}>
                    <Ionicons name='ios-phone' size={16} color={theme.colors.primary} />
                    <Text style={styles.actionText}>Llamar</Text>
                  </View>
                  <View style={styles.actionButton}>
                    <Ionicons name='ios-pencil' size={16} color={theme.colors.primary} />
                    <Text style={styles.actionText}>Editar</Text>
                  </View>
                  <View style={styles.actionButton}>
                    <Ionicons name='ios-trash' size={16} color={theme.colors.error} />
                    <Text style={styles.actionText}>Eliminar</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  header: {
    backgroundColor: theme.colors.primaryDark,
    padding: 24,
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  headerSubtitle: {
    fontSize: 16,
    marginTop: 4,
    color: '#E8EFFE',
    fontFamily: 'Roboto',
  },
  addButtonContainer: {
    marginTop: 16,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#0066CC',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    alignItems: 'center',
  },
  addText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  searchContainer: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#0066CC',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#0066CC',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchLabel: {
    fontSize: 16,
    color: '#003D99',
    fontWeight: '600',
    fontFamily: 'Montserrat',
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Roboto',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    shadowColor: '#0066CC',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  itemCard: {
    flexDirection: 'column',
    padding: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003D99',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Roboto',
  },
  itemActions: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E8EFFE',
    margin: 4,
  },
  actionText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  loadingText: {
    textAlign: 'center',
    margin: 40,
    fontSize: 18,
    color: '#666666',
  }
});
export default DoctoresScreen;