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

const AddIpScreen = ({navigation}) => {
  const [fields, setFields] = useState({
    hostname: 'Nuevo Servidor',
    direccion_ip: '127.0.0.1',
    tipo_dispositivo: 'pc',
    descripcion: '',
    puerto: '80',
    usuario: '',
    contraseña: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!fields.hostname.trim()) {
      alert('Debe ingresar el nombre del dispositivo');
      return false;
    }
    if (!fields.direccion_ip.trim()) {
      alert('Debe ingresar la direción IP');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Encriptar contraseña antes de guardar
      const contraseñaEncriptada = AESCrypto.encrypt(fields.contraseña);
      await database.execute(
        `INSERT INTO numeros_ip (dispositivo_nombre, direccion_ip, tipo_dispositivo, descripcion, puerto, usuario, contraseña, fecha_actualizacion) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [
          fields.hostname,
          fields.direccion_ip,
          fields.tipo_dispositivo,
          fields.descripcion,
          fields.puerto,
          fields.usuario,
          contraseñaEncriptada
        ]
      );
      alert('Dirección IP guardada');
      navigation.goBack();
    } catch (error) {
      alert('Error al guardar la dirección IP: ' + error.message);
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
        <Text style={styles.headerTitle}>Añadir Nueva Dirección IP</Text>
      </View>

      {/* Form Fields */}
      <View style={styles.section}>
        <Text style={styles.label}>Nombre del dispositivo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Servidor Web"
          onChangeText={handleChange('hostname')}
          value={fields.hostname}
        />

        <Text style={styles.label}>Dirección IP:</Text>
        <TextInput
          style={styles.input}
          placeholder="192.168.1.1"
          onChangeText={handleChange('direccion_ip')}
          value={fields.direccion_ip}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Tipo de dispositivo:</Text>
        <TextInput
          style={styles.input}
          placeholder="pc, impresora, servidor"
          onChangeText={handleChange('tipo_dispositivo')}
          value={fields.tipo_dispositivo}
        />

        <Text style={styles.label}>Descripción:</Text>
        <TextInput
          style={styles.input}
          placeholder="Descripción adicional"
          onChangeText={handleChange('descripcion')}
          value={fields.descripcion}
          multiline
        />

        <Text style={styles.label}>Puerto:</Text>
        <TextInput
          style={styles.input}
          placeholder="80, 443"
          onChangeText={handleChange('puerto')}
          value={fields.puerto}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Usuario:</Text>
        <TextInput
          style={styles.input}
          placeholder="admin"
          onChangeText={handleChange('usuario')}
          value={fields.usuario}
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="ingrese contraseña segura"
          onChangeText={handleChange('contraseña')}
          value={fields.contraseña}
          secureTextEntry
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
            {isSubmitting ? 'Guardando...' : 'Guardar IP'}
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
  }
});

export default AddIpScreen;