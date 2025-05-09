import { classifyHR, getPersonalizedZones } from "./hrZoneClassifier";
import { UserCardioProfile } from "./hrZoneClassifier";

/**
 * Run the HR demo - Test classification and smoothing
 */
export function runDemo() {
  console.log("===== HR Demo =====");

  // 📝 Maak een gebruikersprofiel
  const userProfile: UserCardioProfile = {
    hrRest: 55,
    hrMax: 185,
    age: 40,
    fitnessLevel: "intermediate",
  };

  console.log("Gebruikersprofiel:", userProfile);

  // 📊 Toon gepersonaliseerde zones
  const zones = getPersonalizedZones(userProfile);
  console.log("\nGepersonaliseerde hartslagzones:");
  for (const [zone, limits] of Object.entries(zones)) {
    console.log(`- Zone ${zone}: ${limits.min} - ${limits.max} bpm`);
  }

  // 🏃‍♂️ Simuleer hartslagmetingen
  console.log("\nHartslagclassificatie zonder smoothing:");
  const heartRates = [60, 90, 120, 150, 170];
  for (const hr of heartRates) {
    const result = classifyHR(hr, userProfile, false);
    console.log(
      `HR ${hr} bpm → Zone: ${result.zone}, State: ${result.state}, Rel: ${(
        result.rel * 100
      ).toFixed(2)}%`
    );
  }

  // 💧 Met smoothing
  console.log("\nHartslagclassificatie met smoothing:");
  const smoothedRates = [60, 80, 100, 120, 140, 160, 180];
  for (const hr of smoothedRates) {
    const result = classifyHR(hr, userProfile, true);
    console.log(
      `HR ${hr} bpm (smoothed) → Zone: ${result.zone}, State: ${
        result.state
      }, Rel: ${(result.rel * 100).toFixed(2)}%`
    );
  }

  console.log("\n=== Demo Voltooid ===");
}
