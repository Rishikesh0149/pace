export type ActivityType = "Learn" | "Practice" | "Review" | "Mock assessment";
export type SessionStatus = "Planned" | "In progress" | "Completed" | "Skipped";
export type DayName = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export interface Topic { id: string; name: string; mastery: number; importance: number; confidence?: number; targetMastery?: number; prerequisites?: string[]; }
export interface TimeWindow { start: string; end: string; }
export interface Profile { id: string; name: string; assessmentDate: string; weeklyAvailability: number; preferredDays: DayName[]; unavailableDays?: DayName[]; preferredWindows?: Partial<Record<DayName, TimeWindow[]>>; topics: Topic[]; practiceHistory?: PracticeRecord[]; progressHistory?: ProgressEvent[]; }
export interface PracticeRecord { topicId: string; misses: number; attempts: number; }
export interface PrioritizedTopic extends Topic { score: number; rank: number; masteryGap: number; importanceContribution: number; urgencyAdjustment: number; prerequisiteAdjustment: number; errorAdjustment: number; estimatedLearningEffort: number; recommendedFocus: string; explanation: string; }
export interface StudySession { id: string; profileId: string; date: string; day: DayName; startTime?: string; duration: number; topicId: string; topicName: string; activityType: ActivityType; task: string; objective: string; status: SessionStatus; priority: number; actualMinutes?: number; difficulty?: number; note?: string; }
export interface WeeklyPlan { weekStart: string; weekEnd: string; sessions: StudySession[]; availableMinutes: number; scheduledMinutes: number; remainingMinutes: number; capacityValid: boolean; warnings: string[]; }
export interface ValidationResult { availableMinutes: number; scheduledMinutes: number; remainingMinutes: number; capacityValid: boolean; warnings: string[]; sessionCount: number; }
export interface ProgressEvent { id: string; date: string; topicId: string; fromMastery: number; toMastery: number; sessionId?: string; note?: string; }
export interface Preferences { demoDate?: string; activeProfileId: string; }
export interface AppState { profiles: Profile[]; plans: Record<string, WeeklyPlan[]>; preferences: Preferences; }
