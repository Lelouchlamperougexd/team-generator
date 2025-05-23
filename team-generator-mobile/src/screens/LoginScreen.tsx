import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../theme/theme';
import { useNetworkStatus } from '../context/NetworkStatusContext';

export const LoginScreen = ({ onGoToRegister }: { onGoToRegister: () => void }) => {
  const { login, enterGuestMode } = useAuth();
  const theme = useTheme();
  const { isConnected } = useNetworkStatus();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
    } catch (e: any) {
      Alert.alert('Login Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.text }]}>Login</Text>
      {!isConnected && (
        <Text style={{ color: theme.error, marginBottom: 16 }}>You are offline. Login and registration are disabled.</Text>
      )}
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.inputBackground }]}
        placeholder="Email"
        placeholderTextColor={theme.textSecondary}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.inputBackground }]}
        placeholder="Password"
        placeholderTextColor={theme.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleLogin} disabled={loading || !isConnected}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.cardBackground, marginTop: 8 }]} onPress={onGoToRegister} disabled={!isConnected}>
        <Text style={[styles.buttonText, { color: theme.primary }]}>Don't have an account? Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.error, marginTop: 24 }]} onPress={enterGuestMode}>
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    width: '100%',
    maxWidth: 340,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 