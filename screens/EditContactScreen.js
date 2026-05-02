import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {database} from '../database';
import {theme} from '../theme';

const EditContactScreen = ({navigation, route}) => {
  const {contact} = route.params;
  const [fields, setFields] = useState({
    nombre: contact.nombre,
    telefono: contact.telefono,
    email: contact.email,
    categoria: contact.categoria,
    notas: contact.notas,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!fields.nombre.trim()) {
      alert('Debe ingresar el nombre del contacto');
      return false;
    }
    if (!fields.telefono.trim()) {
      alert('Debe ingresar el teléfono');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await database.execute(
        `UPDATE contactos SET nombre = ?, telefono = ?, email = ?, categoria = ?, notas = ? WHERE id_contacto = ?`,
        [
          fields.nombre,
          fields.telefono,
          fields.email,
          fields.categoria,
          fields.notas,
          contact.id_contacto
        ]
      );
      alert('Contacto actualizado exitosamente');
      navigation.goBack();
    } catch (error) {
      alert('Error al actualizar el contacto: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (key) => (value) => {
    setFields(prev => ({...prev, [key]: value}));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Editar Contacto</Text>
      </View>

      {/* Form Fields */}
      <View style={styles.section}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese nombre"
          onChangeText={handleChange('nombre')}
          value={fields.nombre}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de teléfono"
          onChangeText={handleChange('telefono')}
          value={fields.telefono}
          keyboardType="phone-number"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@dominio.com"
          onChangeText={handleChange('email')}
          value={fields.email}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Categoría:</Text>
        <View style={styles.dropdown}>
          <TextInput
            style={styles.dropdownInput}
            placeholder="Seleccione categoría..."
            value={fields.categoria}
            onChangeText={handleChange('categoria')}
          />
        </View>

        <Text style={styles.label}>Notas:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese notas adicionales"
          onChangeText={handleChange('notas')}
          value={fields.notas}
          multiline
        />
      </View>

      {/* Botón Guardar */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          isSubmitting && styles.buttonDisabled,
        ]}
        onPress={handleSave}>
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Actualizando...' : 'Actualizar Contacto'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
  },
  header: {
    backgroundColor: theme.colors.primaryDark,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  section: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    color: '#003D99',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Roboto',
  },
  dropdown: {
    minHeight: 48,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Roboto',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#0066CC',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
});

export default EditContactScreen;