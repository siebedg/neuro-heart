import React from 'react';
import { View, Text, TouchableOpacity, Linking, Platform, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function BluetoothPrompt() {
  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:Bluetooth');
    } else {
      Linking.openSettings();
    }
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="bluetooth-disabled" size={64} color="#cbbdff" />
      <Text style={styles.title}>Bluetooth is Off</Text>
      <Text style={styles.subtitle}>
        To connect your heart rate monitor, please enable Bluetooth.
      </Text>
      <TouchableOpacity style={styles.button} onPress={openSettings}>
        <Text style={styles.buttonText}>Enable Bluetooth</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e1e2e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#cbbdff',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 12,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    backgroundColor: '#cbbdff',
  },
  buttonText: {
    color: '#1e1e2e',
    fontSize: 16,
    fontWeight: '600',
  },
});
