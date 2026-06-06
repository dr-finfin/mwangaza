// ============================================================
// MWANGAZA CURRICULUM DATA — KICD CBE Aligned
// Grades 1–9 | All Core Subjects
// ============================================================

export const GRADES = [
  { id: 1, label: 'Grade 1', emoji: '🌱', color: 'from-emerald-400 to-emerald-600' },
  { id: 2, label: 'Grade 2', emoji: '🌿', color: 'from-teal-400 to-teal-600' },
  { id: 3, label: 'Grade 3', emoji: '🌳', color: 'from-cyan-400 to-cyan-600' },
  { id: 4, label: 'Grade 4', emoji: '⭐', color: 'from-blue-400 to-blue-600' },
  { id: 5, label: 'Grade 5', emoji: '🌟', color: 'from-indigo-400 to-indigo-600' },
  { id: 6, label: 'Grade 6', emoji: '🚀', color: 'from-violet-400 to-violet-600' },
  { id: 7, label: 'Grade 7', emoji: '💡', color: 'from-purple-400 to-purple-600' },
  { id: 8, label: 'Grade 8', emoji: '🔬', color: 'from-fuchsia-400 to-fuchsia-600' },
  { id: 9, label: 'Grade 9', emoji: '🏆', color: 'from-rose-400 to-rose-600' },
]

export const SUBJECTS = {
  1: [
    { id: 'math-1', name: 'Mathematics',              kiswahili: 'Hisabati',               emoji: '🔢', color: 'from-blue-500 to-blue-700',      strands: 3 },
    { id: 'eng-1',  name: 'English',                  kiswahili: 'Kiingereza',              emoji: '📖', color: 'from-emerald-500 to-emerald-700', strands: 4 },
    { id: 'kis-1',  name: 'Kiswahili',                kiswahili: 'Kiswahili',               emoji: '🗣️', color: 'from-orange-500 to-orange-700',   strands: 3 },
    { id: 'env-1',  name: 'Environmental Activities', kiswahili: 'Shughuli za Mazingira',   emoji: '🌍', color: 'from-green-500 to-green-700',     strands: 4 },
    { id: 'cre-1',  name: 'Creative Arts',            kiswahili: 'Sanaa za Ubunifu',        emoji: '🎨', color: 'from-pink-500 to-pink-700',       strands: 3 },
  ],
  4: [
    { id: 'math-4', name: 'Mathematics',              kiswahili: 'Hisabati',               emoji: '🔢', color: 'from-blue-500 to-blue-700',      strands: 5 },
    { id: 'sci-4',  name: 'Integrated Science',       kiswahili: 'Sayansi Jumuishi',        emoji: '🔬', color: 'from-cyan-500 to-cyan-700',      strands: 4 },
    { id: 'eng-4',  name: 'English',                  kiswahili: 'Kiingereza',              emoji: '📖', color: 'from-emerald-500 to-emerald-700', strands: 5 },
    { id: 'kis-4',  name: 'Kiswahili',                kiswahili: 'Kiswahili',               emoji: '🗣️', color: 'from-orange-500 to-orange-700',   strands: 4 },
    { id: 'sst-4',  name: 'Social Studies',           kiswahili: 'Masomo ya Jamii',         emoji: '🌍', color: 'from-green-500 to-green-700',     strands: 4 },
    { id: 'cre-4',  name: 'Creative Arts & Sports',   kiswahili: 'Sanaa na Michezo',        emoji: '🎨', color: 'from-pink-500 to-pink-700',       strands: 3 },
  ],
  5: [
    { id: 'math-5', name: 'Mathematics',              kiswahili: 'Hisabati',               emoji: '🔢', color: 'from-blue-500 to-blue-700',      strands: 5 },
    { id: 'sci-5',  name: 'Integrated Science',       kiswahili: 'Sayansi Jumuishi',        emoji: '🔬', color: 'from-cyan-500 to-cyan-700',      strands: 4 },
    { id: 'eng-5',  name: 'English',                  kiswahili: 'Kiingereza',              emoji: '📖', color: 'from-emerald-500 to-emerald-700', strands: 5 },
    { id: 'kis-5',  name: 'Kiswahili',                kiswahili: 'Kiswahili',               emoji: '🗣️', color: 'from-orange-500 to-orange-700',   strands: 4 },
    { id: 'sst-5',  name: 'Social Studies',           kiswahili: 'Masomo ya Jamii',         emoji: '🌍', color: 'from-green-500 to-green-700',     strands: 4 },
    { id: 'cre-5',  name: 'Creative Arts & Sports',   kiswahili: 'Sanaa na Michezo',        emoji: '🎨', color: 'from-pink-500 to-pink-700',       strands: 3 },
    { id: 'agr-5',  name: 'Agriculture',              kiswahili: 'Kilimo',                  emoji: '🌾', color: 'from-lime-500 to-lime-700',      strands: 3 },
  ],
  7: [
    { id: 'math-7', name: 'Mathematics',              kiswahili: 'Hisabati',                emoji: '🔢', color: 'from-blue-500 to-blue-700',      strands: 6 },
    { id: 'sci-7',  name: 'Integrated Science',       kiswahili: 'Sayansi Jumuishi',        emoji: '🔬', color: 'from-cyan-500 to-cyan-700',      strands: 9 },
    { id: 'eng-7',  name: 'English',                  kiswahili: 'Kiingereza',              emoji: '📖', color: 'from-emerald-500 to-emerald-700', strands: 5 },
    { id: 'kis-7',  name: 'Kiswahili',                kiswahili: 'Kiswahili',               emoji: '🗣️', color: 'from-orange-500 to-orange-700',   strands: 4 },
    { id: 'sst-7',  name: 'Social Studies',           kiswahili: 'Masomo ya Jamii',         emoji: '🌍', color: 'from-green-500 to-green-700',     strands: 5 },
    { id: 'pre-7',  name: 'Pre-Technical Studies',    kiswahili: 'Masomo ya Awali ya Ufundi', emoji: '⚙️', color: 'from-gray-500 to-gray-700',    strands: 4 },
    { id: 'bus-7',  name: 'Business Studies',         kiswahili: 'Masomo ya Biashara',      emoji: '💼', color: 'from-amber-500 to-amber-700',    strands: 3 },
  ],
}

// Helper: get subjects for any grade
export const getSubjectsForGrade = (grade) => {
  if (SUBJECTS[grade]) return SUBJECTS[grade]
  if (grade <= 3) return SUBJECTS[1]
  if (grade <= 6) return SUBJECTS[4]
  return SUBJECTS[7]
}

