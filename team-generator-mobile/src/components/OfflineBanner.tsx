import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetworkStatus } from '../context/NetworkStatusContext';

export const OfflineBanner = () => {
  const { isConnected } = useNetworkStatus();
  if (isConnected) return null;
  return (
    <View style={styles.banner}>
      <Text style={styles.text}>You are offline. Some features are unavailable.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d9534f',
    position: 'absolute',
    top: 0,
    zIndex: 1000,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 