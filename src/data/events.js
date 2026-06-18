export const currentEvents = [
  {
    id: 1,
    name: "CHEMQUIZ",
    category: "Quiz",
    type: "Team",
    teamSize: "2-3",
    rounds: 3,
    prize: "₹5,000",
    description: "A multi-round chemistry quiz testing knowledge from basic to advanced levels. Teams battle through elimination rounds covering organic, inorganic, and physical chemistry.",
    details: [
      "Round 1: Written MCQ — 30 questions, 20 minutes",
      "Round 2: Rapid Fire — buzzer-based speed round",
      "Round 3: Final Showdown — visual and analytical problems"
    ],
    rules: [
      "Team of 2-3 members",
      "No electronic devices in quiz hall",
      "Judge's decision is final",
      "Negative marking in Round 1"
    ],
    icon: "⚗️",
    color: "#00f5d4",
    phase: "liquid"
  },
  {
    id: 2,
    name: "REACTION RACE",
    category: "Lab",
    type: "Team",
    teamSize: "2",
    rounds: 2,
    prize: "₹8,000",
    description: "Speed-based lab experiment competition where teams race to complete chemical reactions correctly. Accuracy and speed both count toward your final score.",
    details: [
      "Perform given reactions as fast as possible",
      "Points for speed and accuracy of observations",
      "Safety compliance is mandatory"
    ],
    rules: [
      "Lab coat and gloves mandatory",
      "Pair of 2 participants",
      "Spills and accidents lead to disqualification",
      "All equipment provided by organizers"
    ],
    icon: "🧪",
    color: "#f0a500",
    phase: "gas"
  },
  {
    id: 3,
    name: "CHEM CASE STUDY",
    category: "Analytical",
    type: "Team",
    teamSize: "3-4",
    rounds: 2,
    prize: "₹10,000",
    description: "Solve real-world industrial chemistry problems. Teams analyze chemical processes, identify inefficiencies, and propose optimized solutions based on thermodynamic and kinetic principles.",
    details: [
      "Case study released 30 minutes before presentation",
      "10-minute presentation + 5-minute Q&A",
      "Judges include industry professionals"
    ],
    rules: [
      "Team of 3-4 members",
      "Presentation slides allowed",
      "No internet during case analysis",
      "Originality and feasibility judged"
    ],
    icon: "📊",
    color: "#00f5d4",
    phase: "solid"
  },
  {
    id: 4,
    name: "MOL MODELLING",
    category: "Computational",
    type: "Individual",
    teamSize: "1",
    rounds: 1,
    prize: "₹6,000",
    description: "Design and optimize molecular structures using computational chemistry tools. Participants model drug candidates, predict properties, and present their findings.",
    details: [
      "Software: Avogadro / MarvinSketch provided",
      "Design a molecule for a given therapeutic target",
      "Submit model + brief report"
    ],
    rules: [
      "Individual event",
      "Computers provided by organizers",
      "3-hour time limit",
      "Judged on accuracy and creativity"
    ],
    icon: "🔬",
    color: "#f0a500",
    phase: "plasma"
  },
  {
    id: 5,
    name: "TITRATION",
    category: "Lab",
    type: "Individual",
    teamSize: "1",
    rounds: 2,
    prize: "₹4,000",
    description: "Classic volumetric analysis competition. Determine the unknown concentration of solutions through precise titration techniques. Precision is everything.",
    details: [
      "Acid-base and redox titrations",
      "Unknown samples provided",
      "Closest answer to actual value wins"
    ],
    rules: [
      "Individual competition",
      "One attempt per sample",
      "Lab coat mandatory",
      "Glassware breakage leads to point deduction"
    ],
    icon: "💧",
    color: "#00f5d4",
    phase: "liquid"
  }
];

