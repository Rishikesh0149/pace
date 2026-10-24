import { describe, expect, it } from "vitest";
import { sampleProfiles } from "../lib/sample-profiles";
import { calculateTopicPriorities } from "../lib/prioritisation";
import { generateWeeklyPlan } from "../lib/scheduling";
import { validateProfile } from "../lib/validation";
describe("Pace planning engines", () => {
 it("validates all sample profiles", () => { sampleProfiles.forEach((p) => expect(validateProfile(p).valid).toBe(true)); });
 it("ranks critical weak topics above low-importance weak topics", () => { const priorities = calculateTopicPriorities(sampleProfiles[0].topics, "2026-10-24", "2026-10-12"); expect(priorities[0].score).toBeGreaterThan(0); expect(priorities.find((p) => p.id === "algorithms")?.rank).toBeLessThan(priorities.find((p) => p.id === "recursion")?.rank ?? 99); });
 it("keeps all sample schedules within capacity", () => { sampleProfiles.forEach((p) => { const priorities = calculateTopicPriorities(p.topics, p.assessmentDate, "2026-10-12"); const plan = generateWeeklyPlan(p, priorities, new Date("2026-10-12")); expect(plan.capacityValid).toBe(true); expect(plan.scheduledMinutes).toBeLessThanOrEqual(plan.availableMinutes); }); });
 it("returns a warning-free plan for zero availability", () => { const p = { ...sampleProfiles[2], weeklyAvailability: 0 }; const priorities = calculateTopicPriorities(p.topics, p.assessmentDate, "2026-10-12"); const plan = generateWeeklyPlan(p, priorities, new Date("2026-10-12")); expect(plan.scheduledMinutes).toBe(0); expect(plan.capacityValid).toBe(true); });
});
