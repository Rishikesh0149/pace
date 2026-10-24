import type { DayName, Profile, Topic } from "../types/planner";
const topicNames = ["Programming fundamentals", "Variables and data types", "Conditionals and loops", "Functions", "Arrays and strings", "Data structures", "Algorithms and complexity", "Object-oriented programming", "Recursion", "Debugging and testing"];
const ids = ["fundamentals", "variables", "conditionals", "functions", "arrays", "data-structures", "algorithms", "oop", "recursion", "debugging"];
const makeTopics = (mastery: number[], importance: number[]): Topic[] => topicNames.map((name, i) => ({ id: ids[i], name, mastery: mastery[i], importance: importance[i], targetMastery: Math.min(95, mastery[i] + 20), prerequisites: i > 0 ? [ids[Math.max(0, i - 1)]] : [] }));
const profile = (id: string, name: string, availability: number, days: DayName[], mastery: number[], importance: number[]): Profile => ({ id, name, assessmentDate: "2026-10-24", weeklyAvailability: availability, preferredDays: days, topics: makeTopics(mastery, importance), practiceHistory: [] });
export const sampleProfiles: Profile[] = [
 profile("maya", "Maya", 6, ["Monday", "Wednesday", "Friday", "Saturday"], [55,65,45,35,25,20,15,30,10,35], [5,3,5,5,5,4,5,3,2,4]),
 profile("arjun", "Arjun", 10, ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], [90,90,80,75,60,45,40,65,35,55], [2,2,3,4,5,5,5,4,4,4]),
 profile("sara", "Sara", 4, ["Tuesday", "Thursday", "Saturday"], [95,95,90,85,80,70,60,85,55,65], [2,2,3,3,4,5,5,3,4,5])
];
export function cloneProfile(profile: Profile): Profile { return JSON.parse(JSON.stringify(profile)) as Profile; }
