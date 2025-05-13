export interface HeartRateDataPoint {
  heartRate: number;
  timestamp: number;
}

// Tijdgebaseerde buffer
export class SimpleHeartRateBuffer {
  private buffer: HeartRateDataPoint[] = [];
  private readonly maxDuration: number;

  constructor(maxDuration: number = 15000) {
    // 15 seconden
    this.maxDuration = maxDuration;
  }

  // Voeg nieuwe hartslag toe en verwijder oude metingen
  public add(data: HeartRateDataPoint): void {
    const now = Date.now();
    this.buffer.push(data);
    this.buffer = this.buffer.filter(
      (point) => now - point.timestamp <= this.maxDuration
    );
  }

  // Bereken gemiddelde
  public getAverage(): number | null {
    if (this.buffer.length === 0) return null;
    const sum = this.buffer.reduce((a, b) => a + b.heartRate, 0);
    return Math.round(sum / this.buffer.length);
  }

  public reset(): void {
    this.buffer = [];
  }
}

// Simpele smoothing met fallback naar de laatste waarde
export class SimpleHeartRateSmoothing {
  private buffer: SimpleHeartRateBuffer;
  private lastValue: number | null = null;

  constructor(windowSizeMs: number = 15000) {
    this.buffer = new SimpleHeartRateBuffer(windowSizeMs);
  }

  // Verwerk nieuwe hartslag
  public process(heartRate: number): number {
    const timestamp = Date.now();
    this.buffer.add({ heartRate, timestamp });
    const avg = this.buffer.getAverage();
    this.lastValue = avg !== null ? avg : heartRate;
    return this.lastValue;
  }

  public getLastValue(): number | null {
    return this.lastValue;
  }

  public reset(): void {
    this.buffer.reset();
    this.lastValue = null;
  }
}
