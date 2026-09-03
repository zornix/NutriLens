# NutriLens

Student-centric nutrition gap assessment, daily routine builder, and micronutrient explorer.
React 19 + Vite + Tailwind 4, exported from Google AI Studio and restructured into small, documented elements.

The app is a single-page "phone in the browser": every screen is centered in a 393px column. There is no router.
`App.tsx` holds a `screen` value and renders exactly one screen for it.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # tsc --noEmit
npm run build
```

## File structure

```
src/
├── main.tsx                    React entry; mounts <App/>
├── index.css                   Tailwind import, Inter font, .no-scrollbar, .mascot-float
├── App.tsx                     All app state + screen switch (see "How it works")
├── types/index.ts              Domain types: AppScreen, Nutrient, RoutineItem, QuizQuestion, ...
├── data/mockData.ts            All content: quiz questions, nutrients, articles, default routine, demo profile
├── lib/routine.ts              nutrientToRoutineItem(), hasRoutineItemNamed()
└── components/
    ├── common/                 Shared building blocks used by 2+ screens
    │   ├── PageShell.tsx       393px phone column, light or dark
    │   ├── ScreenHeader.tsx    Eyebrow + title (+ right action) for tab screens
    │   ├── BackHeader.tsx      Back arrow + centered content + right slot for drill-in screens
    │   ├── Button.tsx          Full-width CTA: primary | secondary | inverse (dark flow)
    │   ├── FoodIcon.tsx        Data icon key ("fish", "eco", ...) -> lucide icon with light/dark colors
    │   ├── RoutineItemRow.tsx  Checkbox row for one routine item
    │   ├── Toast.tsx           Bottom confirmation with optional Undo
    │   ├── BottomNav.tsx       Home / Discover / Routine / Profile tab bar
    │   ├── VitoMascot.tsx      Mascot image in four sizes
    │   └── DemoSwitcher.tsx    Dev-only top bar to jump to any screen
    ├── modals/
    │   ├── InfoModal.tsx       Dark bottom sheet for articles / explanations
    │   └── ConfirmDialog.tsx   "Are you sure?" dialog for destructive actions
    └── views/                  One folder per screen; <Name>View.tsx composes the folder's elements
        ├── splash/
        ├── how-it-works/
        ├── quiz/
        ├── results-flow/
        ├── results-list/
        ├── home/
        ├── nutrient-detail/
        ├── discover/
        ├── routine/
        └── profile/
