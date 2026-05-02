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

const AddDoctorScreen = ({navigation}) => {
  const [fields, setFields] = useState({
    nombre: '',
    especialidad: '',
    telefono: '',
    email: '',
    direccion: '',
    notas: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!fields.nombre.trim()) {
      alert('Debe ingresar el nombre del doctor');
      return false;
    }
    if (!fields.email.trim()) {
      alert('Debe ingresar el email del doctor');
      return false;
    }
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fields.email)) {
      alert('Formato de email no válido');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await database.execute(
        `INSERT INTO doctores (nombre, especialidad, telefono, email, direccion, notas, fecha_actualizacion) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [
          fields.nombre,
          fields.especialidad,
          fields.telefono,
          fields.email,
          fields.direccion,
          fields.notas,
        ]
      );
      alert('Doctor agregado exitosamente');
      navigation.goBack(); // Return to previous screen
    } catch (error) {
      if (error.code === 'UNIQUE' && error.message.includes('nombre')) {
        alert('Ya existe un doctor con este nombre');
      } else {
        alert('Error al guardar el doctor: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (key) => (value) => {
    setFields(prev => ({...prev, [key]: value}));
  };

  return {
    screen: (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Añadir Nuevo Doctor</Text>
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
            autoCapitalize="words"
          />

          <Text style={styles.label}>Especialidad:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese especialidad"
            onChangeText={handleChange('especialidad')}
            value={fields.especialidad}
          />

          <Text style={styles.label}>Teléfono:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese teléfono"
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

          <Text style={styles.label}>Dirección:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese dirección"
            onChangeText={handleChange('direccion')}
            value={fields.direccion}
            multiline
          />

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
              {isSubmitting ? 'Guardando...' : 'Guardar Doctor'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    styles,
    handleChange,
    validateForm,
    isSubmitting,
  };
};

export default AddDoctorScreen;