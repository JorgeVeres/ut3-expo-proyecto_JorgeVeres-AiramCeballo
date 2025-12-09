import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useTheme';
import { useSettingsStore } from '@/src/stores/useSettingsStore';
import { useUserStore } from '@/src/stores/useUserStore';
import Card from '@/src/components/ui/Card';
import React from 'react';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { darkMode, shakeEnabled, toggleDarkMode, toggleShake } = useSettingsStore();
  const { username, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Ajustes</Text>

      <Card style={styles.section}>
        <Text style={[styles.username, { color: colors.text }]}>
          👤 {username}
        </Text>
      </Card>

      <Card style={styles.section}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="moon" size={24} color={colors.text} />
            <Text style={[styles.label, { color: colors.text }]}>
              Modo Oscuro
            </Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="phone-portrait" size={24} color={colors.text} />
            <Text style={[styles.label, { color: colors.text }]}>
              Agitar para película aleatoria
            </Text>
          </View>
          <Switch
            value={shakeEnabled}
            onValueChange={toggleShake}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>
      </Card>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.error }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out" size={24} color="#fff" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 16,
    gap: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  label: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 'auto',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});