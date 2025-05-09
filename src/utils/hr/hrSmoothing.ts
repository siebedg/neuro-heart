/**
 * Interface voor hartslagmetingen
 */
export interface HeartRateDataPoint {
  heartRate: number;
  timestamp: number;
}

/**
 * Eenvoudige buffer voor 30-seconden gemiddelde
 */
export class SimpleHeartRateBuffer {
  private buffer: number[] = [];
  private readonly maxSize: number;

  constructor(maxSize: number = 30) {
    this.maxSize = maxSize;
  }

  /**
   * Voeg een nieuwe hartslag toe en beperk bufferlengte
   */
  public add(heartRate: number): void {
    this.buffer.push(heartRate);
    if (this.buffer.length > this.maxSize) {
      this.buffer.shift(); // Verwijder oudste item
    }
  }

  /**
   * Bereken het eenvoudige gemiddelde
   */
  public getAverage(): number | null {
    if (this.buffer.length === 0) return null;
    const sum = this.buffer.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.buffer.length);
  }

  /**
   * Reset de buffer
   */
  public reset(): void {
    this.buffer = [];
  }
}

/**
 * Simpele smoothing met fallback naar de laatste waarde
 */
export class SimpleHeartRateSmoothing {
  private buffer: SimpleHeartRateBuffer;
  private lastValue: number | null = null;

  constructor(windowSize: number = 30) {
    this.buffer = new SimpleHeartRateBuffer(windowSize);
  }

  /**
   * Verwerk een nieuwe hartslag
   */
  public process(heartRate: number): number {
    this.buffer.add(heartRate);
    const avg = this.buffer.getAverage();
    this.lastValue = avg !== null ? avg : heartRate;
    return this.lastValue;
  }

  /**
   * Krijg de laatste waarde
   */
  public getLastValue(): number | null {
    return this.lastValue;
  }

  /**
   * Reset de buffer
   */
  public reset(): void {
    this.buffer.reset();
    this.lastValue = null;
  }
}
