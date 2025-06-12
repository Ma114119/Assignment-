import React, { createContext, useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator, Image, Animated, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Accelerometer, Gyroscope } from 'expo-sensors';

// Colors
const COLORS = {
  primary: '#6C63FF',
  secondary: '#FF6584',
  background: '#F8F9FA',
  text: '#2D3748',
  lightText: '#718096',
  card: '#FFFFFF',
  success: '#48BB78',
  error: '#F56565'
};

//================================================================
// 1. DATA CONTEXT - Manages all API data and network requests
//================================================================
const DataContext = createContext();

const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [getData, setGetData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [putData, setPutData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Using JSONPlaceholder API for demonstration
  const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  const performGetRequest = async () => {
    console.log('Performing GET request...');
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/posts/1`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      setGetData(json);
      showSuccess('GET request successful!');
    } catch (e) {
      console.error('GET Error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  
  const performPostRequest = async () => {
    console.log('Performing POST request...');
    setLoading(true);
    setError(null);
    try {
      const postBody = { 
        title: 'Mobile App Assignment', 
        body: 'This data was created from our mobile app!', 
        userId: 1 
      };
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(postBody),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      setPostData(json);
      showSuccess('POST request successful!');
    } catch (e) {
      console.error('POST Error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const performPutRequest = async () => {
    console.log('Performing PUT request...');
    setLoading(true);
    setError(null);
    try {
      const putBody = { 
        id: 1, 
        title: 'Updated Mobile App Data', 
        body: 'This data was updated from our mobile app!', 
        userId: 1 
      };
      const response = await fetch(`${API_BASE_URL}/posts/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(putBody),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      setPutData(json);
      showSuccess('PUT request successful!');
    } catch (e) {
      console.error('PUT Error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const value = { 
    getData, 
    postData, 
    putData, 
    loading, 
    error,
    success,
    performGetRequest, 
    performPostRequest, 
    performPutRequest 
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

//================================================================
// 2. API SCREEN COMPONENT - Beautiful UI for API interactions
//================================================================
const ApiScreen = () => {
  const { 
    getData, 
    postData, 
    putData, 
    loading, 
    error,
    success,
    performGetRequest, 
    performPostRequest, 
    performPutRequest 
  } = useData();

  // Animation values
  const buttonScale = new Animated.Value(1);
  
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true
      })
    ]).start();
  };

  const handlePress = (apiFunction) => {
    animateButton();
    apiFunction();
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://img.icons8.com/color/96/000000/api-settings.png' }} 
          style={styles.headerImage}
        />
        <Text style={styles.title}>API Integration Demo</Text>
        <Text style={styles.subtitle}>
          Interact with a REST API using GET, POST, and PUT requests
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Pressable 
            style={[styles.button, styles.getButton]} 
            onPress={() => handlePress(performGetRequest)} 
            disabled={loading}
          >
            <Ionicons name="download" size={20} color="white" />
            <Text style={styles.buttonText}> GET Data</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Pressable 
            style={[styles.button, styles.postButton]} 
            onPress={() => handlePress(performPostRequest)} 
            disabled={loading}
          >
            <Ionicons name="add-circle" size={20} color="white" />
            <Text style={styles.buttonText}> POST Data</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Pressable 
            style={[styles.button, styles.putButton]} 
            onPress={() => handlePress(performPutRequest)} 
            disabled={loading}
          >
            <Ionicons name="create" size={20} color="white" />
            <Text style={styles.buttonText}> PUT Data</Text>
          </Pressable>
        </Animated.View>
      </View>

      {loading && (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.statusText}>Processing your request...</Text>
        </View>
      )}

      {error && (
        <View style={[styles.statusContainer, styles.errorContainer]}>
          <Ionicons name="warning" size={24} color={COLORS.error} />
          <Text style={[styles.statusText, styles.errorText]}>Error: {error}</Text>
        </View>
      )}

      {success && (
        <View style={[styles.statusContainer, styles.successContainer]}>
          <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
          <Text style={[styles.statusText, styles.successText]}>{success}</Text>
        </View>
      )}

      <View style={styles.resultsContainer}>
        <DataCard 
          title="GET Response" 
          data={getData} 
          icon="download"
          color={COLORS.primary}
        />
        <DataCard 
          title="POST Response" 
          data={postData} 
          icon="add-circle"
          color={COLORS.secondary}
        />
        <DataCard 
          title="PUT Response" 
          data={putData} 
          icon="create"
          color="#805AD5"
        />
      </View>
    </ScrollView>
  );
};

