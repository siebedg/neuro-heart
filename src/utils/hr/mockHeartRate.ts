export interface MockHeartRateData {
  heartRate: number;
  timestamp: number;
}

/**
 * Start een eenvoudige HR-simulator voor mood testing
 */
export default function startMockHeartRate(
  callback: (data: MockHeartRateData) => void,
  baseHeartRate: number = 130
) {
  let hr = baseHeartRate;

  return setInterval(() => {
    // Simuleer kleine hartslagfluctuaties
    const drift = (Math.random() * 2 - 1) * 5;
    hr = Math.max(60, Math.min(190, Math.round(hr + drift)));

    callback({
      heartRate: hr,
      timestamp: Date.now(),
    });
  }, 1000);
}
