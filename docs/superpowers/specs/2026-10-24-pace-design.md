# Pace design specification

## Intent

Pace is a hackathon-ready, local-first personalised study planner for programming assessments. It helps a student understand what to study next, why it matters, and how to fit it into the week they actually have. The prototype must be credible in a live demo: the schedule is concrete, explainable, editable, persisted in the browser, and never exceeds stated capacity.

## Goals

- Let a student select one of three realistic sample profiles or create/edit a profile.
- Rank topics using mastery gap, assessment importance, deadline urgency, prerequisite structure, effort, and practice misses.
- Generate a practical weekly plan with learn, practice, review, and mock-assessment sessions.
- Preserve completed work and progress when plans regenerate.
- Make capacity validation visible and independently calculated from actual sessions.
- Provide overview, weekly plan, topics, progress, onboarding/editing, and settings workflows.
- Keep the interface understated, editorial, responsive, keyboard-accessible, and easy to demo.

## Non-goals and anti-goals

- No backend, authentication, remote AI integration, or claims of model-generated output.
- No fabricated history; sample history is labelled and user history is recorded only through actions.
- No overfilled calendar, overlapping sessions, decorative charts, or inactive controls.
- No dependency on a live API or network connection after the app is installed.

## Constraints

- Empty repository; create a Next.js App Router TypeScript app with Tailwind and Vitest.
- Use localStorage safely after client hydration.
- Assessment date defaults to 24 October 2026, but runtime countdown uses the actual date. A clearly labelled demo-date override lets the three profiles be demonstrated with a valid pre-deadline date.
- All schedule calculations use integer minutes and enforce `scheduledMinutes <= availableMinutes`.
- Current date may be at or after the assessment date, so the UI must be honest about the deadline-passed state and must not generate sessions after it.

## Approaches considered

1. Full local-first product (chosen): one shared client application with typed domain logic, deterministic engines, localStorage persistence, and testable screens. Best fit for the live demo and correctness requirements.
2. UI-first mock: build the dashboard and add logic later. Faster visual output but risks a superficial workflow and weak availability guarantees.
3. Backend-backed planner: add a database and API immediately. Unnecessary for the prototype, increases setup and failure surface, and conflicts with the brief's no-login/local-first direction.

The full local-first product is chosen because the differentiator is transparent planning behaviour, not a backend. UI and domain logic will remain separate so an API can be added later without changing the planner contract.

## Product structure

### Shell

Desktop layout uses a narrow left navigation rail and a wide main column on a warm off-white background. Navigation links are Overview, Weekly plan, My topics, Progress, and Settings. The bottom of the rail shows the active profile and assessment countdown. On small screens the rail becomes a compact top navigation.

### Overview

The page leads with “Your next assessment”, the date and an honest countdown/passed state. It then shows four derived capacity metrics, a restrained capacity bar, this week's chronological session list, ranked topic priorities with explanations, three upcoming incomplete sessions, progress/confidence, and a visible plan-validation strip.

### Weekly plan

Previous/next week navigation, day-grouped sessions, capacity summary, filters by topic/priority/activity, completion controls, session detail dialog, regenerate action, and print-friendly styling. Week capacity is recalculated independently.

### Topics and progress

Topics show mastery, importance, priority and editable values. Progress shows weighted mastery, planned/completed/skipped work, study time, recent activity, and topic-level mastery bars. Updates regenerate only future work and preserve completed history.

### Onboarding/settings

A validated profile editor supports name, date, availability, days, time windows, commitments, topic CRUD, mastery, importance, confidence, and target mastery. Settings includes restore sample profiles, reset demo data, date override, and the browser-storage privacy note.

## Domain model and engines

- `types/planner.ts` defines Profile, Topic, PracticeRecord, StudySession, PriorityResult, WeeklyPlan, ValidationResult, and progress history types.
- `lib/prioritisation.ts` implements the documented baseline: `100 * masteryGap * importanceFactor`, then bounded urgency, prerequisite, and repeated-error adjustments, clamped to 0–100. Stable tie-breaks use score, importance, mastery, then topic name.
- `lib/scheduling.ts` converts priorities into minute allocations with a 90% capacity target, a 15–20% review/mixed-practice reserve when capacity allows, preferred-day filtering, unavailable-day/time-window checks, deadline checks, overlap detection, and warnings for work that cannot fit.
- `lib/task-library.ts` provides local, topic-aware task templates by activity type; it never implies an external model was used.
- `lib/storage.ts` versions and hydrates localStorage data, preserving profiles, sessions, progress, preferences, and the demo-date override.
- `lib/date-utils.ts` owns week boundaries and deadline calculations.

Regeneration keeps completed sessions by id, recalculates priorities from current mastery, and schedules only the remaining feasible minutes. A change summary compares prior and current priority/mastery state.

## Visual language

Warm off-white `#F7F6F2`, near-black text `#242620`, forest green `#466B50`, ochre `#C49A50`, warm grey borders `#E3E1D9`, and muted secondary text `#77776F`. Use Inter/Geist for UI text and a restrained serif for a small number of prominent headings. Prefer open aligned sections and thin dividers over a grid of floating cards. Use Lucide icons, visible focus styles, semantic controls, reduced-motion support, and red only for validation errors.

## Verification plan

Vitest tests cover priority scoring/explanations, allocation and capacity invariants, zero/low capacity, high/low mastery, preferred/unavailable days, deadlines, time-window overlaps, mastery updates, completed-session preservation, and all three sample profiles under a pre-deadline demo date. The UI exposes the same computed validation values and a development-only sample profile validation table.

## Builder decisions

- Use one client-side app shell with route-like view state for a fast, cohesive prototype while keeping URL navigation available through Next.js pages where useful.
- Use native HTML controls and lightweight custom primitives instead of installing a full shadcn component set unless a dialog or form control materially benefits from it.
- Use CSS bars and compact activity summaries rather than Recharts; charts do not materially improve this planner's key decisions.
- If package installation is unavailable, prefer existing dependencies or small local utilities over blocking the product.

## Remaining implementation work

Create the app scaffold, implement tests first for the domain engines, implement the engines and sample profiles, build the shell and user workflows, add persistence and regeneration, then run lint/typecheck/tests/build and browser QA. Any limitation discovered during verification must be reported rather than hidden.
