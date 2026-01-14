# Brain Gym App - Requirements Document

## 1. Project Overview

### 1.1 Purpose
A scientifically-grounded web application that targets specific cognitive abilities based on established psychological and neuroscience research, providing personalized brain training exercises that enhance cognitive functions while tracking measurable progress across validated cognitive domains.

### 1.2 Target Users
- Individuals seeking evidence-based cognitive improvement
- Students enhancing learning capacity and academic performance
- Professionals maintaining cognitive sharpness and executive function
- Adults interested in cognitive health and neuroplasticity

### 1.3 Scientific Foundation
The app is built on established cognitive psychology frameworks:
- Cattell-Horn-Carroll (CHC) theory of cognitive abilities
- Working memory models (Baddeley & Hitch)
- Information processing theory
- Neuroplasticity principles
- Spaced repetition and memory consolidation research

## 2. Technical Stack

### 2.1 Core Technologies
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **AI Integration**: Google Gemini API
- **State Management**: React Hooks + Context API (or Zustand if needed)
- **Data Persistence**: Browser Storage API (localStorage/IndexedDB) or Vercel Postgres
- **Deployment**: Vercel

### 2.2 Key Dependencies
- `@google/generative-ai` - Gemini API client
- `date-fns` - Date manipulation and spaced repetition scheduling
- `recharts` - Progress visualization
- `zod` - Schema validation
- `react-hook-form` - Form handling

## 3. Cognitive Framework & Abilities

### 3.1 Primary Cognitive Domains (Based on CHC Theory)

#### 3.1.1 Fluid Intelligence (Gf)
**Definition**: Ability to reason, form concepts, and solve novel problems independent of acquired knowledge.

**Sub-abilities**:
- **Inductive Reasoning**: Discovering rules/patterns from specific cases
- **Deductive Reasoning**: Applying general rules to specific cases
- **Quantitative Reasoning**: Mathematical problem-solving
- **Abstract Thinking**: Working with symbolic relationships

