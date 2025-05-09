import { HRState, Zone } from "@/src/audio/types";
import { SimpleHeartRateSmoothing } from "./hrSmoothing";

export interface UserCardioProfile {
  hrRest: number;
  hrMax?: number;
  age: number;
  fitnessLevel: "beginner" | "intermediate" | "advanced";
}

/** Globale smoothing buffer voor alle HR-verwerking */
const heartRateSmoother = new SimpleHeartRateSmoothing(30); // 30 data points ≈ 30s window

/** Basis HRR zone-limieten */
const BASE_LIMITS: Record<Zone, [number, number]> = {
  recovery: [0.4, 0.6],
  sustained: [0.6, 0.8],
  activation: [0.8, 0.9],
};

/** Fitnessniveau aanpassingen */
const FITNESS_ADJUSTMENTS = {
  beginner: -0.05,
  intermediate: 0.0,
  advanced: 0.05,
};

/** Leeftijdsaanpassingen */
function getAgeAdjustment(age: number): number {
  return age <= 35 ? 0 : -0.02 * ((age - 35) / 10);
}

/** Bereken HRmax */
function calculateHRMax(age: number): number {
  return Math.round(208 - 0.7 * age);
}

/** Pas HR-zone-limieten aan op basis van leeftijd en fitnessniveau */
function getAdjustedLimits(profile: UserCardioProfile): Record<Zone, [number, number]> {
  const ageAdj = getAgeAdjustment(profile.age);
  const fitnessAdj = FITNESS_ADJUSTMENTS[profile.fitnessLevel];

  return Object.fromEntries(
    Object.entries(BASE_LIMITS).map(([zone, [low, high]]) => {
      const adjLow = Math.max(0.3, Math.min(0.9, low + ageAdj + fitnessAdj));
      const adjHigh = Math.max(0.4, Math.min(0.95, high + ageAdj + fitnessAdj));
      return [zone as Zone, [adjLow, adjHigh]];
    })
  ) as Record<Zone, [number, number]>;
}

/** HR-classificatie zonder HRV */
export function classifyHR(
  hr: number,
  profile: UserCardioProfile,
  useSmoothing: boolean = true
): { zone: Zone; state: HRState; rel: number; smoothedHR?: number } {
  // Smoothing
  const smoothedHR = useSmoothing ? heartRateSmoother.process(hr) : hr;
  const hrToClassify = useSmoothing ? smoothedHR : hr;

  // HR max berekenen
  const hrMax = profile.hrMax || calculateHRMax(profile.age);
  const hrRest = profile.hrRest;
  const relativeIntensity = (hrToClassify - hrRest) / (hrMax - hrRest);

  // Klassieke HR-classificatie
  const limits = getAdjustedLimits(profile);
  for (const [zone, [low, high]] of Object.entries(limits)) {
    if (relativeIntensity >= low && relativeIntensity <= high) {
      const span = high - low;
      if (relativeIntensity < low + 0.25 * span) return { zone: zone as Zone, state: "tooLow", rel: relativeIntensity, smoothedHR };
      if (relativeIntensity > high - 0.25 * span) return { zone: zone as Zone, state: "tooHigh", rel: relativeIntensity, smoothedHR };
      return { zone: zone as Zone, state: "optimal", rel: relativeIntensity, smoothedHR };
    }
  }

  // Buiten limieten → force low/high
  return relativeIntensity < limits.recovery[0]
    ? { zone: "recovery", state: "tooLow", rel: relativeIntensity, smoothedHR }
    : { zone: "activation", state: "tooHigh", rel: relativeIntensity, smoothedHR };
}

/** Personaliseer HR-zones */
export function getPersonalizedZones(profile: UserCardioProfile): Record<Zone, { min: number; max: number }> {
  const hrMax = profile.hrMax || calculateHRMax(profile.age);
  const hrRest = profile.hrRest;
  const hrReserve = hrMax - hrRest;
  const limits = getAdjustedLimits(profile);

  return Object.fromEntries(
    Object.entries(limits).map(([zone, [low, high]]) => [
      zone as Zone,
      {
        min: Math.round(hrRest + low * hrReserve),
        max: Math.round(hrRest + high * hrReserve),
      },
    ])
  ) as Record<Zone, { min: number; max: number }>;
}

/** Reset de HR smoothing buffer */
export function resetHeartRateSmoothing(): void {
  heartRateSmoother.reset();
}

/** Krijg de laatst gerapporteerde smoothed heart rate */
export function getLastSmoothedHeartRate(): number | null {
  return heartRateSmoother.getLastValue();
}