const DataCard = ({ title, data, icon, color }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Pressable 
      style={[styles.card, { borderLeftColor: color }]}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.cardHeader}>
        <Ionicons name={icon} size={20} color={color} />
        <Text style={[styles.cardTitle, { color }]}>{title}</Text>
        <Ionicons 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color={COLORS.lightText} 
          style={{ marginLeft: 'auto' }}
        />
      </View>
      {expanded && (
        <Text style={styles.cardContent}>
          {data ? JSON.stringify(data, null, 2) : 'No data yet. Press a button above to make a request.'}
        </Text>
      )}
    </Pressable>
  );
};

//================================================================
// 3. SENSOR SCREEN COMPONENT - Enhanced sensor visualization
//================================================================
const SensorScreen = () => {
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [isAvailable, setIsAvailable] = useState({
    accelerometer: false,
    gyroscope: false
  });
  const [activeSensor, setActiveSensor] = useState('accelerometer');

  useEffect(() => {
    let accelerometerSubscription;
    let gyroscopeSubscription;

    const checkSensors = async () => {
      const accelAvailable = await Accelerometer.isAvailableAsync();
      const gyroAvailable = await Gyroscope.isAvailableAsync();
      
      setIsAvailable({
        accelerometer: accelAvailable,
        gyroscope: gyroAvailable
      });

      if (accelAvailable) {
        Accelerometer.setUpdateInterval(250);
        accelerometerSubscription = Accelerometer.addListener(setAccelerometerData);
      }

      if (gyroAvailable) {
        Gyroscope.setUpdateInterval(250);
        gyroscopeSubscription = Gyroscope.addListener(setGyroscopeData);
      }
    };

    checkSensors();

    return () => {
      accelerometerSubscription && accelerometerSubscription.remove();
      gyroscopeSubscription && gyroscopeSubscription.remove();
    };
  }, []);

  const currentData = activeSensor === 'accelerometer' ? accelerometerData : gyroscopeData;
  const currentSensorAvailable = activeSensor === 'accelerometer' 
    ? isAvailable.accelerometer 
    : isAvailable.gyroscope;

  const round = (n) => (n ? Math.floor(n * 100) / 100 : 0);
  const { x, y, z } = currentData;

  // Calculate bubble positions based on sensor data
  const bubbleX = x * 50;
  const bubbleY = y * -50; // Invert Y for natural movement
  const bubbleZ = Math.abs(z) * 30; // Use absolute value for size

  return (
    <View style={sensorStyles.container}>
      <Text style={sensorStyles.title}>Device Sensors</Text>
      
      <View style={sensorStyles.toggleContainer}>
        <Pressable
          style={[
            sensorStyles.toggleButton,
            activeSensor === 'accelerometer' && sensorStyles.activeToggle
          ]}
          onPress={() => setActiveSensor('accelerometer')}
        >
          <Text style={sensorStyles.toggleText}>Accelerometer</Text>
        </Pressable>
        <Pressable
          style={[
            sensorStyles.toggleButton,
            activeSensor === 'gyroscope' && sensorStyles.activeToggle
          ]}
          onPress={() => setActiveSensor('gyroscope')}
        >
          <Text style={sensorStyles.toggleText}>Gyroscope</Text>
        </Pressable>
      </View>

      {!currentSensorAvailable ? (
        <View style={sensorStyles.errorContainer}>
          <Ionicons name="warning" size={48} color={COLORS.error} />
          <Text style={sensorStyles.errorText}>
            {activeSensor === 'accelerometer' 
              ? 'Accelerometer sensor is not available on this device' 
              : 'Gyroscope sensor is not available on this device'}
          </Text>
        </View>
      ) : (
        <>
          <View style={sensorStyles.visualizationContainer}>
            <View style={sensorStyles.bubbleContainer}>
              <Animated.View 
                style={[
                  sensorStyles.bubble,
                  { 
                    transform: [
                      { translateX: bubbleX },
                      { translateY: bubbleY },
                      { scale: 1 + bubbleZ/100 }
                    ],
                    backgroundColor: activeSensor === 'accelerometer' 
                      ? COLORS.primary 
                      : COLORS.secondary
                  }
                ]}
              />
            </View>
          </View>

          <View style={sensorStyles.dataContainer}>
            <View style={sensorStyles.dataRow}>
              <Text style={sensorStyles.dataLabel}>X:</Text>
              <Text style={sensorStyles.dataValue}>{round(x)}</Text>
              <View style={[sensorStyles.dataBar, { width: `${(Math.abs(x) + 1) * 50}%` }]} />
            </View>
            <View style={sensorStyles.dataRow}>
              <Text style={sensorStyles.dataLabel}>Y:</Text>
              <Text style={sensorStyles.dataValue}>{round(y)}</Text>
              <View style={[sensorStyles.dataBar, { width: `${(Math.abs(y) + 1) * 50}%` }]} />
            </View>
            <View style={sensorStyles.dataRow}>
              <Text style={sensorStyles.dataLabel}>Z:</Text>
              <Text style={sensorStyles.dataValue}>{round(z)}</Text>
              <View style={[sensorStyles.dataBar, { width: `${(Math.abs(z) + 1) * 50}%` }]} />
            </View>
          </View>

          <Text style={sensorStyles.infoText}>
            {activeSensor === 'accelerometer'
              ? "Tilt your device to see the accelerometer values change. The bubble moves according to gravity."
              : "Rotate your device to see the gyroscope values change. The bubble responds to rotation speed."}
          </Text>
        </>
      )}
    </View>
  );
};