// ─────────────────────────────────────────
// CURRICULUM CONTENT
// ─────────────────────────────────────────
export const CURRICULUM = {

  // ── Grade 4 Mathematics ──────────────────────────────────────
  'math-4': {
    subjectName: 'Mathematics',
    strands: [
      {
        id: 'strand-numbers',
        name: 'Numbers',
        kiswahili: 'Nambari',
        subStrands: [
          {
            id: 'whole-numbers',
            name: 'Whole Numbers up to 999,999',
            kiswahili: 'Nambari Kamili hadi 999,999',
            duration: '12 min',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            outcomes: [
              'Count and write whole numbers up to 999,999',
              'Order numbers from smallest to largest',
              'Identify the place value of each digit',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What is the place value of 7 in the number 375,246?',
                options: ['Thousands', 'Ten Thousands', 'Hundreds', 'Millions'],
                correct: 0,
                explanation: 'In 375,246, the digit 7 is in the ten-thousands place, giving it a value of 70,000.',
              },
              {
                id: 'q2',
                question: 'Which number is the largest?',
                options: ['99,999', '100,000', '98,765', '99,876'],
                correct: 1,
                explanation: '100,000 is the largest because it has 6 digits while all others have 5 digits.',
              },
              {
                id: 'q3',
                question: 'How do you write "Four hundred and twenty thousand, five hundred and six" in numerals?',
                options: ['420,506', '402,560', '420,560', '400,206'],
                correct: 0,
                explanation: 'Four hundred twenty thousand = 420,000. Five hundred and six = 506. Combined: 420,506.',
              },
            ],
          },
          {
            id: 'fractions',
            name: 'Fractions',
            kiswahili: 'Sehemu',
            duration: '15 min',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            outcomes: [
              'Identify and compare proper and improper fractions',
              'Add and subtract fractions with like denominators',
              'Convert between mixed numbers and improper fractions',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What is 3/8 + 2/8?',
                options: ['5/8', '5/16', '6/8', '1/2'],
                correct: 0,
                explanation: 'When fractions have the same denominator, add the numerators: 3+2=5. Answer: 5/8.',
              },
              {
                id: 'q2',
                question: 'Which fraction is larger: 2/3 or 3/4?',
                options: ['2/3', '3/4', 'They are equal', 'Cannot compare'],
                correct: 1,
                explanation: 'Converting to same denominator: 2/3 = 8/12 and 3/4 = 9/12. So 3/4 is larger.',
              },
              {
                id: 'q3',
                question: 'Convert 2¾ to an improper fraction.',
                options: ['9/4', '11/4', '8/4', '7/4'],
                correct: 1,
                explanation: '2¾ = (2×4 + 3)/4 = (8+3)/4 = 11/4.',
              },
            ],
          },
        ],
      },
      {
        id: 'strand-measurement',
        name: 'Measurement',
        kiswahili: 'Upimaji',
        subStrands: [
          {
            id: 'length',
            name: 'Length',
            kiswahili: 'Urefu',
            duration: '10 min',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            outcomes: [
              'Measure length using standard units (mm, cm, m, km)',
              'Convert between units of length',
              'Solve problems involving length',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'How many centimetres are in 3 metres?',
                options: ['30 cm', '300 cm', '3000 cm', '3 cm'],
                correct: 1,
                explanation: '1 metre = 100 centimetres. So 3 metres = 3 × 100 = 300 centimetres.',
              },
              {
                id: 'q2',
                question: 'A road is 2.5 km long. How many metres is this?',
                options: ['25 m', '250 m', '2500 m', '25000 m'],
                correct: 2,
                explanation: '1 km = 1000 m. So 2.5 km = 2.5 × 1000 = 2500 metres.',
              },
              {
                id: 'q3',
                question: 'Which unit would you use to measure the length of a pencil?',
                options: ['Kilometre (km)', 'Metre (m)', 'Centimetre (cm)', 'Millimetre (mm)'],
                correct: 2,
                explanation: 'A pencil is typically 15–20 cm long, so centimetres (cm) is the most appropriate unit.',
              },
            ],
          },
        ],
      },
    ],
  },

  // ── Grade 4 Integrated Science ────────────────────────────────
  'sci-4': {
    subjectName: 'Integrated Science',
    strands: [
      {
        id: 'strand-living-things',
        name: 'Living Things and Their Environment',
        kiswahili: 'Viumbe na Mazingira Yao',
        subStrands: [
          {
            id: 'plants',
            name: 'Parts of a Plant and Their Functions',
            kiswahili: 'Sehemu za Mmea na Kazi Zake',
            duration: '14 min',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            outcomes: [
              'Identify the main parts of a plant',
              'Describe the function of each plant part',
              'Understand the process of photosynthesis',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What is the main function of roots in a plant?',
                options: [
                  'Making food for the plant',
                  'Absorbing water and minerals from the soil',
                  'Producing seeds',
                  'Carrying out photosynthesis',
                ],
                correct: 1,
                explanation: 'Roots absorb water and dissolved minerals from the soil, and also anchor the plant in the ground.',
              },
              {
                id: 'q2',
                question: 'Which part of the plant makes food through photosynthesis?',
                options: ['Root', 'Stem', 'Leaf', 'Flower'],
                correct: 2,
                explanation: 'Leaves contain chlorophyll and carry out photosynthesis, converting sunlight, water, and CO₂ into glucose.',
              },
              {
                id: 'q3',
                question: 'What gas does a plant absorb during photosynthesis?',
                options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
                correct: 2,
                explanation: 'Plants absorb Carbon Dioxide (CO₂) from the air during photosynthesis to make glucose and oxygen.',
              },
            ],
          },
        ],
      },
    ],
  },

  // ── Grade 5 Agriculture ───────────────────────────────────────
  'agr-5': {
    subjectName: 'Agriculture',
    strands: [
      {
        id: 'strand-agr5-environment',
        name: 'Conserving our Environment',
        kiswahili: 'Kuhifadhi Mazingira Yetu',
        subStrands: [
          {
            id: 'agr5-soil-conservation',
            name: 'Soil Conservation',
            kiswahili: 'Uhifadhi wa Udongo',
            duration: 'Watch',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/MZwSpTzhVvw',
            outcomes: [
              'Define soil conservation and explain why it matters',
              'Describe methods of soil recovery (restoration)',
              'Explain how organic manure improves soil quality',
              'Apply soil conservation practices on a Kenyan farm',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What is soil conservation?',
                options: [
                  'Removing all the soil from a farm',
                  'Protecting soil from damage and improving its quality',
                  'Burning crops on the soil',
                  'Selling soil to other farmers',
                ],
                correct: 1,
                explanation: 'Soil conservation means protecting the soil from damage and improving its quality so it can continue producing healthy crops.',
              },
              {
                id: 'q2',
                question: 'Which of the following is an example of organic manure?',
                options: ['Plastic bags', 'Cow dung', 'Petrol', 'Stones'],
                correct: 1,
                explanation: 'Cow dung is organic manure — it comes from a living source and adds nutrients to the soil naturally.',
              },
              {
                id: 'q3',
                question: 'Why is soil recovery (restoration) important?',
                options: [
                  'It makes soil dry and unproductive',
                  'It helps damaged soil become healthy again so crops can grow',
                  'It kills all plants in the soil',
                  'It is only useful in cities',
                ],
                correct: 1,
                explanation: 'Soil recovery restores damaged soil so it can support healthy plant growth again, which is essential for food production.',
              },
            ],
            notes: {
              sections: [
                {
                  heading: 'What is Soil Conservation?',
                  body: 'Soil conservation means protecting the soil from damage and making it healthier so it can keep producing good crops. Healthy soil = healthy food = healthy people.',
                },
                {
                  heading: 'How Soil Gets Damaged',
                  body: 'Soil can be damaged by:\n\n• Heavy rain washing it away (erosion)\n• Strong wind blowing it away\n• Over-farming without resting the land\n• Cutting down too many trees\n• Using too many chemicals',
                },
                {
                  heading: 'Soil Recovery (Restoration)',
                  body: 'Restoration means making damaged soil healthy again.\n\nMethods include:\n\n• Planting trees to hold the soil with roots\n• Resting the land for a season (fallowing)\n• Adding compost and manure to feed the soil\n• Building terraces on slopes to slow down water',
                },
                {
                  heading: 'Improving Soil with Organic Manure',
                  body: 'Organic manure comes from living sources — cow dung, chicken droppings, kitchen waste, and decomposed leaves. It adds nutrients naturally, holds water, and helps tiny organisms in the soil thrive.\n\nUnlike chemical fertilisers, it is cheap, safe, and improves the soil over time.',
                },
                {
                  heading: 'Why It Matters for Kenya',
                  body: 'Kenyan farmers depend on healthy soil for food and income. When soil is well cared for, families eat better, farms produce more, and the environment stays green for future generations.',
                },
              ],
              vocabulary: [
                { term: 'Conservation', definition: 'Protecting something so it lasts' },
                { term: 'Erosion',      definition: 'Soil being carried away by water or wind' },
                { term: 'Restoration',  definition: 'Making damaged soil healthy again' },
                { term: 'Organic',      definition: 'Coming from a living source like plants or animals' },
                { term: 'Manure',       definition: 'Animal waste used to fertilise soil' },
                { term: 'Compost',      definition: 'Rotted plant and food waste used as fertiliser' },
              ],
              recap: [
                'Soil conservation protects soil from damage',
                'Rain, wind, and overuse can damage soil',
                'Restoration uses trees, manure, and terraces to heal soil',
                'Organic manure is natural, cheap, and improves soil long-term',
                'Healthy soil = healthy farms = healthy families',
              ],
            },
          },
        ],
      },
    ],
  },

  // ── Grade 7 Integrated Science ────────────────────────────────
  'sci-7': {
    subjectName: 'Integrated Science',
    strands: [
      {
        id: 'strand-sci7-intro',
        name: 'Introduction to Integrated Science',
        kiswahili: 'Utangulizi wa Sayansi Jumuishi',
        subStrands: [
          {
            id: 'sci7-intro',
            name: 'Introduction to Integrated Science',
            kiswahili: 'Utangulizi wa Sayansi Jumuishi',
            duration: 'Watch',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/w_CYbvkHr5g',
            outcomes: [
              'Understand what Integrated Science means',
              'Identify the branches of science covered in Grade 7',
              'Appreciate the role of science in everyday Kenyan life',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What does "Integrated Science" mean?',
                options: [
                  'The study of only Biology',
                  'The combination of Biology, Chemistry and Physics',
                  'The study of Mathematics and Science',
                  'The study of the environment only',
                ],
                correct: 1,
                explanation: 'Integrated Science combines Biology, Chemistry and Physics into one subject, showing how they relate to each other.',
              },
              {
                id: 'q2',
                question: 'Which of the following is a branch of Integrated Science?',
                options: ['Geography', 'Physics', 'History', 'Mathematics'],
                correct: 1,
                explanation: 'Physics is one of the three branches covered in Integrated Science alongside Biology and Chemistry.',
              },
              {
                id: 'q3',
                question: 'Why is science important in everyday life?',
                options: [
                  'It is only useful in laboratories',
                  'It helps us understand and solve problems in the world around us',
                  'It is only important for doctors',
                  'It has no use outside school',
                ],
                correct: 1,
                explanation: 'Science helps us understand natural phenomena and solve real-world problems in health, agriculture, technology and more.',
              },
            ],
            notes: {
              sections: [
                {
                  heading: 'What Integrated Science Means',
                  body: 'Integrated Science is a subject that brings together three branches of science: Biology, Chemistry and Physics. Instead of studying each one separately, you learn how they connect and work together in the real world.',
                },
                {
                  heading: 'The Three Branches',
                  body: 'Biology is the study of living things — plants, animals, and the human body.\n\nChemistry is the study of substances — what they are made of and how they react.\n\nPhysics is the study of energy, motion, electricity, and forces.',
                },
                {
                  heading: 'Why Science Matters in Kenya',
                  body: 'Science helps us understand and solve real problems. Farmers use it to grow better crops. Doctors use it to treat diseases. Engineers use it to design roads, buildings, and solar panels in places like Turkana.',
                },
                {
                  heading: 'Careers in Science',
                  body: 'Studying Integrated Science can lead to many careers: doctor, nurse, agricultural officer, lab technician, engineer, environmental scientist, or science teacher. Every modern industry needs people who understand science.',
                },
              ],
              vocabulary: [
                { term: 'Integrated', definition: 'Joined together as one' },
                { term: 'Biology',    definition: 'The science of living things' },
                { term: 'Chemistry',  definition: 'The science of substances and how they react' },
                { term: 'Physics',    definition: 'The science of matter, energy, and forces' },
                { term: 'Branch',     definition: 'A division or part of a larger subject' },
              ],
              recap: [
                'Integrated Science combines Biology, Chemistry and Physics',
                'Biology = living things; Chemistry = substances; Physics = energy and forces',
                'Science solves real problems in health, farming, and technology',
                'Many Kenyan careers are built on science',
                'Understanding science helps you understand the world',
              ],
            },
          },
        ],
      },

      {
        id: 'strand-sci7-safety',
        name: 'Laboratory Safety',
        kiswahili: 'Usalama wa Maabara',
        subStrands: [
          {
            id: 'sci7-lab-safety',
            name: 'Laboratory Safety',
            kiswahili: 'Usalama wa Maabara',
            duration: 'Watch',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/t_wQO-CfNKY',
            outcomes: [
              'Identify safety rules in a science laboratory',
              'Recognise hazard symbols and what they mean',
              'Know the correct procedure in case of a laboratory accident',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What should you do before starting any experiment in the lab?',
                options: [
                  'Start immediately without reading instructions',
                  'Read and understand all safety instructions',
                  'Remove your safety goggles to see better',
                  'Eat or drink to stay energised',
                ],
                correct: 1,
                explanation: 'Always read and understand all safety instructions before beginning any experiment to prevent accidents.',
              },
              {
                id: 'q2',
                question: 'What does a skull and crossbones hazard symbol mean?',
                options: [
                  'The substance is safe to drink',
                  'The substance is flammable',
                  'The substance is toxic or poisonous',
                  'The substance is radioactive',
                ],
                correct: 2,
                explanation: 'The skull and crossbones symbol indicates that a substance is toxic or poisonous and must be handled with extreme care.',
              },
              {
                id: 'q3',
                question: 'What should you do if a chemical spills on your skin?',
                options: [
                  'Wipe it off with a cloth and continue working',
                  'Ignore it if it does not burn',
                  'Immediately rinse with large amounts of water and tell the teacher',
                  'Apply more chemicals to neutralise it yourself',
                ],
                correct: 2,
                explanation: 'Immediately rinse with large amounts of water to dilute the chemical and always inform your teacher of any accident.',
              },
            ],
            notes: {
              sections: [
                {
                  heading: 'Why Lab Safety Matters',
                  body: 'A science laboratory contains chemicals, glass equipment, sharp tools, and open flames. Without safety rules, simple mistakes can cause burns, cuts, poisoning, or fires.',
                },
                {
                  heading: 'Top Safety Rules',
                  body: 'Always wear safety goggles and a lab coat.\n\nRead all instructions before starting.\n\nNever eat, drink, or play in the lab.\n\nTie back long hair and avoid loose clothing.\n\nNever taste or smell chemicals directly.',
                },
                {
                  heading: 'Common Hazard Symbols',
                  body: 'Skull and crossbones = toxic / poisonous.\n\nFlame = flammable, catches fire easily.\n\nExclamation mark = irritant, may harm skin or eyes.\n\nCorrosive symbol = can burn skin or destroy materials.',
                },
                {
                  heading: 'What to Do in an Accident',
                  body: 'If a chemical spills on your skin, rinse with plenty of water and tell the teacher immediately.\n\nIf there is a fire, alert the teacher and stay calm.\n\nNever try to fix or clean a major accident on your own.',
                },
              ],
              vocabulary: [
                { term: 'Laboratory', definition: 'A room where scientific experiments are done' },
                { term: 'Hazard',     definition: 'Something that can cause harm' },
                { term: 'Toxic',      definition: 'Poisonous, harmful if swallowed or touched' },
                { term: 'Flammable',  definition: 'Catches fire easily' },
                { term: 'Corrosive',  definition: 'Can eat away skin or other materials' },
                { term: 'First Aid',  definition: 'Immediate help given after an accident' },
              ],
              recap: [
                'Always wear protective gear in the lab',
                'Read instructions before any experiment',
                'Learn what each hazard symbol means',
                'Never eat, drink, or play in the laboratory',
                'Tell the teacher immediately if anything goes wrong',
              ],
            },
          },
        ],
      },

      {
        id: 'strand-sci7-apparatus',
        name: 'Laboratory Apparatus and Equipment',
        kiswahili: 'Vifaa vya Maabara',
        subStrands: [
          {
            id: 'sci7-lab-apparatus',
            name: 'Laboratory Apparatus and Equipment',
            kiswahili: 'Vifaa vya Maabara',
            duration: 'Watch',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/GkD5NCTL5KQ',
            outcomes: [
              'Identify common laboratory apparatus and their uses',
              'Handle laboratory equipment correctly and safely',
              'Match each piece of apparatus to its correct function',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What is a beaker used for in the laboratory?',
                options: [
                  'Measuring exact volumes of liquid',
                  'Holding and heating liquids',
                  'Mixing dry chemicals only',
                  'Viewing specimens under magnification',
                ],
                correct: 1,
                explanation: 'A beaker is used for holding and heating liquids. It is not suitable for measuring exact volumes — a measuring cylinder is used for that.',
              },
              {
                id: 'q2',
                question: 'Which apparatus would you use to measure exactly 25ml of water?',
                options: ['Beaker', 'Test tube', 'Measuring cylinder', 'Conical flask'],
                correct: 2,
                explanation: 'A measuring cylinder is designed for accurate measurement of liquid volumes.',
              },
              {
                id: 'q3',
                question: 'What is the function of a Bunsen burner?',
                options: [
                  'To cool substances',
                  'To provide a controlled flame for heating',
                  'To measure temperature',
                  'To filter mixtures',
                ],
                correct: 1,
                explanation: 'A Bunsen burner provides a controlled gas flame used for heating substances during experiments.',
              },
            ],
            notes: {
              sections: [
                {
                  heading: 'What is Apparatus?',
                  body: 'Apparatus means the equipment and tools used in a science laboratory. Each tool has a specific job. Using the wrong tool can ruin your experiment or be dangerous.',
                },
                {
                  heading: 'Tools for Holding and Heating Liquids',
                  body: 'A beaker is a wide glass container used to hold and heat liquids. It is NOT used for accurate measurement.\n\nA test tube holds small amounts of liquid for heating or simple reactions.\n\nA conical flask has a narrow neck, useful for swirling without spilling.',
                },
                {
                  heading: 'Tools for Measuring',
                  body: 'A measuring cylinder gives accurate volumes of liquid in millilitres (ml).\n\nA thermometer measures temperature in degrees Celsius.\n\nA balance measures the mass of solids in grams.',
                },
                {
                  heading: 'Tools for Heating',
                  body: 'A Bunsen burner gives a controlled flame for heating substances.\n\nA tripod stand holds equipment above the flame.\n\nA wire gauze spreads the heat evenly under a beaker.',
                },
                {
                  heading: 'Handling Apparatus Safely',
                  body: 'Always hold glass equipment with two hands.\n\nNever put a hot beaker on a cold surface — it may crack.\n\nClean and return every tool after use.',
                },
              ],
              vocabulary: [
                { term: 'Apparatus',          definition: 'Equipment used in science experiments' },
                { term: 'Beaker',             definition: 'Wide glass container for heating or holding liquids' },
                { term: 'Measuring cylinder', definition: 'Tall narrow tube for measuring liquid volumes' },
                { term: 'Bunsen burner',      definition: 'A controlled gas flame used for heating' },
                { term: 'Tripod',             definition: 'Three-legged stand for holding equipment over a flame' },
                { term: 'Volume',             definition: 'The amount of space a liquid takes up' },
              ],
              recap: [
                'Every lab tool has a specific use',
                'Beakers hold and heat liquids but do not measure accurately',
                'Measuring cylinders give accurate volumes',
                'Bunsen burners give a controlled flame for heating',
                'Handle all glass apparatus with care to avoid breakage',
              ],
            },
          },
        ],
      },

      {
        id: 'strand-sci7-mixtures',
        name: 'Mixtures',
        kiswahili: 'Michanganyiko',
        subStrands: [
          {
            id: 'sci7-mixtures',
            name: 'Mixtures',
            kiswahili: 'Michanganyiko',
            duration: 'Watch',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/CtuF1cvyzQI',
            outcomes: [
              'Define a mixture and give examples from everyday life',
              'Distinguish between homogeneous and heterogeneous mixtures',
              'Describe methods used to separate mixtures',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'Which of the following is an example of a homogeneous mixture?',
                options: [
                  'Sand and water',
                  'Salt and water',
                  'Oil and water',
                  'Soil and gravel',
                ],
                correct: 1,
                explanation: 'Salt dissolved in water is a homogeneous mixture because it has a uniform composition throughout.',
              },
              {
                id: 'q2',
                question: 'Which method would you use to separate sand from water?',
                options: ['Distillation', 'Evaporation', 'Filtration', 'Magnetic separation'],
                correct: 2,
                explanation: 'Filtration is used to separate an insoluble solid like sand from a liquid like water using filter paper.',
              },
              {
                id: 'q3',
                question: 'What method is used to separate iron filings from sand?',
                options: ['Filtration', 'Evaporation', 'Distillation', 'Magnetic separation'],
                correct: 3,
                explanation: 'Iron filings are magnetic. A magnet can be used to attract and separate them from non-magnetic sand.',
              },
            ],
            notes: {
              sections: [
                {
                  heading: 'What is a Mixture?',
                  body: 'A mixture is formed when two or more substances are combined but do not react chemically. Each substance keeps its own properties. Examples from daily life: tea (water + tea leaves), soil, air.',
                },
                {
                  heading: 'Two Types of Mixtures',
                  body: 'Homogeneous mixture — looks the same throughout. Example: salt dissolved in water, sugar in tea.\n\nHeterogeneous mixture — you can see the different parts. Example: oil and water, soil and sand.',
                },
                {
                  heading: 'Methods of Separating Mixtures',
                  body: 'Filtration — separates a solid from a liquid using filter paper. Example: separating sand from water.\n\nEvaporation — heats a solution until the liquid disappears, leaving the solid behind. Example: getting salt from sea water.\n\nDistillation — boils a liquid then cools the vapour. Used to get pure water.\n\nMagnetic separation — uses a magnet to pick up magnetic materials. Example: iron filings from sand.',
                },
                {
                  heading: 'Why This Matters',
                  body: 'Separating mixtures is important everywhere: water purification, salt production at the coast, mining gold from rock, and even brewing chai at home.',
                },
              ],
              vocabulary: [
                { term: 'Mixture',       definition: 'Two or more substances combined without reacting' },
                { term: 'Homogeneous',   definition: 'Looks uniform throughout' },
                { term: 'Heterogeneous', definition: 'Parts can be seen as separate' },
                { term: 'Filtration',    definition: 'Separating solid from liquid using filter paper' },
                { term: 'Evaporation',   definition: 'Liquid turning into gas using heat' },
                { term: 'Distillation',  definition: 'Boiling then cooling a liquid to purify it' },
              ],
              recap: [
                'A mixture combines substances without a chemical change',
                'Homogeneous = uniform; Heterogeneous = visible parts',
                'Filtration separates solids from liquids',
                'Evaporation leaves the solid behind when liquid escapes',
                'Magnets can separate magnetic materials from non-magnetic ones',
              ],
            },
          },
        ],
      },

      {
        id: 'strand-sci7-acids',
        name: 'Acids, Bases and Indicators',
        kiswahili: 'Asidi, Besi na Viashiria',
        subStrands: [
          {
            id: 'sci7-acids-bases',
            name: 'Acids, Bases and Indicators',
            kiswahili: 'Asidi, Besi na Viashiria',
            duration: 'Watch',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/wb7N6TxCUkk',
            outcomes: [
              'Define acids and bases and give everyday examples',
              'Explain what an indicator is and how it works',
              'Use the pH scale to classify substances as acidic, neutral or basic',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What colour does litmus paper turn in an acidic solution?',
                options: ['Blue', 'Green', 'Red', 'Yellow'],
                correct: 2,
                explanation: 'Litmus paper turns red in an acidic solution and blue in a basic solution.',
              },
              {
                id: 'q2',
                question: 'Which of the following is an example of an acid found at home?',
                options: ['Baking soda', 'Lemon juice', 'Soap', 'Bleach'],
                correct: 1,
                explanation: 'Lemon juice contains citric acid and is a common household acid. Baking soda and soap are bases.',
              },
              {
                id: 'q3',
                question: 'A substance with a pH of 7 is classified as?',
                options: ['Acidic', 'Basic', 'Neutral', 'Corrosive'],
                correct: 2,
                explanation: 'A pH of 7 is neutral. Below 7 is acidic and above 7 is basic. Pure water has a pH of 7.',
              },
            ],
            notes: {
              sections: [
                {
                  heading: 'What are Acids and Bases?',
                  body: 'Acids and bases are two types of substances with opposite properties.\n\nAcids taste sour. Examples: lemon juice, vinegar, sour milk.\n\nBases (also called alkalis) feel slippery and taste bitter. Examples: soap, baking soda, toothpaste.',
                },
                {
                  heading: 'What is an Indicator?',
                  body: 'An indicator is a substance that changes colour to tell us whether something is acidic, basic, or neutral. Litmus paper is the most common indicator used in schools.',
                },
                {
                  heading: 'How Litmus Paper Works',
                  body: 'Red litmus paper turns BLUE in a base.\n\nBlue litmus paper turns RED in an acid.\n\nIf it stays the same colour, the substance is neutral.',
                },
                {
                  heading: 'The pH Scale',
                  body: 'The pH scale runs from 0 to 14.\n\n0 to 6 = acidic (the lower, the stronger)\n7 = neutral (pure water)\n8 to 14 = basic (the higher, the stronger)\n\nKnowing pH helps farmers test soil, doctors check the body, and factories make safe products.',
                },
                {
                  heading: 'Plant Extracts as Indicators',
                  body: 'Some plants can also be used as natural indicators. Red cabbage juice, hibiscus petals, and turmeric all change colour when added to acids or bases. This is a fun and cheap way to do science experiments at home.',
                },
              ],
              vocabulary: [
                { term: 'Acid',      definition: 'Sour substance with pH below 7' },
                { term: 'Base',      definition: 'Bitter, slippery substance with pH above 7' },
                { term: 'Indicator', definition: 'Substance that changes colour to show acid or base' },
                { term: 'Litmus',    definition: 'Coloured paper used to test acids and bases' },
                { term: 'Neutral',   definition: 'Neither acid nor base — pH of 7' },
                { term: 'pH scale',  definition: 'A 0–14 scale that measures acidity' },
              ],
              recap: [
                'Acids taste sour; bases feel slippery',
                'Indicators change colour to identify acids and bases',
                'Blue litmus turns red in acid; red litmus turns blue in base',
                'pH 0–6 = acidic, 7 = neutral, 8–14 = basic',
                'Plants like red cabbage can be used as natural indicators',
              ],
            },
          },
        ],
      },

      {
        id: 'strand-sci7-reproduction',
        name: 'Human Reproductive System',
        kiswahili: 'Mfumo wa Uzazi wa Binadamu',
        subStrands: [
          {
            id: 'sci7-reproduction',
            name: 'Human Reproductive System',
            kiswahili: 'Mfumo wa Uzazi wa Binadamu',
            duration: 'Watch',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/Vzc5x5NagAo',
            outcomes: [
              'Identify the organs of the male and female reproductive systems',
              'Describe the function of each reproductive organ',
              'Explain the process of fertilisation in humans',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'Where does fertilisation take place in the female body?',
                options: ['Uterus', 'Ovary', 'Fallopian tube', 'Cervix'],
                correct: 2,
                explanation: 'Fertilisation — the joining of the egg and sperm — takes place in the fallopian tube.',
              },
              {
                id: 'q2',
                question: 'What is the function of the testes in the male reproductive system?',
                options: [
                  'To produce eggs',
                  'To produce sperm and testosterone',
                  'To carry urine out of the body',
                  'To store mature eggs',
                ],
                correct: 1,
                explanation: 'The testes produce sperm cells and the hormone testosterone which controls male characteristics.',
              },
              {
                id: 'q3',
                question: 'Where does a fertilised egg implant and develop into a baby?',
                options: ['Ovary', 'Fallopian tube', 'Uterus', 'Cervix'],
                correct: 2,
                explanation: 'After fertilisation the egg travels to the uterus where it implants and develops into a baby over nine months.',
              },
            ],
            notes: {
              sections: [
                {
                  heading: 'Why Reproduction Matters',
                  body: 'Reproduction is how new humans are made. It is the reason every family, community, and nation continues to exist. Understanding it helps us take care of our bodies and make responsible choices.',
                },
                {
                  heading: 'The Male Reproductive System',
                  body: 'The testes (korodani) produce sperm cells and the hormone testosterone.\n\nThe penis delivers sperm into the female body.\n\nSperm travels through tubes from the testes to be released.',
                },
                {
                  heading: 'The Female Reproductive System',
                  body: 'The ovaries (ovari) produce egg cells, one every month.\n\nThe fallopian tubes carry the egg towards the uterus and are where fertilisation happens.\n\nThe uterus (mfuko wa uzazi) is where a fertilised egg grows into a baby.\n\nThe vagina is the passage to the uterus and the birth canal.',
                },
                {
                  heading: 'Fertilisation and Pregnancy',
                  body: 'Fertilisation happens when a sperm cell joins with an egg cell in the fallopian tube. The fertilised egg then moves down to the uterus and attaches itself to the wall. Over nine months, it grows into a baby.',
                },
                {
                  heading: 'The Menstrual Cycle',
                  body: 'Every month a girl\'s body releases an egg. If no fertilisation happens, the uterus sheds its lining as blood through the vagina. This is called menstruation, and it usually lasts 3–7 days.',
                },
              ],
              vocabulary: [
                { term: 'Testes',         definition: 'Male organs that produce sperm (korodani)' },
                { term: 'Ovaries',        definition: 'Female organs that produce eggs (ovari)' },
                { term: 'Uterus',         definition: 'Where a baby grows (mfuko wa uzazi)' },
                { term: 'Fallopian tube', definition: 'Tube where fertilisation takes place' },
                { term: 'Fertilisation',  definition: 'The joining of sperm and egg' },
                { term: 'Menstruation',   definition: 'Monthly shedding of the uterus lining' },
              ],
              recap: [
                'Males produce sperm in the testes',
                'Females produce eggs in the ovaries',
                'Fertilisation happens in the fallopian tube',
                'A fertilised egg grows in the uterus for nine months',
                'Menstruation is the body\'s monthly cycle when no fertilisation occurs',
              ],
            },
          },
        ],
      },

      {
        id: 'strand-sci7-excretion',
        name: 'Human Excretory System',
        kiswahili: 'Mfumo wa Uondoaji Taka wa Binadamu',
        subStrands: [
          {
            id: 'sci7-excretion',
            name: 'Human Excretory System',
            kiswahili: 'Mfumo wa Uondoaji Taka wa Binadamu',
            duration: 'Watch',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/lSaajXH7zn4',
            outcomes: [
              'Define excretion and explain why it is important',
              'Identify the organs of the human excretory system',
              'Describe the role of the kidneys in filtering blood',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What is excretion?',
                options: [
                  'The process of taking in food',
                  'The removal of waste products produced by the body\'s chemical reactions',
                  'The process of breathing in oxygen',
                  'The digestion of food in the stomach',
                ],
                correct: 1,
                explanation: 'Excretion is the removal of metabolic waste products that would be harmful if they accumulated in the body.',
              },
              {
                id: 'q2',
                question: 'Which organ is the main excretory organ for filtering blood?',
                options: ['Liver', 'Lungs', 'Skin', 'Kidneys'],
                correct: 3,
                explanation: 'The kidneys are the main excretory organs. They filter waste products from the blood and produce urine.',
              },
              {
                id: 'q3',
                question: 'What waste product do the lungs excrete?',
                options: ['Urea', 'Carbon dioxide and water vapour', 'Bile', 'Sweat'],
                correct: 1,
                explanation: 'The lungs excrete carbon dioxide and water vapour as waste products of cellular respiration.',
              },
            ],
            notes: {
              sections: [
                {
                  heading: 'What is Excretion?',
                  body: 'Excretion is the removal of waste substances that the body produces from its own chemical reactions. Without excretion, these wastes would build up and poison the body.',
                },
                {
                  heading: 'The Main Excretory Organs',
                  body: 'Kidneys (figo) — filter waste from blood and produce urine.\n\nSkin (ngozi) — releases sweat which removes salt and water.\n\nLungs (mapafu) — breathe out carbon dioxide and water vapour.\n\nLiver (ini) — breaks down old red blood cells and other waste.',
                },
                {
                  heading: 'How the Kidneys Work',
                  body: 'Each person has two kidneys near the lower back. Blood flows through them, and they filter out waste and extra water. The waste becomes urine, which is stored in the bladder until it is released through the urethra.',
                },
                {
                  heading: 'The Skin as an Excretory Organ',
                  body: 'The skin contains sweat glands. When you are hot or active, these glands release sweat — a mixture of water, salts, and urea. This cools the body and removes some waste at the same time.',
                },
                {
                  heading: 'Staying Healthy',
                  body: 'Drink plenty of clean water every day.\n\nEat balanced meals with fruits and vegetables.\n\nDo not hold in urine for long periods.\n\nAvoid too much salt and alcohol, which strain the kidneys.',
                },
              ],
              vocabulary: [
                { term: 'Excretion', definition: 'Removing waste from the body' },
                { term: 'Kidneys',   definition: 'Organs that filter blood (figo)' },
                { term: 'Urine',     definition: 'Liquid waste produced by the kidneys' },
                { term: 'Sweat',     definition: 'Salty water released through the skin' },
                { term: 'Bladder',   definition: 'Organ that stores urine' },
                { term: 'Urea',      definition: 'Waste substance removed in urine and sweat' },
              ],
              recap: [
                'Excretion removes waste produced by the body',
                'The kidneys are the main filters of blood',
                'The skin removes waste through sweat',
                'The lungs remove carbon dioxide and water vapour',
                'Drink plenty of water to keep the excretory system healthy',
              ],
            },
          },
        ],
      },

      {
        id: 'strand-sci7-electrical',
        name: 'Electrical Energy',
        kiswahili: 'Nishati ya Umeme',
        subStrands: [
          {
            id: 'sci7-electrical',
            name: 'Electrical Energy',
            kiswahili: 'Nishati ya Umeme',
            duration: 'Watch',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/qhz8UUtR4rU',
            outcomes: [
              'Identify common sources of electricity in Kenya',
              'Set up simple series and parallel circuits',
              'Explain the difference between series and parallel circuits',
              'Apply safety rules when handling electricity',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'Which of the following is a renewable source of electricity?',
                options: ['Coal', 'Petrol generator', 'Solar power', 'Diesel'],
                correct: 2,
                explanation: 'Solar power is a renewable source because sunlight is naturally replenished every day.',
              },
              {
                id: 'q2',
                question: 'In a series circuit, what happens if one bulb burns out?',
                options: [
                  'All the other bulbs stay on',
                  'All the other bulbs go off',
                  'The bulbs become brighter',
                  'Nothing changes',
                ],
                correct: 1,
                explanation: 'In a series circuit, current flows through one path. If one bulb burns out, the circuit is broken and all bulbs go off.',
              },
              {
                id: 'q3',
                question: 'Which is a key safety rule when handling electricity?',
                options: [
                  'Touch wires with wet hands',
                  'Never insert objects into sockets',
                  'Overload one socket with many plugs',
                  'Use damaged electrical cables',
                ],
                correct: 1,
                explanation: 'Never insert objects into sockets — it can cause electric shock or fire. Always handle electricity with care.',
              },
            ],
            notes: {
              sections: [
                {
                  heading: 'What is Electrical Energy?',
                  body: 'Electrical energy is the energy carried by moving electric charges. It is the energy that powers your lights, phone, radio, and almost every modern device in your home and school.',
                },
                {
                  heading: 'Sources of Electricity in Kenya',
                  body: 'Hydroelectric power — generated from flowing water at dams like Seven Forks.\n\nSolar power — captured from the sun using solar panels.\n\nWind power — produced by large wind turbines, e.g. at Lake Turkana.\n\nGeothermal — heat from underground at Olkaria.\n\nGenerators — burn diesel or petrol to produce electricity.\n\nBatteries — store small amounts of electricity for phones and torches.',
                },
                {
                  heading: 'Series Circuits',
                  body: 'In a series circuit, components are connected one after another in a single loop. If one bulb burns out, the whole circuit breaks and all the bulbs go off. Christmas lights often work this way.',
                },
                {
                  heading: 'Parallel Circuits',
                  body: 'In a parallel circuit, each component has its own path. If one bulb burns out, the others stay on. The lights in your house are wired this way — that\'s why you can turn one bulb off without affecting the others.',
                },
                {
                  heading: 'Electrical Safety',
                  body: 'Never touch wires with wet hands.\n\nNever overload one socket with many plugs.\n\nReport damaged cables and broken sockets to an adult.\n\nNever insert objects into a power socket.\n\nKeep electrical devices away from water.',
                },
              ],
              vocabulary: [
                { term: 'Electricity', definition: 'Energy carried by moving electric charges' },
                { term: 'Circuit',     definition: 'A closed path through which electricity flows' },
                { term: 'Series',      definition: 'Connected one after another in a single loop' },
                { term: 'Parallel',    definition: 'Each component has its own separate path' },
                { term: 'Renewable',   definition: 'Energy source that does not run out, like the sun' },
                { term: 'Generator',   definition: 'Machine that produces electricity from fuel' },
              ],
              recap: [
                'Electrical energy powers most modern devices',
                'Kenya gets electricity from hydro, solar, wind, geothermal and generators',
                'Series circuits = one path; one failure stops everything',
                'Parallel circuits = separate paths; failures do not affect others',
                'Always follow safety rules when handling electricity',
              ],
            },
          },
        ],
      },

      {
        id: 'strand-sci7-magnetism',
        name: 'Magnetism',
        kiswahili: 'Sumaku',
        subStrands: [
          {
            id: 'sci7-magnetism',
            name: 'Magnetism',
            kiswahili: 'Sumaku',
            duration: 'Watch',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/JMzXoXmVepY',
            outcomes: [
              'Define magnetism and identify magnetic materials',
              'Distinguish between magnetic and non-magnetic materials',
              'Describe the two poles of a magnet and how they interact',
              'Identify everyday uses of magnets',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'Which of the following materials is magnetic?',
                options: ['Plastic', 'Wood', 'Iron', 'Glass'],
                correct: 2,
                explanation: 'Iron is a magnetic material — it is attracted to magnets. Plastic, wood and glass are non-magnetic.',
              },
              {
                id: 'q2',
                question: 'What happens when two North poles of magnets are brought together?',
                options: ['They attract each other', 'They repel each other', 'Nothing happens', 'They stick together'],
                correct: 1,
                explanation: 'Like poles repel each other. Two North poles (or two South poles) push away from each other.',
              },
              {
                id: 'q3',
                question: 'Which everyday object uses magnets?',
                options: ['A fridge door seal', 'A glass window', 'A plastic chair', 'A paper notebook'],
                correct: 0,
                explanation: 'Fridge door seals contain magnets that keep the door tightly closed. Magnets are used in many everyday items like speakers, motors and compasses.',
              },
            ],
            notes: {
              sections: [
                {
                  heading: 'What is Magnetism?',
                  body: 'Magnetism is a force that pulls or pushes certain materials without touching them. The objects that have this force are called magnets.',
                },
                {
                  heading: 'Magnetic vs Non-Magnetic Materials',
                  body: 'Magnetic materials are attracted to magnets. Examples: iron nails, steel spoons, some screws.\n\nNon-magnetic materials are NOT attracted to magnets. Examples: plastic, wood, glass, paper, aluminium foil.',
                },
                {
                  heading: 'The Two Poles of a Magnet',
                  body: 'Every magnet has two poles: a North pole (N) and a South pole (S). You cannot have a magnet with only one pole. Even if you break a magnet in half, each piece becomes a complete new magnet with both poles.',
                },
                {
                  heading: 'How Magnets Interact',
                  body: 'Like poles repel — push away from each other.\n  N + N → push apart\n  S + S → push apart\n\nUnlike poles attract — pull towards each other.\n  N + S → snap together\n\nA simple way to remember: opposites attract.',
                },
                {
                  heading: 'Everyday Uses of Magnets',
                  body: 'Fridge door seals keep doors tightly shut.\n\nLoudspeakers and earphones use magnets to produce sound.\n\nElectric motors in fans, blenders and EVs depend on magnets.\n\nCompasses use a small magnet to always point north.\n\nMRI machines in hospitals use very strong magnets to see inside the body.',
                },
              ],
              vocabulary: [
                { term: 'Magnet',   definition: 'Material that attracts iron and certain metals' },
                { term: 'Pole',     definition: 'One of the two ends of a magnet (North or South)' },
                { term: 'Attract',  definition: 'To pull towards' },
                { term: 'Repel',    definition: 'To push away' },
                { term: 'Magnetic', definition: 'Material that responds to a magnet' },
                { term: 'Compass',  definition: 'Tool that uses a magnet to show direction' },
              ],
              recap: [
                'Magnetism is a force that attracts or repels certain materials',
                'Iron and steel are magnetic; wood and plastic are not',
                'Every magnet has a North pole and a South pole',
                'Like poles repel; unlike poles attract',
                'Magnets are used in fridges, speakers, motors and compasses',
              ],
            },
          },
        ],
      },
    ],
  },
}

