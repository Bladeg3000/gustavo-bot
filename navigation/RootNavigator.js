import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DoctoresScreen from '../screens/DoctoresScreen';
import AddDoctorScreen from '../screens/AddDoctorScreen';
import CodigosPuertaScreen from '../screens/CodigosPuertaScreen';
import ContactosScreen from '../screens/ContactosScreen';
import AddContactScreen from '../screens/AddContactScreen';
import DireccionesIpScreen from '../screens/DireccionesIpScreen';
import AddIpScreen from '../screens/AddIpScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'ios-home';
        else if (route.name === 'Doctores') iconName = 'ios-medical';
        else if (route.name === 'Códigos') iconName = 'ios-key';
        else if (route.name === 'Contactos') iconName = 'ios-people';
        else if (route.name === 'IPs') iconName = 'ios-wifi';
        else if (route.name === 'Ajustes') iconName = 'ios-settings';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: '#666',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Doctores" component={DoctoresScreen} />
    <Tab.Screen name="Códigos" component={CodigosPuertaScreen} />
    <Tab.Screen name="Contactos" component={ContactosScreen} />
    <Tab.Screen name="IPs" component={DireccionesIpScreen} />
    <Tab.Screen name="Ajustes" component={SettingsScreen} />
  </Tab.Navigator>
);

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        {/* Modales / pantallas de creación */}
        <Stack.Screen name="AddDoctor" component={AddDoctorScreen} />
        <Stack.Screen name="AddContact" component={AddContactScreen} />
        <Stack.Screen name="AddIp" component={AddIpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