//================================================================
// 4. MAIN APP COMPONENT - Navigation setup
//================================================================
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <DataProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'API Demo') {
                  iconName = focused ? 'cloud-done' : 'cloud-outline';
                } else if (route.name === 'Sensors') {
                  iconName = focused ? 'phone-portrait' : 'phone-portrait-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.lightText,
              tabBarStyle: {
                backgroundColor: COLORS.card,
                borderTopWidth: 0,
                elevation: 10,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 10
              },
              headerStyle: { 
                backgroundColor: COLORS.primary,
                shadowColor: 'transparent',
                elevation: 0
              },
              headerTintColor: '#fff',
              headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: 20
              },
            })}
          >
            <Tab.Screen 
              name="API Demo" 
              component={ApiScreen} 
              options={{ title: 'API Integration' }}
            />
            <Tab.Screen 
              name="Sensors" 
              component={SensorScreen} 
              options={{ title: 'Device Sensors' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </DataProvider>
    </SafeAreaProvider>
  );
}

//================================================================
// 5. STYLESHEETS
//================================================================
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  contentContainer: { 
    padding: 20,
    paddingBottom: 40 
  },
  header: {
    alignItems: 'center',
    marginBottom: 30
  },
  headerImage: {
    width: 80,
    height: 80,
    marginBottom: 15
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: COLORS.text,
    marginBottom: 5
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: 'center', 
    color: COLORS.lightText,
    paddingHorizontal: 20
  },
  buttonContainer: { 
    marginBottom: 25 
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  getButton: {
    backgroundColor: COLORS.primary
  },
  postButton: {
    backgroundColor: COLORS.secondary
  },
  putButton: {
    backgroundColor: '#805AD5'
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600',
    marginLeft: 8
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: COLORS.card
  },
  errorContainer: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error
  },
  successContainer: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success
  },
  statusText: {
    marginLeft: 10,
    fontSize: 15
  },
  errorText: {
    color: COLORS.error
  },
  successText: {
    color: COLORS.success
  },
  resultsContainer: { 
    width: '100%' 
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderLeftWidth: 4
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginLeft: 8
  },
  cardContent: { 
    fontFamily: 'monospace', 
    fontSize: 14, 
    color: COLORS.text,
    marginTop: 10,
    lineHeight: 20
  },
});

const sensorStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background,
    padding: 20
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 5,
    marginBottom: 25
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  activeToggle: {
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  toggleText: {
    fontWeight: '600',
    color: COLORS.text
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: { 
    fontSize: 18, 
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 15
  },
  visualizationContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  bubbleContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#EDF2F7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bubble: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary
  },
  dataContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  dataLabel: {
    width: 30,
    fontWeight: 'bold',
    color: COLORS.text,
    fontSize: 16
  },
  dataValue: {
    width: 60,
    fontFamily: 'monospace',
    fontSize: 16,
    color: COLORS.text
  },
  dataBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: 10
  },
  infoText: {
    fontSize: 14,
    color: COLORS.lightText,
    textAlign: 'center',
    paddingHorizontal: 20
  }
});