// ─────────────────────────────────────────
// UI COPY — Bilingual Strings
// ─────────────────────────────────────────
export const UI_STRINGS = {
  en: {
    welcome:           'Welcome back',
    yourProgress:      'Your Progress',
    dailyStreak:       'Day Streak',
    lessonsCompleted:  'Lessons Completed',
    masteryScore:      'Mastery Score',
    continueLeaning:   'Continue Learning',
    curriculum:        'Curriculum',
    chooseGrade:       'Choose Your Grade',
    chooseSubject:     'Choose a Subject',
    strands:           'Strands',
    startLesson:       'Start Lesson',
    whatYouWillLearn:  'What You Will Learn',
    quiz:              'Quick Check Quiz',
    submit:            'Submit Answer',
    next:              'Next Question',
    checkResults:      'View Results',
    excellent:         'Excellent Work! 🎉',
    goodJob:           'Good Job! 💪',
    keepPracticing:    'Keep Practicing! 📚',
    tryAgain:          'Try Again',
    lessonComplete:    'Lesson Complete!',
    signIn:            'Sign In to Learn',
    signInGoogle:      'Continue with Google',
    tagline:           'Every child deserves world-class education — free, forever.',
    signOut:           'Sign Out',
    profile:           'My Profile',
    settings:          'Settings',
    darkMode:          'Dark Mode',
    language:          'Language',
    home:              'Home',
    search:            'Search lessons...',
    grade:             'Grade',
    duration:          'Duration',
    difficulty:        'Difficulty',
    passRequired:      '80% required to complete',
    yourScore:         'Your Score',
    correct:           'Correct!',
    incorrect:         'Incorrect',
    explanation:       'Explanation',
  },
  sw: {
    welcome:           'Karibu tena',
    yourProgress:      'Maendeleo Yako',
    dailyStreak:       'Siku Mfululizo',
    lessonsCompleted:  'Masomo Yaliyokamilika',
    masteryScore:      'Alama ya Ujuzi',
    continueLeaning:   'Endelea Kujifunza',
    curriculum:        'Mtaala',
    chooseGrade:       'Chagua Darasa Lako',
    chooseSubject:     'Chagua Somo',
    strands:           'Nyuzi',
    startLesson:       'Anza Somo',
    whatYouWillLearn:  'Utakachojifunza',
    quiz:              'Maswali ya Haraka',
    submit:            'Wasilisha Jibu',
    next:              'Swali Lijalo',
    checkResults:      'Angalia Matokeo',
    excellent:         'Kazi Nzuri Sana! 🎉',
    goodJob:           'Hongera! 💪',
    keepPracticing:    'Endelea Kufanya Mazoezi! 📚',
    tryAgain:          'Jaribu Tena',
    lessonComplete:    'Somo Limekamilika!',
    signIn:            'Ingia Kujifunza',
    signInGoogle:      'Endelea na Google',
    tagline:           'Kila mtoto anastahili elimu ya daraja la kwanza — bure, milele.',
    signOut:           'Ondoka',
    profile:           'Wasifu Wangu',
    settings:          'Mipangilio',
    darkMode:          'Hali ya Usiku',
    language:          'Lugha',
    home:              'Nyumbani',
    search:            'Tafuta masomo...',
    grade:             'Darasa',
    duration:          'Muda',
    difficulty:        'Ugumu',
    passRequired:      '80% inahitajika kukamilika',
    yourScore:         'Alama Yako',
    correct:           'Sahihi!',
    incorrect:         'Kosa',
    explanation:       'Maelezo',
  },
}

