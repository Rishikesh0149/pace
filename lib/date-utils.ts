import { addDays, differenceInCalendarDays, endOfWeek, format, isAfter, isBefore, parseISO, startOfWeek } from "date-fns";
export const DEFAULT_ASSESSMENT_DATE = "2026-10-24";
export const DEMO_DATE = "2026-10-12";
export function toDate(value: string | Date) { return typeof value === "string" ? parseISO(value) : value; }
export function isoDate(value: Date) { return format(value, "yyyy-MM-dd"); }
export function getWeekRange(value: string | Date) { const d = toDate(value); return { start: startOfWeek(d, { weekStartsOn: 1 }), end: endOfWeek(d, { weekStartsOn: 1 }) }; }
export function daysUntilAssessment(assessmentDate: string, now = new Date()) { return differenceInCalendarDays(toDate(assessmentDate), now); }
export function isDeadlinePassed(assessmentDate: string, now = new Date()) { return isBefore(toDate(assessmentDate), now) || differenceInCalendarDays(toDate(assessmentDate), now) === 0; }
export function dayName(date: Date) { return format(date, "EEEE") as import("../types/planner").DayName; }
export function dateInWeek(start: Date, offset: number) { return addDays(start, offset); }
export { addDays, format, isAfter, parseISO };
