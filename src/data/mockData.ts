import { QuizQuestion, Nutrient, RoutineItem, EducationalArticle, UserProfile } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Chino',
  email: 'chino.student@aggies.edu',
  campusYear: 'Junior · 3rd Year',
  dietPreference: 'Flexitarian / Dining Hall',
  answers: {
    q1: 'dining_hall',
    q2: ['eggs', 'fruit', 'nuts_seeds'],
    q3: 'under_30',
    q4: 'once_daily',
    q5: 'winter_fatigue'
  },
  hasCompletedQuiz: true
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    stepNumber: 1,
    totalSteps: 5,
    badge: "Let's get to know you",
    question: 'How do you usually eat?',
    helperText: 'Select the option that best matches your typical routine.',
    type: 'single',
    options: [
      { id: 'quick_packaged', label: 'Mostly quick and packaged', detail: 'Instant meals, snacks, grab & go' },
      { id: 'dining_hall', label: 'Dining hall most days', detail: 'Buffet style, residence hall meals' },
      { id: 'cook_few_times', label: 'I cook a few times a week', detail: 'Simple skillet or batch cooking' },
      { id: 'pretty_balanced', label: 'Pretty balanced', detail: 'Home prep with varied ingredients' }
    ]
  },
  {
    id: 'q2',
    stepNumber: 2,
    totalSteps: 5,
    badge: "Let's get to know you",
    question: 'Which of these do you eat regularly?',
    helperText: 'Pick as many as apply.',
    type: 'multi',
    hasUnsureOption: true,
    insightCallout: {
      icon: 'lightbulb',
      text: "These are common sources of B12, iron and calcium, so we'll pay closer attention to those in your results."
    },
    options: [
      { id: 'dairy', label: 'Dairy or fortified alternatives', icon: 'water_drop' },
      { id: 'eggs', label: 'Eggs', icon: 'egg' },
      { id: 'fish', label: 'Fish', icon: 'fish' },
      { id: 'meat', label: 'Meat', icon: 'restaurant' },
      { id: 'beans', label: 'Beans / lentils', icon: 'grain' },
      { id: 'greens', label: 'Leafy greens', icon: 'eco' },
      { id: 'fruit', label: 'Fruit', icon: 'apple' },
      { id: 'nuts_seeds', label: 'Nuts / seeds', icon: 'spa' }
    ]
  },
  {
    id: 'q3',
    stepNumber: 3,
    totalSteps: 5,
    badge: 'Habits & Routine',
    question: 'How much time do you spend outside during daylight?',
    helperText: 'Sunlight on bare skin stimulates natural vitamin D synthesis.',
    type: 'single',
    options: [
      { id: 'under_30', label: 'Less than 30 minutes', detail: 'Mostly lectures, library, indoor study' },
      { id: '30_to_60', label: '30 to 60 minutes', detail: 'Walking between campus classes' },
      { id: '1_to_2_hours', label: '1 to 2 hours', detail: 'Active bike commuter or outdoor breaks' },
      { id: 'over_2_hours', label: '2+ hours daily', detail: 'Outdoor athletics, recreation, field labs' }
    ]
  },
  {
    id: 'q4',
    stepNumber: 4,
    totalSteps: 5,
    badge: 'Vitamins & Micro',
    question: 'How often do fruit and vegetables show up in your meals?',
    helperText: 'Fresh produce supplies key water-soluble vitamins like Vitamin C and Folate.',
    type: 'single',
    options: [
      { id: 'once_daily', label: 'About once a day (or less)', detail: 'Occasional banana or side salad' },
      { id: '2_to_3_servings', label: '2–3 servings a day', detail: 'Fruit snack and vegetable dinner' },
      { id: 'abundant', label: 'With almost every meal', detail: 'Vibrant bowls, smoothies, loaded veggies' }
    ]
  },
  {
    id: 'q5',
    stepNumber: 5,
    totalSteps: 5,
    badge: 'Energy & Focus',
    question: 'How are your daily energy and concentration levels?',
    helperText: 'Certain nutritional gaps heavily influence academic stamina.',
    type: 'single',
    options: [
      { id: 'winter_fatigue', label: 'Tired easily or winter brain fog', detail: 'Tough to stay awake through 2pm lectures' },
      { id: 'afternoon_crash', label: 'Reliable 3pm energy slump', detail: 'Relying heavily on matcha or energy drinks' },
      { id: 'steady', label: 'Generally alert and steady', detail: 'Good sleep and even energy' }
    ]
  }
];