```

## How it works

**State lives in `App.tsx`.** Five pieces: `screen`, `userProfile`, `routineItems`, `activeNutrientId`, `activeArticleId`.
Screens are pure functions of props. They receive data and callbacks, never import each other, and never touch app state directly.

**Navigation.** `screen: AppScreen` is the route. `App` builds a `Record<AppScreen, ReactNode>` and renders `screens[screen]`.
Tab screens (`home`, `discover`, `routine`, `profile`) also render `BottomNav`. Adding a screen means adding a union member in
`types/index.ts`, a folder under `views/`, and one entry in the record. TypeScript fails until all three exist.

**Routine list.** Every add goes through `App.addRoutineItem`, which drops duplicates by name (case-insensitive).
Nutrient "Add to routine" buttons on every screen build their item with `lib/routine.nutrientToRoutineItem`, so the id,
category and detail line are defined once. Screens keep a local `lastChange` so `Toast` can offer a single-level Undo.

**Assessment.** `QuizView` collects `QuizAnswers` (question id -> option id or ids). On completion `App` stores them on the
profile and opens the results flow. The "which nutrients are flagged" logic is not computed from answers yet:
`FLAGGED_NUTRIENTS` in `mockData.ts` is the static list every results screen iterates. Replace that constant with a
function of `userProfile.answers` when the rule engine ships.

**Content.** All copy, portions, dosages and images live in `data/mockData.ts`. Screens read from it; nothing is hardcoded
per nutrient in the views. Counts like "3 nutrients worth a closer look" are derived from `FLAGGED_NUTRIENTS.length`.

## Screens and their elements

Each screen folder has a `<Name>View.tsx` that owns the screen's local state and composes its elements top to bottom.
Elements are stateless unless noted.

### Splash (`views/splash/`)
| Element | What it is |
|---|---|
| `SplashView` | Mascot hero with "Meet Vito" tag, headline copy, "Take the quiz" / "Continue as guest" buttons, "How this works" link. Single file. |

### How It Works (`views/how-it-works/`)
| Element | What it is |
|---|---|
| `HowThisWorksView` | Methodology page: hero, medical disclaimer, one `RuleCard` per rule, portions note, Student Health note, privacy line, CTA. |
| `RuleCard` | White card explaining one inference rule (icon tile, title, nutrient tag, body). |
| `rules.ts` | `INFERENCE_RULES` content array. Add a row when a new nutrient rule ships. |

### Quiz (`views/quiz/`)
| Element | What it is |
|---|---|
| `QuizView` | Owns `step` and `answers`. Renders one question from `QUIZ_QUESTIONS`, picks the choice component by `question.type`, sticky footer CTA. Accepts `initialAnswers` so retaking shows previous picks. |
| `QuizProgress` | Sticky header: back arrow + one pill per question (built on `BackHeader`). |
| `SingleChoiceList` | Vertical radio list with label, detail and round check. |
| `MultiChoiceGrid` | Two-column checkbox grid with `FoodIcon`s, optional "I'm not sure" row (stores `NOT_SURE`), optional insight callout. |

### Results Flow (`views/results-flow/`) — dark, story-style
| Element | What it is |
|---|---|
| `ResultsFlowView` | State machine `overview -> (why -> how-to-get) per nutrient -> finish`. Owns nutrient index, toast and undo. |
| `FlowPage` | `motion` wrapper giving each page a 240ms slide. Keyed by page + nutrient so pages remount (local accordions reset). |
| `OverviewPage` | "Here's what we found" hub: one card per flagged nutrient, Next. |
| `WhyPage` | Why the nutrient was flagged: big symbol, headline, reason, quoted quiz answer, one-liner, Learn more link. |
| `HowToGetPage` | Food rows from `nutrient.whereToFindIt` with "+ Add" / "Added", supplement accordion (local state), Next / Finish. |
| `FinishPage` | "You're set." with the first four routine items and Remove links. |

### Results List (`views/results-list/`) — light summary
| Element | What it is |
|---|---|
| `ResultsListView` | Brand header, headline, mascot summary card, one `NutrientResultCard` per flagged nutrient, "Add all" CTA, Go home, footer, Toast. |
| `NutrientResultCard` | Symbol tile, name + status tag, reason line, first three food sources as chips, Add / Added. Card opens detail; chip row stops propagation. |

### Home (`views/home/`)
| Element | What it is |
|---|---|
| `HomeView` | Greeting header with avatar (`ScreenHeader`), mascot hero, gap banner, then the three elements below and a "Check my nutrition" CTA. |
| `NutrientCarousel` | Horizontal scroll of image cards, one per nutrient. |
| `TodayRoutineCard` | "n of m completed" badge + checklist of `RoutineItemRow`s. |
| `LearnMoreGrid` | Two-column grid of compact article tiles. |

### Nutrient Detail (`views/nutrient-detail/`)
| Element | What it is |
|---|---|
| `NutrientDetailView` | `BackHeader` with favorite heart; Tier 1: flag banner, key benefits, image, what it does, `FoodSourcesGrid`; then `ClinicalDetails`, `AddToRoutineBar`, Toast with real undo. |
| `FoodSourcesGrid` | Two-column chips: `FoodIcon`, name, real-world portion. |
| `ClinicalDetails` | Collapsed "Learn more: Dosages & sources" section (local state). Contains dosage/upper-limit card, where-to-buy note, `TestimonialCard`, citations accordion. |
| `TestimonialCard` | Dark quote card with avatar, author, role. |
| `AddToRoutineBar` | Sticky bottom CTA; passive "In your routine" state once added. |

### Discover (`views/discover/`)
| Element | What it is |
|---|---|
| `DiscoverView` | `ScreenHeader`, search input (filters articles by title or tag), `NutrientGuideGrid`, article list. |
| `NutrientGuideGrid` | Three-column symbol tiles linking to each nutrient. |
| `ArticleCard` | List row: type tag, read time, title, two-line summary. |

### Routine (`views/routine/`)
| Element | What it is |
|---|---|
| `RoutineView` | `ScreenHeader` with "+" button, `ProgressCard`, toggled `AddItemForm`, checklist of `RoutineItemRow` + delete, reset link guarded by `ConfirmDialog`, Toast with undo-remove. |
| `ProgressCard` | Count, percentage, progress bar, celebration line at 100%. |
| `AddItemForm` | Name / portion / timing inputs (local state); builds a `RoutineItem` and hands it up. |

### Profile (`views/profile/`)
| Element | What it is |
|---|---|
| `ProfileView` | User card, mascot status card, quick actions (retake quiz, privacy), disclaimer footer. Single file, read-only. |

## Shared elements (`components/common`, `components/modals`)

| Element | Use it when | Key props |
|---|---|---|
| `PageShell` | Starting any screen | `className` (padding, `pb-24` under BottomNav), `dark` |
| `ScreenHeader` | Tab screen title | `eyebrow`, `title`, `right` |
| `BackHeader` | Drill-in screen title / progress | `onBack`, children (center), `right`, `dark`, `className` |
| `Button` | Any full-width CTA | `variant`: `primary` (indigo), `secondary` (white outline), `inverse` (white on navy); native button props |
| `FoodIcon` | Rendering a food/habit from data | `name` (icon key from `mockData`), `dark`, `className` for size |
| `RoutineItemRow` | Showing a checkable routine item | `item`, `onToggle`, `showTiming` |
| `Toast` | Confirming an action | `message` (null hides), `onUndo`, `inverse` |
| `InfoModal` | Reading an article / explanation | `title`, `description`, `keyPoints`, `actionText`, `onClose`, `onAction` |
| `ConfirmDialog` | Guarding a destructive action | `title`, `body`, `confirmText`, `cancelText`, `onConfirm`, `onCancel` |
| `BottomNav` | Tab screens only (rendered by App) | `currentScreen`, `onNavigate` |
| `VitoMascot` | Mascot anywhere | `size`: `sm` `md` `lg` `hero`, `animate` |
| `DemoSwitcher` | Development only | `current`, `onSelect` — remove from `App.tsx` for production |

## Data model (`types/index.ts`)

- **`Nutrient`** — everything shown about one nutrient: `symbol`, `name`, `tagline`, `whyHeading` / `whyReason` / `userAnswerQuote`
  (results flow), `functionSummary`, `whatItDoes`, `keyBenefits`, `whereToFindIt` (`FoodSource[]`, drives every food list),
  `howMuchYouNeed`, `supplement`, `testimonial`, `imageUrl`, `isFlaggedLow`, `routineDefault` (detail line when added as a supplement).
- **`FoodSource`** — `name`, `amount` (real-world portion), `icon` (key into `FoodIcon`).
- **`RoutineItem`** — `id`, `name`, `detail`, `category` (`habit` | `food` | `supplement`), `timing?`, `completed`, `nutrientId?`.
- **`QuizQuestion` / `QuizOption` / `QuizAnswers`** — question content and the answers map.
- **`EducationalArticle`** — article content for Home, Discover and `InfoModal`.
- **`UserProfile`** — demo profile plus saved `answers`.
- **`AppScreen`** — the union of screen ids; the app's only routing type.

## How to extend

**Add a nutrient.** Add one entry to `NUTRIENTS_DATA` in `data/mockData.ts` (all fields are required by the type).
If `isFlaggedLow` is true it appears in both results screens, the Home gap banner count, and "Add all". Add a `RuleCard`
row to `views/how-it-works/rules.ts` if it has an inference rule.

**Add a food icon.** Add a row to `ICONS` in `components/common/FoodIcon.tsx`, then use the key in `mockData` `icon` fields.

**Add a quiz question.** Append to `QUIZ_QUESTIONS`. `type: 'single'` renders `SingleChoiceList`; `'multi'` renders `MultiChoiceGrid`.
Progress pills and step counts derive from the array length.

**Add a screen.** Add the id to `AppScreen`, create `views/<name>/<Name>View.tsx` starting with `PageShell`, add it to the
`screens` record in `App.tsx`, and (optionally) to `DemoSwitcher` and `TAB_SCREENS`.

**Compute results from answers.** Replace the static `FLAGGED_NUTRIENTS` with a function over `userProfile.answers`
and pass the result down from `App`. Nothing else needs to change.

## Notes from the restructuring

- The results flow used to carry its own copy of the nutrient data; it now reads `NUTRIENTS_DATA`. A few lines of copy
  changed to the canonical version (e.g. Vitamin C's reason, "15 min midday").
- The summary list's three hardcoded cards are now one `NutrientResultCard` mapped over data; its chips show the first three
  `whereToFindIt` entries instead of hand-picked names.
- `NutrientModal` became `InfoModal` and its action button now honors `actionText`. The unused "How NutriLens Works" modal
  state in `App.tsx` was removed (the link navigates to the How It Works screen).
- Nutrient Detail's Undo now actually removes the item; the Add button is inert once the item is in the routine.
- All screen CTAs share `Button` (48px, `rounded-xl`), so a few buttons changed height or radius by a couple of pixels.
- `ProfileView` no longer receives an unused `onUpdateName` prop.
- `Toast` has no auto-dismiss (marked `ponytail:` in the file). Add a timer when it becomes a problem.
