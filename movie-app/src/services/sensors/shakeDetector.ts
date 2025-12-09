import { Accelerometer } from 'expo-sensors';

/**
 * Servicio para detectar cuando el usuario agita el dispositivo
 */

export interface ShakeDetectorConfig {
  threshold: number; // Umbral de aceleración para detectar shake
  cooldown: number; // Tiempo mínimo entre detecciones (ms)
  updateInterval: number; // Frecuencia de actualización del sensor (ms)
}

const DEFAULT_CONFIG: ShakeDetectorConfig = {
  threshold: 2.5,
  cooldown: 1000,
  updateInterval: 100,
};

class ShakeDetectorService {
  private subscription: any = null;
  private lastShakeTime: number = 0;
  private config: ShakeDetectorConfig = DEFAULT_CONFIG;
  private callback: (() => void) | null = null;

  /**
   * Iniciar la detección de agitado
   */
  start(callback: () => void, config?: Partial<ShakeDetectorConfig>) {
    // Actualizar configuración si se proporciona
    if (config) {
      this.config = { ...DEFAULT_CONFIG, ...config };
    }

    this.callback = callback;

    // Si ya hay una suscripción activa, detenerla primero
    if (this.subscription) {
      this.stop();
    }

    // Configurar la frecuencia de actualización
    Accelerometer.setUpdateInterval(this.config.updateInterval);

    // Suscribirse al acelerómetro
    this.subscription = Accelerometer.addListener(({ x, y, z }) => {
      // Calcular la magnitud de la aceleración
      const acceleration = Math.sqrt(x * x + y * y + z * z);

      // Verificar si supera el umbral y ha pasado el tiempo de cooldown
      const now = Date.now();
      if (
        acceleration > this.config.threshold &&
        now - this.lastShakeTime > this.config.cooldown
      ) {
        this.lastShakeTime = now;
        
        // Ejecutar callback
        if (this.callback) {
          this.callback();
        }

        if (__DEV__) {
          console.log(`🔔 Shake detected! Acceleration: ${acceleration.toFixed(2)}`);
        }
      }
    });

    if (__DEV__) {
      console.log('👂 Shake detector started');
    }
  }

  /**
   * Detener la detección de agitado
   */
  stop() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
      this.callback = null;

      if (__DEV__) {
        console.log('🛑 Shake detector stopped');
      }
    }
  }

  /**
   * Verificar si el detector está activo
   */
  isActive(): boolean {
    return this.subscription !== null;
  }

  /**
   * Actualizar la configuración sin reiniciar
   */
  updateConfig(config: Partial<ShakeDetectorConfig>) {
    this.config = { ...this.config, ...config };
    
    // Si está activo, actualizar el intervalo
    if (this.subscription) {
      Accelerometer.setUpdateInterval(this.config.updateInterval);
    }
  }

  /**
   * Obtener la configuración actual
   */
  getConfig(): ShakeDetectorConfig {
    return { ...this.config };
  }
}

// Exportar instancia singleton
export const shakeDetector = new ShakeDetectorService();

// Exportar la clase por si se necesitan múltiples instancias
export default ShakeDetectorService;