**Exercise Types**:
- Pattern completion matrices (Raven's-style)
- Logical sequences
- Analogical reasoning tasks
- Novel problem-solving scenarios

**Measurable Metrics**:
- Problem-solving speed
- Accuracy in pattern recognition
- Transfer to novel problems
- Complexity handling capacity

#### 3.1.2 Crystallized Intelligence (Gc)
**Definition**: Breadth and depth of acquired knowledge, ability to communicate and apply knowledge.

**Sub-abilities**:
- **Verbal Comprehension**: Understanding word meanings and relationships
- **General Knowledge**: Factual information across domains
- **Language Development**: Vocabulary and grammar
- **Lexical Knowledge**: Word retrieval and usage

**Exercise Types**:
- Vocabulary expansion tasks
- Reading comprehension challenges
- Semantic reasoning
- Knowledge application scenarios
- Etymology and word relationships

**Measurable Metrics**:
- Vocabulary growth rate
- Comprehension accuracy
- Information retention over time
- Knowledge application success

#### 3.1.3 Working Memory (Gwm)
**Definition**: Capacity to hold and manipulate information in immediate awareness.

**Sub-abilities**:
- **Phonological Loop**: Verbal/auditory information storage
- **Visuospatial Sketchpad**: Visual/spatial information storage
- **Central Executive**: Attention control and information manipulation
- **Episodic Buffer**: Integration of information from multiple sources

**Exercise Types**:
- N-back tasks (visual and auditory)
- Mental arithmetic
- Simultaneous information tracking
- Operation span tasks
- Digit/letter span exercises

**Measurable Metrics**:
- Span capacity (items held)
- Manipulation accuracy
- Dual-task performance
- Interference resistance

#### 3.1.4 Long-Term Memory & Retrieval (Glr)
**Definition**: Ability to store, consolidate, and retrieve information over extended periods.

**Sub-abilities**:
- **Associative Memory**: Forming connections between items
- **Meaningful Memory**: Semantic encoding and retrieval
- **Free Recall**: Retrieving without cues
- **Cued Recall**: Retrieval with prompts

**Exercise Types**:
- Spaced repetition learning
- Mnemonic technique training
- Story-based memory challenges
- Paired-associate learning
- Recognition vs recall tasks

**Measurable Metrics**:
- Retention rate over intervals (1hr, 1day, 1week, 1month)
- Recall accuracy
- Consolidation efficiency
- Forgetting curve analysis

#### 3.1.5 Processing Speed (Gs)
**Definition**: Ability to automatically and fluently perform cognitive tasks, especially under pressure.

**Sub-abilities**:
- **Perceptual Speed**: Quick visual scanning and comparison
- **Rate of Test Taking**: Speed of performing routine tasks
- **Mental Comparison**: Rapid decision-making
- **Reaction Time**: Response speed to stimuli

**Exercise Types**:
- Timed visual search tasks
- Rapid symbol matching
- Quick mental arithmetic
- Speed reading comprehension
- Reaction time challenges

**Measurable Metrics**:
- Response latency
- Items processed per minute
- Speed-accuracy tradeoff
- Improvement rate in automaticity

#### 3.1.6 Executive Functions (EF)
**Definition**: Higher-order cognitive processes for goal-directed behavior and self-regulation.

**Sub-abilities**:
- **Inhibitory Control**: Suppressing automatic responses
- **Cognitive Flexibility**: Switching between tasks/perspectives
- **Planning**: Sequential goal-oriented behavior
- **Decision-Making**: Evaluating options and outcomes

**Exercise Types**:
- Stroop-like interference tasks
- Task-switching exercises
- Strategic planning problems
- Multi-step problem decomposition
- Go/No-go tasks

**Measurable Metrics**:
- Switch cost (time penalty)
- Inhibition success rate
- Planning efficiency
- Error monitoring accuracy

#### 3.1.7 Attention & Concentration (Ga)
**Definition**: Capacity to sustain focus, divide attention, and selectively attend to relevant information.

**Sub-abilities**:
- **Sustained Attention**: Maintaining focus over time
- **Selective Attention**: Filtering distractions
- **Divided Attention**: Managing multiple streams
- **Attentional Control**: Directing focus volitionally

**Exercise Types**:
- Continuous performance tasks
- Selective attention challenges
- Dual-task training
- Vigilance tasks
- Mindfulness-based focus exercises

**Measurable Metrics**:
- Vigilance decrement rate
- Distractor interference cost
- Sustained performance duration
- Attention recovery speed

#### 3.1.8 Visual-Spatial Processing (Gv)
**Definition**: Ability to perceive, analyze, synthesize, and manipulate visual patterns and spatial relationships.

**Sub-abilities**:
- **Spatial Relations**: Understanding object positions
- **Visualization**: Mentally manipulating images
- **Mental Rotation**: Rotating objects in mind
- **Closure Speed**: Completing partial visual information

**Exercise Types**:
- 3D object rotation tasks
- Spatial navigation puzzles
- Mental folding exercises
- Figure-ground separation
- Spatial memory challenges

**Measurable Metrics**:
- Rotation accuracy
- Navigation efficiency
- Spatial memory span
- Visualization speed

### 3.2 Information Retention Mechanisms

#### 3.2.1 Encoding Strategies
**Depth of Processing**:
- **Shallow Processing**: Surface features (visual, phonetic)
- **Deep Processing**: Semantic meaning and personal relevance
- **Elaborative Rehearsal**: Connecting to existing knowledge

**Implementation**:
- Exercises explicitly teach encoding techniques
- Multi-sensory encoding (visual + verbal)
- Self-reference effect utilization
- Chunking and organization strategies

#### 3.2.2 Consolidation Process
**Sleep-Dependent Consolidation**:
- Track time-of-day for exercises
- Emphasize review timing (before sleep)
- Morning vs evening performance analysis

**Spaced Repetition Algorithm**:
- Implement modified SM-2 algorithm
- Adaptive scheduling based on forgetting curves
- Optimal review intervals: 1hr, 1day, 3days, 7days, 14days, 30days

**Implementation**:
```typescript
interface SpacedRepetitionItem {
  id: string;
  content: Exercise;
  easeFactor: number; // 1.3 to 2.5
  interval: number; // days
  repetitions: number;
  nextReview: Date;
  lastPerformance: number; // 0-5 quality rating
}
```

#### 3.2.3 Retrieval Practice
**Testing Effect**:
- Prioritize active recall over passive review
- Varied retrieval contexts
- Interleaved practice across domains

**Retrieval Difficulty**:
- Desirable difficulties concept
- Graduated prompting (start hard, provide hints)
- Varied question formats for same concept

### 3.3 Reasoning Abilities

#### 3.3.1 Deductive Reasoning
**Syllogistic Reasoning**:
- Premise evaluation
- Logical validity assessment
- Conclusion derivation

**Conditional Reasoning**:
- If-then logic
- Modus ponens/tollens
- Logical fallacy identification

**Exercise Examples**:
- Formal logic puzzles
- Legal reasoning scenarios
- Mathematical proofs
- Algorithm design challenges

#### 3.3.2 Inductive Reasoning
**Pattern Recognition**:
- Sequence extrapolation
- Rule discovery
- Generalization from examples

**Probabilistic Reasoning**:
- Statistical inference
- Bayesian thinking
- Uncertainty management

**Exercise Examples**:
- Number/letter sequences
- Visual pattern matrices
- Scientific hypothesis generation
- Data trend analysis

#### 3.3.3 Analogical Reasoning
**Relational Mapping**:
- A:B :: C:?
- Cross-domain analogies
- Metaphorical thinking

**Exercise Examples**:
- Verbal analogies
- Proportional reasoning
- Conceptual mapping tasks

#### 3.3.4 Critical Thinking
**Argument Analysis**:
- Premise identification
- Assumption detection
- Evidence evaluation
- Bias recognition

**Exercise Examples**:
- Argument deconstruction
- Fallacy identification
- Source credibility assessment
- Claim verification

## 4. AI-Powered Adaptive System

### 4.1 Cognitive Profile Assessment

#### Initial Assessment
- Brief (15-min) multi-domain baseline
- Establishes starting difficulty per ability
- Identifies relative strengths/weaknesses
- Creates personalized training profile

#### Continuous Assessment
- Performance tracking across all domains
- Learning rate calculation per ability
- Transfer effects between related abilities
- Plateau detection and intervention

### 4.2 Personalized Training Algorithm

#### Daily Workout Generation Logic
```
1. Analyze cognitive profile:
   - Identify 2-3 weakest domains (priority targets)
   - Include 1-2 strongest domains (maintenance)
   - Rotate through all domains weekly
   
2. Apply spaced repetition:
   - Check items due for review
   - Prioritize near-forgotten items
   
3. Consider optimal challenge:
   - Target 70-80% success rate
   - Adjust difficulty based on recent performance
   - Introduce novel variations
   
4. Ensure variety:
   - Mix exercise types
   - Vary presentation formats
   - Include interleaved practice
   
5. Respect cognitive load:
   - Start with processing speed (warm-up)
   - Peak with working memory/reasoning (high demand)
   - End with crystallized intelligence (lower load)
```

#### Difficulty Adaptation
**Performance Triggers**:
- 3 consecutive successes → increase difficulty
- 2 consecutive failures → decrease difficulty
- 85%+ accuracy over 5 exercises → increase complexity
- <60% accuracy → add scaffolding/hints

**Difficulty Dimensions**:
- Information quantity
- Processing complexity
- Time pressure
- Interference level
- Abstraction degree

### 4.3 Gemini API Integration for Cognitive Exercises

#### Exercise Generation Prompts

**Fluid Intelligence Exercise**:
```
Generate an inductive reasoning exercise at difficulty level [1-10].

Required elements:
- Present a pattern/sequence with [X] elements
- Pattern should involve [rule_complexity] rules
- Include 4 multiple-choice options
- Target solution time: [Y] seconds

Cognitive requirements:
- Novel pattern (not standard sequences)
- Requires genuine reasoning, not memory
- Solution should demonstrate clear logical rule

Return JSON with:
{
  "pattern": [elements],
  "rule_description": "hidden rule",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "C",
  "explanation": "step-by-step reasoning",
  "cognitive_load": "level",
  "skills_trained": ["inductive reasoning", "pattern recognition"]
}
```

**Working Memory Exercise**:
```
Create an N-back working memory task (N=[2-4]).

Parameters:
- Stimulus type: [visual/verbal/spatial]
- Sequence length: [15-30] items
- Distractor level: [low/medium/high]

The exercise should:
- Present items sequentially
- Require participant to identify when current item matches item N positions back
- Include target frequency of 30-40%

Return format for implementation with timing controls.
```

**Long-Term Memory Exercise**:
```
Design a memory consolidation exercise using elaborative encoding.

Content domain: [science/history/vocabulary/concepts]
Difficulty: [beginner/intermediate/advanced]

Create:
1. 5-7 new information items to learn
2. Meaningful associations/mnemonics for each
3. Immediate recall test (3 questions)
4. Delayed recall test (to be administered later)
5. Recognition test with lures

Ensure deep processing through:
- Semantic elaboration
- Personal relevance connections
- Visual imagery prompts

Include spaced repetition schedule.
```

**Executive Function Exercise**:
```
Generate a cognitive flexibility task-switching exercise.

Setup:
- Two tasks with different rules (e.g., magnitude vs parity)
- [N] trials with switches every [X] trials
- Include both switch and no-switch trials

Requirements:
- Clear task cues
- Measure switch cost
- Include catch trials
- Difficulty increases through complexity, not speed

Provide:
- Task instructions
- Trial sequence
- Scoring rubric
- Expected switch cost metrics
```

#### Insight Generation Prompts

```
Analyze this cognitive training data over [timeframe]:

Performance by domain:
- Fluid Intelligence: [accuracy%, speed, difficulty_level]
- Working Memory: [span, accuracy%, manipulation_success]
- Processing Speed: [items/min, improvement_rate]
- Long-term Memory: [retention_rate_1day, retention_rate_7day]
- Executive Functions: [switch_cost, inhibition_success]
- Attention: [sustained_duration, distractor_resistance]

Learning patterns:
- Fastest improvement: [domain]
- Plateaus detected: [domains]
- Transfer effects observed: [domain1] → [domain2]
- Optimal training time: [time_of_day]

Generate psychological insights:
1. Cognitive profile interpretation (strengths/weaknesses)
2. Evidence of neuroplasticity (specific improvements)
3. Learning efficiency analysis
4. Predicted areas of fastest growth
5. Personalized recommendations based on cognitive psychology:
   - Which abilities to prioritize
   - Optimal training strategies
   - Lifestyle factors to consider (sleep, exercise)
   - Expected timeline for improvements

Frame in accessible but scientifically accurate language.
```

## 5. Data Models

### 5.1 Cognitive Profile
```typescript
interface CognitiveProfile {
  userId: string;
  assessedAt: Date;
  
  abilities: {
    fluidIntelligence: AbilityScore;
    crystallizedIntelligence: AbilityScore;
    workingMemory: AbilityScore;
    longTermMemory: AbilityScore;
    processingSpeed: AbilityScore;
    executiveFunctions: AbilityScore;
    attention: AbilityScore;
    visualSpatial: AbilityScore;
  };
  
  learningMetrics: {
    averageImprovementRate: number; // % per week
    fastestGrowthArea: string;
    slowestGrowthArea: string;
    transferEffects: TransferEffect[];
  };
  
  optimalConditions: {
    bestTimeOfDay: 'morning' | 'afternoon' | 'evening';
    optimalSessionLength: number; // minutes
    preferredDifficulty: number; // 1-10
  };
}

interface AbilityScore {
  currentLevel: number; // 1-100 standardized score
  startingLevel: number;
  improvementRate: number; // % change per week
  lastAssessed: Date;
  confidence: number; // statistical confidence in measurement
  subAbilities: {
    [key: string]: number; // granular scores
  };
}

interface TransferEffect {
  sourceAbility: string;
  targetAbility: string;
  correlationStrength: number; // 0-1
  evidenceSessions: number;
}
```

### 5.2 Exercise with Cognitive Metadata
```typescript
interface CognitiveExercise {
  id: string;
  
  // Cognitive classification
  primaryAbility: CognitiveAbility;
  secondaryAbilities: CognitiveAbility[];
  specificSkills: string[]; // e.g., "inductive reasoning", "inhibitory control"
  
  // Difficulty parameters
  difficultyLevel: number; // 1-10
  cognitiveLoad: 'low' | 'medium' | 'high' | 'very-high';
  estimatedTime: number; // seconds
  
  // Content
  instructions: string;
  content: ExerciseContent;
  correctAnswer: any;
  
  // Pedagogical elements
  scaffolding: {
    hints: string[];
    hintsRemaining: number;
    partialCredit: boolean;
  };
  
  // Learning science
  encodingStrategy?: 'visual' | 'verbal' | 'multimodal' | 'elaborative';
  retrievalType?: 'free-recall' | 'cued-recall' | 'recognition';
  
  // Spaced repetition
  repetitionData?: SpacedRepetitionItem;
  
  // Metadata
  generatedBy: 'ai' | 'preset';
  tags: string[];
  researchBasis: string[]; // citations to cognitive science research
}

type CognitiveAbility = 
  | 'fluid-intelligence'
  | 'crystallized-intelligence'
  | 'working-memory'
  | 'long-term-memory'
  | 'processing-speed'
  | 'executive-functions'
  | 'attention'
  | 'visual-spatial';

interface ExerciseContent {
  type: 'pattern-completion' | 'n-back' | 'recall' | 'reasoning' | 'speed' | 'switching';
  data: any; // type-specific structure
}
```

### 5.3 Session with Cognitive Metrics
```typescript
interface CognitiveSession {
  id: string;
  userId: string;
  startedAt: Date;
  completedAt: Date;
  
  // Session context
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  dayOfWeek: string;
  sessionType: 'daily-workout' | 'focused-practice' | 'review';
  
  exercises: ExerciseAttempt[];
  
  // Performance metrics
  overallAccuracy: number;
  averageResponseTime: number;
  cognitiveLoadBalance: number; // how well-distributed across difficulty
  
  // Cognitive state indicators
  fatigueDetected: boolean;
  consistencyScore: number; // performance variability
  engagementLevel: number; // based on response patterns
  
  // Learning outcomes
  abilitiesEngaged: CognitiveAbility[];
  estimatedGrowth: {
    [ability: string]: number; // expected improvement contribution
  };
}

interface ExerciseAttempt {
  exerciseId: string;
  ability: CognitiveAbility;
  
  // Performance
  userAnswer: any;
  correct: boolean;
  responseTime: number; // milliseconds
  hintsUsed: number;
  
  // Cognitive metrics
  difficultyExperienced: number; // 1-10, self-reported
  cognitiveEffort: number; // derived from RT and accuracy
  
  // Learning indicators
  improvementFromLastAttempt?: number;
  retrievalStrength?: number; // for memory exercises
  
  // Context
  attemptNumber: number; // for repeated exercises
  daysSinceLastAttempt?: number;
}
```

### 5.4 Memory Consolidation Tracker
```typescript
interface ConsolidationTracker {
  userId: string;
  itemId: string;
  content: string;
  
  // Encoding
  initialEncoding: {
    date: Date;
    encodingStrategy: string;
    initialStrength: number; // 0-1
  };
  
  // Review schedule
  reviews: ReviewAttempt[];
  nextReviewDue: Date;
  
  // Forgetting curve data
  forgettingCurve: {
    dataPoints: { daysElapsed: number; retrievalSuccess: boolean; strength: number }[];
    predictedRetention: number; // at next review
    halfLife: number; // days until 50% probability of recall
  };
  
  // Optimization
  optimalInterval: number; // calculated next interval
  easeFactor: number; // SM-2 ease factor
  lapses: number; // times forgotten
}

interface ReviewAttempt {
  date: Date;
  daysSinceLastReview: number;
  retrievalSuccess: boolean;
  responseTime: number;
  confidence: number; // self-reported 1-5
  contextCues: string[];
}
```

## 6. User Interface Requirements

### 6.1 Pages/Routes

#### `/` - Dashboard
- **Cognitive Profile Overview**: Radar chart of 8 abilities
- **Today's Training Plan**: AI-generated workout with cognitive rationale
- **Current Streak & Momentum**: Neuroplasticity progress indicator
- **Recent Growth**: Line chart showing ability improvements
- **Review Queue**: Items due for spaced repetition
- **Daily Cognitive Tip**: Neuroscience-based insight

#### `/workout` - Training Session
- **Pre-Session Brief**: Which abilities will be trained and why
- **Cognitive Warm-up**: Low-load task to prime focus
- **Exercise Area**: 
  - Clear indication of ability being trained
  - Real-time cognitive load indicator
  - Adaptive difficulty feedback
  - Hint system with metacognitive prompts
- **Inter-Exercise Breaks**: Brief rest with optional breathing exercise
- **Post-Session Analysis**: 
  - Cognitive performance summary
  - Comparison to personal baseline
  - Growth indicators
  - Consolidation tips (e.g., "Review before sleep")

#### `/abilities` - Cognitive Abilities Explorer
- **8 Ability Cards**: Each with:
  - Definition and importance
  - Current level vs starting level
  - Recent trend (improving/stable/declining)
  - Real-world applications
  - "Train Now" quick start
- **Ability Relationships**: Visual map showing transfer effects
- **Research Basis**: Links to relevant cognitive science

#### `/progress` - Detailed Analytics
**Overview Tab**:
- Multi-ability trend lines
- Weekly improvement rates
- Comparative percentiles (vs initial self)
- Cognitive age estimate (optional, with caveats)

**By Ability Tab**:
- Deep dive per ability
- Sub-ability breakdowns
- Exercise type performance
- Difficulty progression timeline

**Memory Tab**:
- Retention curves by time interval
- Forgetting curve visualization
- Consolidation efficiency
- Optimal review timing analysis

**Learning Insights Tab**:
- Transfer effect discoveries
- Learning rate comparisons
- Plateau identification
- Optimal training conditions

#### `/insights` - AI Cognitive Analysis
- **Your Cognitive Profile**: Narrative interpretation
- **Neuroplasticity Progress**: Evidence of brain adaptation
- **Personalized Recommendations**: Based on cognitive science
- **Learning Efficiency Report**: What's working, what needs adjustment
- **Predicted Growth Trajectory**: Based on current patterns
- **Research-Based Tips**: Specific to user's profile

#### `/memory-palace` - Spaced Repetition Center
- **Review Queue**: Cards due today
- **Retention Statistics**: Success rates by interval
- **Forgetting Curves**: Visual representation
- **Learned Items**: Browseable archive
- **Schedule Optimization**: AI-adjusted timing
- **Memory Techniques**: Tutorials on encoding strategies

#### `/exercises` - Exercise Library
- **Browse by Ability**: Filtered view
- **Difficulty Selection**: 1-10 scale
- **Exercise History**: Previously completed
- **Favorites**: User-marked exercises
- **Custom Generation**: Request specific AI exercise

#### `/settings` - Personalization
**Training Preferences**:
- Daily time commitment (minutes)
- Ability priorities (which to focus on)
- Difficulty comfort zone
- Session structure (warm-up, cooldown preferences)

**Learning Optimization**:
- Spaced repetition aggressiveness
- Hint usage preferences
- Performance feedback detail level
- Rest break frequency

**Scientific Options**:
- Show research citations
- Display technical metrics
- Cognitive load warnings
- Data export for personal analysis

### 6.2 Component Requirements

#### Cognitive-Specific Components

**`AbilityRadarChart`**
- 8-axis radar showing current levels
- Overlays: starting baseline, average improvement
- Interactive: click axis for ability deep-dive
- Color-coded by improvement rate

**`ForgettingCurveGraph`**
- Plots retention probability over time
- Shows review schedule markers
- Displays "optimal review zone"
- Compares individual vs ideal curve

**`CognitiveLoadIndicator`**
- Real-time mental effort gauge
- Based on task difficulty and user fatigue
- Warns when approaching overload
- Adjusts to maintain optimal challenge

**`TransferEffectNetwork`**
- Node graph of cognitive abilities
- Edge thickness = transfer strength
- Highlights active transfers during training
- Educational overlay explaining connections

**`NeuroplasticityProgress`**
- Visual metaphor (e.g., growing neural network)
- Animates with each training session
- Milestones for significant improvements
- Motivational but scientifically grounded

**`EncodingStrategyGuide`**
- Step-by-step visual guide for memory techniques
- Adaptive to content type
- Examples and practice
- Effectiveness tracking

**`PerformanceContextAnalyzer`**
- Correlates performance with:
  - Time of day
  - Day of week
  - Session length
  - Previous sleep (if tracked)
- Suggests optimal training times

**`DifficultyAdapter`**
- Shows current difficulty level per ability
- Explains why difficulty changed
- User override option with warning
- Historical difficulty progression

## 7. Gemini API Implementation

### 7.1 API Routes

#### `/api/cognitive/generate-workout`
**Input**:
```typescript
{
  userId: string;
  cognitiveProfile: CognitiveProfile;
  reviewQueue: ConsolidationTracker[];
  preferences: UserPreferences;
  sessionType: 'daily' | 'focused' | 'review';
}
```

**Processing**:
1. Analyze cognitive profile for priority areas
2. Check spaced repetition queue
3. Calculate optimal cognitive load distribution
4. Generate exercise sequence with rationale

**Output**:
```typescript
{
  exercises: CognitiveExercise[];
  rationale: string; // explanation of workout design
  expectedOutcomes: string[];
  estimatedDuration: number;
  cognitiveLoadProfile: number[]; // load per exercise
}
```

#### `/api/cognitive/generate-exercise`
**Input**:
```typescript
{
  ability: CognitiveAbility;
  difficulty: number;
  specificSkills?: string[];
  userProfile: CognitiveProfile;
  excludeTypes?: string[]; // avoid repetitive formats
}
```

**Output**: `CognitiveExercise` object

#### `/api/cognitive/analyze-performance`
**Input**:
```typescript
{
  userId: string;
  sessions: CognitiveSession[];
  timeframe: { start: Date; end: Date };
}
```

**Output**:
```typescript
{
  profileChanges: { [ability: string]: number };
  insights: string[]; // narrative insights
  transferEffects: TransferEffect[];
  recommendations: {
    priorities: string[];
    strategies: string[];
    expectedGrowth: string;
  };
  scientificBasis: string[]; // relevant research
}
```

#### `/api/cognitive/optimize-schedule`
**Input**: `ConsolidationTracker[]`

**Processing**:
- Analyze forgetting curves
- Calculate optimal intervals
- Balance review load
- Consider cognitive load timing

**Output**:
```typescript
{
  todayReviews: ConsolidationTracker[];
  upcomingWeek: { date: Date; count: number }[];
  optimizationChanges: string[]; // what was adjusted
}
```

### 7.2 Prompt Engineering for Cognitive Accuracy

#### System Prompt for All Cognitive Exercises
```
You are a cognitive psychology expert and educational psychologist specializing in evidence-based brain training. Your exercises are grounded in established research on:
- CHC theory of cognitive abilities
- Working memory models
- Information processing theory
- Memory consolidation
- Executive function frameworks

Guidelines:
1. All exercises must target specific, measurable cognitive abilities
2. Difficulty must be calibrated to maintain 70-80% success rate
3. Novel content - avoid pattern memorization
4. Include clear cognitive rationale
5. Cite relevant psychological concepts
6. Ensure exercises test cognition, not just knowledge
7. Provide educational value beyond the challenge

Avoid:
- Trick questions or ambiguous problems
- Cultural bias or obscure knowledge requirements
- Pure guessing scenarios
- Exercises solvable without target cognitive process
```

#### Example: Generating Working Memory Exercise
```
Generate a visual working memory N-back task at difficulty level 6/10.

Cognitive target: Visuospatial sketchpad + central executive
User context: Current span = 5 items, accuracy = 75%, training for 2 weeks

Requirements:
- N = 3 (match current item to item 3 positions back)
- Stimulus: abstract shapes with 2 varying features (shape + color)
- Sequence length: 20 trials
- Target frequency: 35% (7 matches)
- Lure types: 1-back (20%), 2-back (15%)

Difficulty calibration:
- Level 6 should challenge but not overwhelm
- Include strategic distractors
- Timing: 2 seconds per stimulus, 1 second ISI

Output as JSON:
{
  "instructions": "Clear, concise explanation",
  "trials": [
    {"stimulus": {"shape": "circle", "color": "blue"}, "isTarget": false, "position": 0},
    ...
  ],
  "scoring": {
    "hitWeight": 1,
    "falseAlarmPenalty": -0.5,
    "dprime_target": 2.0
  },
  "cognitive_explanation": "Why this tests working memory",
  "adaptation_guidance": "When to increase N or stimulus complexity"
}
```

## 8. Non-Functional Requirements

### 8.1 Performance
- Exercise generation: < 2 seconds
- Real-time cognitive load calculation: < 100ms
- Smooth animations for neuroplasticity visualizations: 60fps
- Offline capability for core exercises

### 8.2 Scientific Validity
- Regular updates based on latest cognitive science research
- Transparent methodology (available in app)
- Calibration against established cognitive assessments
- Peer review of exercise designs (future)

### 8.3 Accessibility
- WCAG 2.1 AA compliance
- Accommodations for cognitive disabilities
- Adjustable time limits
- Multiple input modalities
- Screen reader optimization for descriptions

### 8.4 Privacy & Ethics
- No selling of cognitive data
- Transparent data usage
- Opt-in for research participation
- Age-appropriate content and expectations
- Ethical cognitive enhancement messaging

## 9. Development Phases

### Phase 1: Foundation (Weeks 1-2)
- Implement 4 core abilities: Fluid Intelligence, Working Memory, Processing Speed, Attention
- Basic cognitive profile assessment
- Simple spaced repetition
- Essential UI with ability dashboard

### Phase 2: Depth (Weeks 3-4)
- Add remaining 4 <function_results>OK</function_results>
I've completely rewritten the requirements document with deep integration of cognitive psychology and neuroscience! Here are the major enhancements:
Key Scientific Improvements:
1. Cognitive Framework Based on Established Psychology:

Grounded in CHC (Cattell-Horn-Carroll) theory - the gold standard in cognitive ability research
8 validated cognitive domains: Fluid Intelligence, Crystallized Intelligence, Working Memory, Long-term Memory, Processing Speed, Executive Functions, Attention, and Visual-Spatial Processing
Each domain has specific sub-abilities and measurable metrics

2. Information Retention Science:

Spaced Repetition: Implements SM-2 algorithm with adaptive scheduling
Forgetting Curves: Tracks and visualizes memory decay
Encoding Strategies: Deep processing, elaborative rehearsal, multimodal encoding
Consolidation: Sleep-dependent memory integration, optimal review timing
Retrieval Practice: Testing effect, desirable difficulties concept

3. Reasoning Abilities:

Deductive reasoning (syllogistic, conditional logic)
Inductive reasoning (pattern recognition, probabilistic thinking)
Analogical reasoning (relational mapping)
Critical thinking (argument analysis, bias detection)

4. Advanced Features:

Neuroplasticity tracking - shows actual brain adaptation evidence
Transfer effect detection - identifies when improving one ability helps another
Cognitive load management - prevents mental overload
Optimal training conditions - learns your best time of day
Memory palace - dedicated spaced repetition center

5. Scientifically-Grounded AI Integration:

Prompts designed to generate exercises that test actual cognitive processes
Maintains 70-80% success rate (optimal learning zone)
Adaptive difficulty based on performance
Cites psychological research and concepts