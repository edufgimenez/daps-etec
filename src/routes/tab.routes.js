// src/routes/tab.routes.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Nova denúncia</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Consultar denúncias</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'edit'; // ícone de caneta para nova denúncia
          } else if (route.name === 'Settings') {
            iconName = 'file-text'; // ícone de arquivo para consulta de denúncias
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F1A801',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Nova denúncia' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Consultar denúncias' }} />
    </Tab.Navigator>
  );
}