export const previousEvents = [
  {
    id: 101,
    name: "CODE THE PROBLEM",
    category: "Coding",
    type: "INDIVIDUAL",
    teamSize: "1",
    rounds: 1,
    prize: "₹15,000",
    description: "Think of solutions in the form of code to solve a problem and exhibit your problem solving skills and creativity.",
    details: [
      "Eligibility: UG & PG Students",
      "Platform: HackerRank",
      "Winner's Prize: ₹15,000",
      "Runner-Up's Prize: ₹7,000"
    ],
    rules: [
      "Individual Participation",
      "No calculators allowed",
      "Judge's decision is final"
    ],
    icon: "💻",
    color: "#7a8fa6",
    phase: "freeze",
    year: "2025"
  },
  {
    id: 102,
    name: "QUIZBOWL",
    category: "Quiz",
    type: "Team",
    teamSize: "3",
    rounds: 2,
    prize: "₹15,000",
    description: "A fast quiz to test real life knowledge and problem solving skills.",
    details: [
      "Eligibility: UG & PG Students",
      "Round 1: Online(via Unstop)-MCQs + Short Answers",
      "Round 2: Offline Buzzer+Rapid Fire Round"
    ],
    rules: [
      "Round 1: Top 8-10 teams will qualify",
      "Round 2 Venue: New Anne Building, IIT Kharagpur",
      "Live Audience Quiz Show"
    ],
    icon: "❓",
    color: "#7a8fa6",
    phase: "freeze",
    year: "2025"
  },
  {
    id: 103,
    name: "CHEM-E-REEL",
    category: "ENTERTAINMENT",
    type: "Team",
    teamSize: "2-3",
    rounds: 1,
    prize: "₹10,000",
    description: "Turn science into stories. Explain, engage, inspire through reels",
    details: [
      "Eligibility: UG & PG Students",
      "Platform: Unstop",
      "Winner's Prize: ₹10,000",
      "Runner-Up's Prize: ₹5,000"
    ],
    rules: [
      "Team of 2-3 members",
      "Round 1 Venue: New Anne Building, IIT Kharagpur",
      "Judge's decision is final"
    ],
    icon: "🎬",
    color: "#7a8fa6",
    phase: "freeze",
    year: "2025"
  },
  {
    id: 104,
    name: "OPTIMISEIT",
    category: "Presentation",
    type: "Team",
    teamSize: "4",
    rounds: 2,
    prize: "₹15,000",
    description: "Think. Analyze. Innovate. Crack real world cases smartly.",
    details: [
      "Winner's Prize: ₹15,000",
      "Runner-Up's Prize: ₹7,000",
      "Round 1: Online(Google Form)",
      "Round 2: Offline Slides Presentation"
    ],
    rules: [
      "Eligibility: UG & PG Students",
      "Round 2 Venue: New Anne Building, IIT Kharagpur",
      "Judge's decision is final"
    ],
    icon: "📜",
    color: "#7a8fa6",
    phase: "freeze",
    year: "2025"
  },
  {
    id: 105,
    name: "REVERSE BRAINSTORMING",
    category: "Strategy",
    type: "Team",
    teamSize: "3-4",
    rounds: 1,
    prize: "₹15,000",
    description: "A creative session that solves problems by thinking in reverse and exploring what could go wrong.",
    details: [
      "Eligibility: UG & PG Students",
      "No individual Participation"
    ],
    rules: [
      "Round 1 Venue: New Anne Building, IIT Kharagpur",
      "Judge's decision is final"
    ],
    icon: "🧩",
    color: "#7a8fa6",
    phase: "freeze",
    year: "2025"
  },
  {
    id: 106,
    name: "PHOTOGRAPHY CHALLENGE",
    category: "Entertainment",
    type: "Individual",
    teamSize: "1",
    rounds: 1,
    prize: "₹10,000",
    description: "A photography challenge capturing creativity through everyday moments.",
    details: [
      "Submission: Online Google Form",
      "Eligibility: UG & PG Students",
      "Exciting goodies to top selected people"
    ],
    rules: [
      "Individual Participation",
      "Judge's decision is final",
      "No AI images allowed"
    ],
    icon: "📸",
    color: "#7a8fa6",
    phase: "freeze",
    year: "2025"
  },
  {
    id: 107,
    name: "CHEM-MEME CHALLENGE",
    category: "Entertainment",
    type: "Individual",
    teamSize: "1",
    rounds: 1,
    prize: "₹8,000",
    description: "A fun meme challenge turning scientific concepts into relatable humor.",
    details: [
      "Any medium: pencil, paint, digital",
      "Must incorporate chemistry concepts",
      "Submission: Google Form"
    ],
    rules: [
      "Individual event",
      "Original work only",
      "Concept explanation required"
    ],
    icon: "🎬",
    color: "#7a8fa6",
    phase: "freeze",
    year: "2024"
  },
  {
    id: 108,
    name: "ASPEN WORKSHOP",
    category: "Workshop",
    type: "Team/Individual",
    teamSize: "1-2",
    rounds: 1,
    prize: "Goodies",
    description: "A hands-on workshop introducing Aspen software for process simulation and design.",
    details: [
      "Stage 1: Theory (1 hr)",
      "Stage 2: Lab (2 hrs)",
      "Stage 3: Project Pitch"
    ],
    rules: [
      "Maximum team of 2",
      "All stages mandatory",
      "offline"
    ],
    icon: "🗓️",
    color: "#7a8fa6",
    phase: "freeze",
    year: "2024"
  },
  {
    id: 109,
    name: "CHEM-ENGAGE",
    category: "Entertainment",
    type: "Team/Individual",
    teamSize: "1-4",
    rounds: 1,
    prize: "₹8,000",
    description: "An interactive event fostering engagement through fun activities, discussions, and challenges.",
    details: [
      "Live interaction with faculty",
      "Eligibility: UG & PG students"
    ],
    rules: [
      "Maximum team of 4",
      "offline"
    ],
    icon: "📊",
    color: "#7a8fa6",
    phase: "freeze",
    year: "2024"
  },
  {
    id: 110,
    name: "CHEM-INTELLIGENCE",
    category: "Strategy",
    type: "Individual",
    teamSize: "1",
    rounds: 1,
    prize: "Exciting Prizes",
    description: "A challenge that tests analytical thinking and problem-solving skills through engaging tasks.",
    details: [
      "Venue: New Annex Building, IIT Kharagpur",
      "Eligibility: UG & PG students"
    ],
    rules: [
      "Individual Participation",
      "No smart gadgets allowed",
      "Registration Mandatory."
    ],
    icon: "🎯",
    color: "#7a8fa6",
    phase: "freeze",
    year: "2024"
  }
];