// ─────────────────────────────────────────
// SEARCH HELPER
// ─────────────────────────────────────────
export const searchLessons = (query, limit = 8) => {
  if (!query || query.trim().length < 2) return []

  const q = query.trim().toLowerCase()
  const results = []

  for (const [subjectId, subjectData] of Object.entries(CURRICULUM)) {
    let subjectMeta = null
    let gradeOfSubject = null

    for (const [grade, subjects] of Object.entries(SUBJECTS)) {
      const found = subjects.find(s => s.id === subjectId)
      if (found) {
        subjectMeta = found
        gradeOfSubject = Number(grade)
        break
      }
    }

    if (!subjectMeta) continue

    for (const strand of subjectData.strands) {
      for (const sub of strand.subStrands) {
        const nameEn   = (sub.name || '').toLowerCase()
        const nameSw   = (sub.kiswahili || '').toLowerCase()
        const strandEn = (strand.name || '').toLowerCase()

        if (
          nameEn.includes(q) ||
          nameSw.includes(q) ||
          strandEn.includes(q)
        ) {
          results.push({
            lessonId:      sub.id,
            lessonName:    sub.name,
            lessonNameSw:  sub.kiswahili,
            subjectId,
            subjectName:   subjectMeta.name,
            subjectNameSw: subjectMeta.kiswahili,
            subjectEmoji:  subjectMeta.emoji,
            subjectColor:  subjectMeta.color,
            strandName:    strand.name,
            strandId:      strand.id,
            grade:         gradeOfSubject,
          })

          if (results.length >= limit) return results
        }
      }
    }
  }

  return results
}