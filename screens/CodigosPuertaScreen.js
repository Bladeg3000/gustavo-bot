import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ListRenderItemInfo,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {database} from '../database';
import {navigation} from '../navigation'; // You'll need to set this up
import {theme} from '../theme';

const CodigosPuertaScreen = () => {
  const [codigos, setCodigos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCodigos();
  }, []);

  const loadCodigos = async () => {
    try {
      const result = await database.execute('SELECT * FROM codigos_puertas');
      setCodigos(result.rows);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los códigos de puertas');
      setLoading(false);
    }
  };

  const filterCodigos = () => {
    return codigos.filter(codigo => {
      return (codigo.nombre_puerta.toLowerCase().includes(searchText.toLowerCase()) ||
              codigo.codigo.toLowerCase().includes(searchText.toLowerCase()));
    });
  };

  const handleAddCodigo = () => {
    navigation.navigate('AddCodigo');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Códigos de Puerta</Text>
        <Text style={styles.headerSubtitle}>Gestión y consultas de códigos especiales</Text>
      </View>

      {/* Botón de acción */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddCodigo}>
        <Ionicons name='ios-plus' size={24} color={theme.colors.primary} />
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>

      {/* Formulario de búsqueda */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchLabel}>Buscar código:</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Código o ubicación"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de códigos */}
      <FlatList
        data={filterCodigos()}
        keyExtractor={item => item.id_codigo.toString()}
        renderItem={({item}) => renderCodigoItem(item)}
        ListEmptyComponent={
          <View style={styles.listEmpty}>
            <Text style={styles.emptyText}>No hay códigos registrados</Text>
          </View>
        }
      />
    </ScrollView>
  );
};

// Renderiza cada artículo de la lista
const renderCodigoItem = (item: any) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('CodigoDetalle', {codigo: item})}>
      <View style={styles.itemCard}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{item.nombre_puerta}</Text>
          <Text style={styles.itemSubtitle} color="#666">
            {item.tipo} • {item.ubicacion}
          </Text>
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemCode}>
            {item.codigo}
          </Text>
          {item.notas ? <Text style={styles.noteText}>{item.notas}</Text> : null}
        </View>
        <View style={styles.itemFooter}>
          <Text style={styles.itemStatus}>{item.activo ? 'Activo' : 'Inactivo'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: theme.colors.backgroundPrimary},
  header: {
    backgroundColor: theme.colors.primaryDark,
    padding: 24,
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {fontSize: 24, fontWeight: '700', color: '#fff', fontFamily: 'Montserrat'},
  headerSubtitle: {fontSize: 16, marginTop: 4, color: '#E8EFFE', fontFamily: 'Roboto'},
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
  addText: {fontSize: 14, color: '#fff', fontWeight: '600'},
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
  searchLabel: {fontSize: 16, color: '#003D99', fontWeight: '600', fontFamily: 'Montserrat', marginBottom: 8},
  searchInput: {flex: 1, fontSize: 16, color: '#1A1A1A', fontFamily: 'Roboto'},
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    shadowColor: theme.colors.primaryLight,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemCard: {
    flexDirection: 'column',
    padding: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemTitle: {fontSize: 16, fontWeight: '600', color: '#003D99', fontFamily: 'Montserrat'},
  itemSubtitle: {fontSize: 12, color: '#666666', fontFamily: 'Roboto'},
  itemBody: {marginTop: 6, padding: 4},
  itemCode: {fontSize: 20, fontWeight: '700', color: '#0066CC', fontFamily: 'Courier'},
  noteText: {fontSize: 10, color: '#999999', fontStyle: 'italic'},
  itemFooter: {marginTop: 8},
  itemStatus: {fontSize: 12, color: '#10B981', fontWeight: '500'},
  listEmpty: {textAlign: 'center', margin: 40},
  emptyText: {color: '#999999', fontStyle: 'italic'},
});

export default CodigosPuertaScreen;