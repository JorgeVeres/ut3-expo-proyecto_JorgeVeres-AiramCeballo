// src/hooks/useShakeDetector.ts

import { useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';

/**
 * Hook para detectar cuando el usuario agita el dispositivo
 * @param onShake - Callback que se ejecuta al detectar shake
 * @param enabled - Si el detector está activo (default: true)
 * @param threshold - Umbral de aceleración para detectar shake (default: 2.5)
 */
export const useShakeDetector = (
  onShake: () => void,
  enabled: boolean = true,
  threshold: number = 2.5
) => {
  const lastShakeTime = useRef(0);
  const SHAKE_COOLDOWN = 1000; // Evitar múltiples detecciones (1 segundo)

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Suscribirse al acelerómetro
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      // Calcular la magnitud de la aceleración
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      
      // Si supera el umbral y ha pasado el cooldown
      const now = Date.now();
      if (acceleration > threshold && now - lastShakeTime.current > SHAKE_COOLDOWN) {
        lastShakeTime.current = now;
        onShake();
        
        
      }
    });

    // Configurar frecuencia de actualización (10 veces por segundo)
    Accelerometer.setUpdateInterval(100);

    // Cleanup
    return () => {
      subscription.remove();
    };
  }, [enabled, onShake, threshold]);
};