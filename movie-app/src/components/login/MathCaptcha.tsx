import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useTheme } from '@/src/hooks/useTheme';
import Input from '@/src/components/ui/Input';
import React from 'react';

interface MathCaptchaProps {
  onSolved: (solved: boolean) => void;
}

export default function MathCaptcha({ onSolved }: MathCaptchaProps) {
  const { colors } = useTheme();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer('');
    onSolved(false);
  };

  const checkAnswer = (value: string) => {
    setAnswer(value);
    const userAnswer = parseInt(value);
    const correctAnswer = num1 + num2;
    onSolved(userAnswer === correctAnswer);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: colors.text }]}>
        ¿Cuánto es {num1} + {num2}?
      </Text>
      <Input
        placeholder="Tu respuesta"
        value={answer}
        onChangeText={checkAnswer}
        keyboardType="numeric"
        maxLength={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});