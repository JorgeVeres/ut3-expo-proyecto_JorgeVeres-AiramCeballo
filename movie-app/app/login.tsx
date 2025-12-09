import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/src/stores/useUserStore';
import { useTheme } from '@/src/hooks/useTheme';
import Input from '@/src/components/ui/Input';
import Button from '@/src/components/ui/Button';
import MathCaptcha from '@/src/components/login/MathCaptcha';
import React from 'react';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const login = useUserStore((state) => state.login);
  const { colors } = useTheme();
  const router = useRouter();

  const handleLogin = () => {
    if (username.trim() && captchaSolved) {
      login(username.trim());
      router.replace('/(tabs)/home');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Movie Tracker
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Tu diario personal de películas
        </Text>

        <Input
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <MathCaptcha onSolved={setCaptchaSolved} />

        <Button
          title="Entrar"
          onPress={handleLogin}
          disabled={!username.trim() || !captchaSolved}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    gap: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
});