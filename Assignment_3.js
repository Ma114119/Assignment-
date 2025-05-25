import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// 🏠 Home Screen
function HomeScreen() {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setCity('Permission Denied');
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });

        if (geocode.length > 0 && geocode[0].city) {
          setCity(geocode[0].city);
        } else {
          setCity('Unknown Location');
        }
      } catch (err) {
        setCity('Error Fetching Location');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Text style={styles.title}>🌍 Your Current City</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#1DB954" />
      ) : (
        <Text style={styles.city}>{city}</Text>
      )}
    </View>
  );
}

// 👤 Profile Screen
function ProfileScreen({ navigation }) {
  const [name, setName] = useState('User');

  useEffect(() => {
    navigation.setOptions({ title: name || 'Profile' });
  }, [name]);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Text style={styles.title}>📝 Edit Your Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#666"
      />
    </KeyboardAvoidingView>
  );
}

// ⚙️ Settings Screen
function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Text style={styles.title}>⚙️ Settings</Text>
      <Text style={styles.subtext}>More features coming soon...</Text>
    </View>
  );
}

// 🌐 App Navigation
export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTitleStyle: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 18,
          },
          tabBarStyle: {
            backgroundColor: '#181818',
            borderTopColor: '#2a2a2a',
            height: 60,
            paddingBottom: 5,
          },
          tabBarActiveTintColor: '#1DB954',
          tabBarInactiveTintColor: '#777',
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: 'location',
              Profile: 'person',
              Settings: 'settings',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  city: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1DB954',
    textTransform: 'capitalize',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1F1F1F',
    color: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: '#333',
    borderWidth: 1,
  },
  subtext: {
    fontSize: 16,
    color: '#A0A0A0',
    marginTop: 10,
  },
});