export const NUTRIENTS_DATA: Record<string, Nutrient> = {
  'vitamin-d': {
    id: 'vitamin-d',
    routineDefault: '1000 IU · morning',
    symbol: 'D',
    name: 'Vitamin D',
    tagline: 'Bone & immune',
    categoryTag: 'May be low',
    whyHeading: "You don't get outside much during the day.",
    whyReason: 'Sunlight is the main way people get vitamin D. With under 30 minutes outside most days, it may be low.',
    userAnswerQuote: 'Your answer: "Less than 30 minutes outside"',
    functionSummary: 'It helps you absorb calcium and supports your immune system.',
    detailedBio:
      'Vitamin D acts as a hormone in the body, synthesized in skin tissue via UV sunlight exposure. It supports bone density, mood stability, and robust seasonal immune defenses.',
    keyBenefits: ['Bone strength', 'Immune function', 'Mood and energy'],
    whatItDoes:
      'Vitamin D helps you absorb calcium and phosphorus to build strong bones while supporting seasonal immune defenses.',
    whereToFindIt: [
      { name: 'Salmon', amount: '1 fillet ≈ a full day', icon: 'fish' },
      { name: 'Eggs', amount: '2 eggs ≈ 15%', icon: 'egg' },
      { name: 'Milk', amount: '1 cup ≈ 20%', icon: 'water_drop' },
      { name: 'Sunlight', amount: '15 min midday', icon: 'sun' }
    ],
    howMuchYouNeed: {
      target: '600 IU / day',
      targetLabel: 'Adults 19-30',
      upperLimit: '4,000 IU'
    },
    supplement: {
      title: 'Supplement option',
      dosage: 'Vitamin D3, 600–1,000 IU/day',
      note: 'Upper limit 4,000 IU. Look for cholecalciferol (D3) taken with a meal containing healthy fats.'
    },
    testimonial: {
      quote:
        'I thought I was just tired from studying, but my energy levels changed completely once I started paying attention to getting enough Vitamin D during the winter months.',
      author: 'Sarah T.',
      role: 'Student Athlete',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDXSK_gVurQO3k21qIXX-5V3xDH4d6N503_l-IW0RojcMnTon2nNFl3yc1Hs79S-tJA0fENufuVrn3anligpCrB5kklooHSg--mxjU5HAng0-Usb9nZsHEgXyx6pxrldWuw4Gm4uHiwQZ_2lU8U1QIAzjxAgpvQSDKcGM17vY5thLDkEParakwXkkP-assfHaBPW4fHIa9b_jYGAr-vtVQS6WA4eTm0z2K1OU0xS6qr79XQOCFLVnLhHQ'
    },
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrck77RwXX8hfjgJx5lA5p1gl73qGuqx127d2Z9uh5zAb__erVDw-vLuTLFY18YJjOybHCG9NWKFHtzJiYQYGirav11ycMf9ApeV2rGdlKFYYiat5pC17zDfk3MMXtmoxZvHbdup9tnUuYtHp1jCHRBMtfxr8S1-YGcwrMg1gxPuGPtd180k8tQOsDra9PAMXYJWyNMvhCdk9_n6ay3IRLrs_IMeW3MjNbGNvsL_ESbjzQBY7f8iYppA',
    isFlaggedLow: true
  },
  'vitamin-b12': {
    id: 'vitamin-b12',
    routineDefault: '500 mcg · sublingual',
    symbol: 'B12',
    name: 'Vitamin B12',
    tagline: 'Energy support',
    categoryTag: 'May be low',
    whyHeading: 'You eat eggs, but not much dairy, meat or fish.',
    whyReason:
      "Those are where most B12 comes from. Plant foods don't make it naturally, so it's worth a closer look.",
    userAnswerQuote: 'Your answer: "Eggs, but not dairy, meat or fish"',
    functionSummary: 'It powers your nerve cells and helps produce essential red blood cells.',
    detailedBio:
      'Vitamin B12 maintains neurological health, cognitive energy, and red blood cell synthesis. It is bonded almost entirely to animal protein and fortified nutritional products.',
    keyBenefits: ['Red blood cell production', 'Nerve cell integrity', 'Brain focus & memory'],
    whatItDoes:
      'Vitamin B12 is essential for DNA synthesis and neuro-cognitive vigor. Low levels often manifest subtly as fatigue, pins-and-needles tingling, or general brain fog.',
    whereToFindIt: [
      { name: 'Eggs', amount: '2 eggs ≈ 25%', icon: 'egg' },
      { name: 'Fortified cereal', amount: '1 bowl ≈ 50%', icon: 'grain' },
      { name: 'Nutritional yeast', amount: '1 tbsp ≈ full day', icon: 'grain' },
      { name: 'Salmon', amount: '1 fillet ≈ full day', icon: 'fish' }
    ],
    howMuchYouNeed: {
      target: '2.4 mcg / day',
      targetLabel: 'Adults 19-30',
      upperLimit: 'No established limit'
    },
    supplement: {
      title: 'Supplement option',
      dosage: 'Vitamin B12 (cyanocobalamin), 250–500 mcg/day or 1,000 mcg 2x/week',
      note: 'Safe with no established upper limit. Check with a clinician before taking high-dose megavitamins.'
    },
    testimonial: {
      quote:
        'Switching to dining hall plant-based meals left me sluggish by midterms. Adding a simple B12 fortified yeast and eggs brought my sharp concentration right back.',
      author: 'Marcus K.',
      role: 'Bioengineering Sophomore',
      avatarUrl:
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
    },
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBXuVYNO9W_tM6hvKjl-sogZBSzJYqJqFN0BnCk-uFIhRWvQR5kU7BzAkiZvgStGlixeUWxZlo2zMrDTWrs45u5BpL0CARDhPYM5g02-fFdVXxdC4D5bg2Y_ThTqVGzivtcM1cst0xx2EqIQmIXYKsqQIrxXyy_M_MHlmVAXRcexTpys5fQxkXc9uZ4gAfNETpf4fzETCmeDbZluOtquk4ykPF5bjRaYKSnb2PZ6v_fchs4FaECkUHn0A',
    isFlaggedLow: true
  },
  'vitamin-c': {
    id: 'vitamin-c',
    routineDefault: '500 mg · with lunch',
    symbol: 'C',
    name: 'Vitamin C',
    tagline: 'Antioxidant',
    categoryTag: 'May be low',
    whyHeading: 'Fruit and vegetables show up about once a day.',
    whyReason:
      'Vitamin C runs low without regular daily servings of fresh fruit and vibrant veggies. The body cannot store excess water-soluble Vitamin C.',
    userAnswerQuote: "Your answer: 'About once a day (or less)'",
    functionSummary: 'It protects cells from stress and helps you absorb iron from food.',
    detailedBio:
      'Vitamin C is a water-soluble antioxidant that cannot be synthesized by human cells. Regular intake enhances collagen formation, non-heme iron absorption, and wound recovery.',
    keyBenefits: ['Immune defense against common campus bugs', 'Collagen synthesis', 'Iron absorption boost'],
    whatItDoes:
      'Vitamin C protects cells from oxidative stress and boosts daily immune defense while enhancing iron absorption.',
    whereToFindIt: [
      { name: 'Bell pepper', amount: '1/2 pepper ≈ full day', icon: 'eco' },
      { name: 'Orange', amount: '1 orange ≈ full day', icon: 'apple' },
      { name: 'Strawberries', amount: '1 cup ≈ full day', icon: 'apple' },
      { name: 'Broccoli', amount: '1 cup ≈ 90%', icon: 'eco' }
    ],
    howMuchYouNeed: {
      target: '75–90 mg / day',
      targetLabel: 'Adults 19-30',
      upperLimit: '2,000 mg'
    },
    supplement: {
      title: 'Supplement option',
      dosage: 'Vitamin C (ascorbic acid), 250–500 mg/day with meals',
      note: 'Upper limit 2,000 mg. Check with a clinician before going higher.'
    },
    testimonial: {
      quote:
        'Keeping oranges or kiwis in my dorm fridge keeps me from catching every cold floating through the library study rooms during finals week.',
      author: 'Elena R.',
      role: 'Pre-Med Student',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD9AbNOZGZPO2t4Z0vJGVj6dkfQzUVAwL_pwFzeM5PT3l_gf76I_u8H9ZJrJJ3ucM_VsaoD2LckXofjH7tfmCEliI7nJ3CJAL7wCobiCNaKNV_-uU6dN4OtoKfe3QKAnIxbhYiI2nl_sAqNd77YjgsfzBdVIplC8MRaVMtiTE06-_8_PAqSl7kf52BTjxJ1ZDOejcK4p7Lpr40mDGVkfEW92cchwR74DRlXu0USAl0mFR5mbFL3IrH-Rg',
    isFlaggedLow: true
  }
};

/** Nutrients the rule-based assessment flagged. Every results screen iterates this list. */
export const FLAGGED_NUTRIENTS: Nutrient[] = Object.values(NUTRIENTS_DATA).filter((n) => n.isFlaggedLow);

export const INITIAL_ROUTINE_ITEMS: RoutineItem[] = [
  {
    id: 'r-1',
    name: 'Vitamin D',
    detail: '1000 IU · morning',
    timing: 'Morning with breakfast',
    category: 'supplement',
    completed: false,
    nutrientId: 'vitamin-d'
  },
  {
    id: 'r-2',
    name: 'Vitamin C',
    detail: '500 mg · with lunch',
    timing: 'Lunchtime',
    category: 'supplement',
    completed: true,
    nutrientId: 'vitamin-c'
  },
  {
    id: 'r-3',
    name: '15 min outside',
    detail: 'Sunlight habit',
    timing: 'Midday quad walk',
    category: 'habit',
    completed: false,
    nutrientId: 'vitamin-d'
  }
];

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'b12-campus',
    title: 'Why B12 matters on a campus diet',
    type: 'Guide',
    timeRead: '3 min read',
    tags: ['Dining Hall', 'Brain Stamina', 'Plant-Forward'],
    summary: 'Navigating student meal plans while keeping your cognitive sharpness at 100%.',
    content: [
      'Dining hall diets frequently lean heavy on simple carbs and dairy alternatives that may lack bioavailable cyanocobalamin.',
      'Without adequate B12, red blood cells become abnormally large and sluggish at carrying oxygen to studying brains.',
      'Simple fix: sprinkle nutritional yeast over savory bowls, or grab 2 hard-boiled eggs at morning breakfast service.'
    ]
  },
  {
    id: 'cheap-produce-russell',
    title: 'Cheap produce near Russell Blvd',
    type: 'Local Map',
    timeRead: '2 min read',
    location: 'Davis / Campus Border',
    tags: ['Budget Friendly', 'Student Discounts', 'Grocery'],
    summary: 'Best local spots to load up on citrus, leafy greens, and fresh staples under $15.',
    content: [
      'The Wednesday campus Farmers Market offers $5 student veggie bags right at the quad.',
      'Grocery Outlet on Russell Blvd carries deeply discounted organic berries and bell peppers.',
      'The Student Pantry offers free seasonal citrus boxes every Tuesday afternoon.'
    ]
  },
  {
    id: 'sunlight-timing',
    title: 'Optimizing sunlight for winter academic stamina',
    type: 'Habit Hack',
    timeRead: '4 min read',
    tags: ['Circadian', 'Vitamin D', 'Focus'],
    summary: 'Why a 15-minute walk at 12:30pm is twice as effective as coffee for clearing 2pm fatigue.',
    content: [
      'UVB penetration peaks during solar noon between 11:30am and 1:30pm.',
      'Taking your library study break to walk across the quad provides both optical circadian reset and cutaneous vitamin D synthesis.'
    ]
  }
];
