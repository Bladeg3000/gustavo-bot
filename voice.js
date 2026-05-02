import * as Speech from 'expo-speech';
import * as Voice from 'react-native-voice';
import {requestPermissionsAsync, PERMISSIONS} from 'expo-permissions';

// Configurar reconocimiento de voz
Voice.onSpeechStart = onSpeechStart;
Voice.onSpeechEnd = onSpeechEnd;
Voice.onSpeechError = onSpeechError;
Voice.onSpeechResults = onSpeechResults;
Voice.onSpeechPartialResults = onSpeechPartialResults;

let isListening = false;
let speechResults = '';

const requestVoicePermissions = async () => {
  try {
    const {status} = await requestPermissionsAsync([
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]);
    return status === 'granted';
  } catch (error) {
    console.error('Error al solicitar permisos de voz:', error);
    return false;
  }
};

const startListening = (callback) => {
  if (!isListening) {
    isListening = true;
    speechResults = '';
    Voice.start('es-ES'); // Español (España)
    // Nota: react-native-voice también soporta variantes latinoamericanas
  }
};

const stopListening = () => {
  if (isListening) {
    Voice.stop();
    isListening = false;
  }
};

const speakText = (text, options = {}) => {
  Speech.speak(text, {
    language: options.language || 'es-ES',
    pitch: options.pitch || 1.0,
    rate: options.rate || 1.0,
    ...options,
  });
};

const stopSpeaking = () => {
  Speech.stop();
};

// Funciones de callback (deben ser implementadas en los componentes)
const onSpeechStart = () => {
  console.log('Hablando...');
};

const onSpeechEnd = () => {
  isListening = false;
  console.log('Habla terminada');
};

const onSpeechError = (error) => {
  isListening = false;
  console.error('Error de voz:', error);
};

const onSpeechResults = (event) => {
  isListening = false;
  const {value} = event;
  speechResults = value[0]; // Tomar el primer resultado
  // Aquí se enviaría el resultado al parser de intenciones
};

const onSpeechPartialResults = (event) => {
  console.log('Resultado parcial:', event.value);
};

export {
  requestVoicePermissions,
  startListening,
  stopListening,
  speakText,
  stopSpeaking,
  onSpeechStart,
  onSpeechEnd,
  onSpeechError,
  onSpeechResults,
  onSpeechPartialResults,
};