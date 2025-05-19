import { log } from "@/src/utils/log.util";
import { classifyHR, getPersonalizedZones } from "./hrZoneClassifier";
import { UserCardioProfile } from "./hrZoneClassifier";

/**
 * Run the HR demo - Test classification and smoothing
 */
export function runDemo() {
  log("===== HR Demo =====", "DEMO");

  // Maak gebruikersprofiel
  const userProfile: UserCardioProfile = {
    hrRest: 55,
    hrMax: 185,
    age: 40,
    fitnessLevel: "intermediate",
  };

  log(`Gebruikersprofiel: ${JSON.stringify(userProfile)}`, "DEMO");
  // Toon gepersonaliseerde zones
  const zones = getPersonalizedZones(userProfile);
  log("\nGepersonaliseerde hartslagzones:", "DEMO");
  for (const [zone, limits] of Object.entries(zones)) {
    log(`- Zone ${zone}: ${limits.min} - ${limits.max} bpm`, "DEMO");
  }

  // Simuleer hartslagmetingen
  log("\nHartslagclassificatie zonder smoothing:", "DEMO");
  const heartRates = [60, 90, 120, 150, 170];
  for (const hr of heartRates) {
    const result = classifyHR(hr, userProfile, false);
    log(
      `HR ${hr} bpm → Zone: ${result.zone}, State: ${result.state}, Rel: ${(
        result.rel * 100
      ).toFixed(2)}%`,
      "DEMO"
    );
  }

  // Met smoothing
  log("\nHartslagclassificatie met smoothing:", "DEMO");
  const smoothedRates = [60, 80, 100, 120, 140, 160, 180];
  for (const hr of smoothedRates) {
    const result = classifyHR(hr, userProfile, true);
    log(
      `HR ${hr} bpm (smoothed) → Zone: ${result.zone}, State: ${
        result.state
      }, Rel: ${(result.rel * 100).toFixed(2)}%`,
      "DEMO"
    );
  }

  log("\n=== Demo Voltooid ===", "DEMO");
}
