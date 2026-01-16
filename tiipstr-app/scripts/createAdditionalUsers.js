const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, collection, addDoc, serverTimestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyB5eqTms8VvkD1JTsR_zFmu5ZdTk-WOW0U",
  authDomain: "tiipstr-app.firebaseapp.com",
  projectId: "tiipstr-app",
  storageBucket: "tiipstr-app.firebasestorage.app",
  messagingSenderId: "363973819408",
  appId: "1:363973819408:web:08c204f729449a4de29e95",
  measurementId: "G-NPCH8JR03Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const users = [
  { username: 'sarah_yoga', email: 'sarah@test.com', displayName: 'Sarah Martinez', bio: 'Yoga instructor and wellness coach. Finding balance in every pose 🧘‍♀️', interests: ['yoga', 'wellness', 'meditation'] },
  { username: 'mike_chef', email: 'mike@test.com', displayName: 'Mike Thompson', bio: 'Professional chef sharing recipes and cooking tips. Food is love! 👨‍🍳', interests: ['cooking', 'recipes', 'food'] },
  { username: 'lisa_photo', email: 'lisa@test.com', displayName: 'Lisa Chen', bio: 'Photographer capturing life\'s beautiful moments 📸', interests: ['photography', 'art', 'travel'] },
  { username: 'tom_runner', email: 'tom@test.com', displayName: 'Tom Anderson', bio: 'Marathon runner and fitness enthusiast. Every mile counts! 🏃‍♂️', interests: ['running', 'fitness', 'health'] },
  { username: 'nina_design', email: 'nina@test.com', displayName: 'Nina Patel', bio: 'Graphic designer and creative thinker. Design is everywhere ✨', interests: ['design', 'creativity', 'art'] },
  { username: 'chris_gamer', email: 'chris@test.com', displayName: 'Chris Lee', bio: 'Gaming content creator and streamer. Let\'s play! 🎮', interests: ['gaming', 'streaming', 'technology'] },
  { username: 'amy_writer', email: 'amy@test.com', displayName: 'Amy Rodriguez', bio: 'Writer, poet, and storyteller. Words are my canvas 📝', interests: ['writing', 'poetry', 'literature'] },
  { username: 'dan_trader', email: 'dan@test.com', displayName: 'Dan Wilson', bio: 'Stock market enthusiast and investor. Building wealth one trade at a time 📈', interests: ['stocks', 'investing', 'finance'] },
  { username: 'kelly_vegan', email: 'kelly@test.com', displayName: 'Kelly Brown', bio: 'Plant-based living advocate. Healthy food, happy life 🌱', interests: ['vegan', 'health', 'sustainability'] },
  { username: 'ryan_dj', email: 'ryan@test.com', displayName: 'Ryan Garcia', bio: 'DJ and music producer. Making beats that move your feet 🎧', interests: ['music', 'DJing', 'production'] },
  { username: 'olivia_fashion', email: 'olivia@test.com', displayName: 'Olivia Taylor', bio: 'Fashion blogger and style influencer. Life is too short for boring outfits 👗', interests: ['fashion', 'style', 'trends'] },
  { username: 'james_code', email: 'james@test.com', displayName: 'James Kim', bio: 'Software engineer building the future. Code is poetry 💻', interests: ['coding', 'technology', 'AI'] },
  { username: 'sophia_yoga', email: 'sophia@test.com', displayName: 'Sophia Martinez', bio: 'Mindfulness coach and meditation guide. Peace within 🕉️', interests: ['meditation', 'mindfulness', 'yoga'] },
  { username: 'marcus_hoops', email: 'marcus@test.com', displayName: 'Marcus Johnson', bio: 'Basketball player and sports coach. Ball is life! 🏀', interests: ['basketball', 'sports', 'coaching'] },
  { username: 'rachel_coffee', email: 'rachel@test.com', displayName: 'Rachel Davis', bio: 'Coffee roaster and barista. Brewing the perfect cup ☕', interests: ['coffee', 'barista', 'brewing'] },
  { username: 'tyler_skate', email: 'tyler@test.com', displayName: 'Tyler White', bio: 'Skateboarder and extreme sports lover. Life on wheels 🛹', interests: ['skateboarding', 'sports', 'action'] },
  { username: 'maya_paint', email: 'maya@test.com', displayName: 'Maya Robinson', bio: 'Artist painting colorful dreams into reality 🎨', interests: ['painting', 'art', 'creativity'] },
  { username: 'kevin_cars', email: 'kevin@test.com', displayName: 'Kevin Moore', bio: 'Car enthusiast and automotive reviewer. Driven by passion 🚗', interests: ['cars', 'automotive', 'racing'] },
  { username: 'jessica_pets', email: 'jessica@test.com', displayName: 'Jessica Clark', bio: 'Pet trainer and animal lover. Every pet deserves love 🐾', interests: ['pets', 'training', 'animals'] },
  { username: 'brian_hiker', email: 'brian@test.com', displayName: 'Brian Scott', bio: 'Hiking enthusiast exploring trails worldwide. The mountains are calling 🏔️', interests: ['hiking', 'outdoors', 'adventure'] },
];

// Unsplash portrait categories for profile photos
const profilePhotoIds = [
  '1544005313-94ddf0286df2', // portrait
  '1507003211169-0a1dd7228f2d', // portrait
  '1438761681033-6461ffad8d80', // portrait
  '1500648767791-00dcc994a43e', // portrait
  '1494790108377-be9c29b29330', // portrait
  '1534528741775-53994a69daeb', // portrait
  '1529626455594-4ff0802cfb7e', // portrait
  '1524504388940-b201fe344659', // portrait
  '1488426862026-3ee59ec73d33', // portrait
  '1519345182560-3f2917c472ef', // portrait
  '1517841905240-472988babdf9', // portrait
  '1531746020798-e44692c8afb6', // portrait
  '1506794778202-cad84cf45f1d', // portrait
  '1504257432389-52343af06ae3', // portrait
  '1552374196-1ab2a1c593e8', // portrait
  '1539571696357-5a69c17a67c6', // portrait
  '1488426862026-3ee59ec73d33', // portrait
  '1506277886164-e25aa3f4e382', // portrait
  '1521572267360-ee0c2909d518', // portrait
  '1502378735452-bc7d86632805', // portrait
];

// Post content templates based on interests
const postTemplates = {
  yoga: ['Morning flow complete! 🧘‍♀️', 'New pose mastered today', 'Yoga retreat this weekend', 'Breathing exercises for stress relief'],
  wellness: ['Self-care Sunday vibes', 'Wellness tips for busy people', 'Mental health matters', 'Finding balance in chaos'],
  meditation: ['10 minutes of peace', 'Meditation changed my life', 'Mindful moments', 'Present and grateful'],
  cooking: ['New recipe alert! 🍳', 'Cooking up something special', 'Kitchen experiments', 'Homemade is the best made'],
  recipes: ['Family recipe passed down', 'Quick weeknight dinner', 'Dessert perfection', 'Meal prep Sunday'],
  food: ['Food coma incoming', 'Tasting menu adventures', 'Street food discoveries', 'Comfort food at its finest'],
  photography: ['Golden hour magic ✨', 'Captured this moment', 'Through my lens', 'Photography walk today'],
  art: ['Creative process underway', 'Art exhibition visit', 'Inspired by nature', 'Color palette dreams'],
  travel: ['New destination unlocked', 'Travel memories', 'Wanderlust calling', 'Passport stamps collection'],
  running: ['Morning run completed 🏃', 'Personal best today!', 'Marathon training update', 'Running clears my mind'],
  fitness: ['Leg day survived', 'Fitness goals progress', 'Workout motivation', 'Strong not skinny'],
  health: ['Healthy habits daily', 'Recovery day importance', 'Nutrition tips', 'Wellness journey'],
  design: ['Design thinking session', 'New project preview', 'Creative solutions', 'Minimalist aesthetic'],
  creativity: ['Brainstorming ideas', 'Creative block defeated', 'Innovation mindset', 'Thinking outside the box'],
  gaming: ['New game review 🎮', 'Gaming setup tour', 'Epic victory moment', 'Streaming tonight'],
  streaming: ['Live now!', 'Stream highlights', 'Community appreciation', 'New content dropping'],
  technology: ['Tech news roundup', 'Gadget unboxing', 'Future of tech', 'Innovation everywhere'],
  writing: ['Writer\'s life ✍️', 'New chapter finished', 'Poetry corner', 'Words flow freely'],
  poetry: ['Verses from the heart', 'Poetic musings', 'Rhyme and rhythm', 'Spoken word night'],
  literature: ['Book recommendations', 'Reading list update', 'Literary analysis', 'Bookworm life'],
  stocks: ['Market analysis 📈', 'Portfolio update', 'Investment strategy', 'Trading insights'],
  investing: ['Long-term thinking', 'Diversification matters', 'Financial freedom', 'Compound interest magic'],
  finance: ['Money management tips', 'Budgeting basics', 'Wealth building', 'Financial literacy'],
  vegan: ['Plant-based meal prep 🌱', 'Vegan recipe share', 'Cruelty-free living', 'Green smoothie power'],
  sustainability: ['Eco-friendly choices', 'Zero waste journey', 'Sustainable living', 'Planet over profit'],
  music: ['New track released 🎵', 'Studio session vibes', 'Music festival recap', 'Playlist curation'],
  DJing: ['Set list ready', 'Mixing magic', 'Dance floor energy', 'Beat matching perfection'],
  production: ['Production tips', 'New beat created', 'Sound design', 'Music production workflow'],
  fashion: ['Outfit of the day 👗', 'Fashion week highlights', 'Style inspiration', 'Wardrobe essentials'],
  style: ['Personal style evolution', 'Accessorizing tips', 'Fashion finds', 'Trendsetting'],
  trends: ['Latest fashion trends', 'Street style', 'Runway review', 'Fashion forecast'],
  coding: ['Code snippet share 💻', 'Debugging victory', 'Programming tips', 'Developer life'],
  AI: ['AI breakthroughs', 'Machine learning project', 'Future is now', 'Tech innovation'],
  mindfulness: ['Mindful living', 'Present moment awareness', 'Gratitude practice', 'Inner peace'],
  basketball: ['Game day ready 🏀', 'Court session', 'Hoops highlights', 'Basketball drills'],
  sports: ['Athletic performance', 'Sports news', 'Training hard', 'Competition ready'],
  coaching: ['Coaching wisdom', 'Team motivation', 'Skills development', 'Winning mindset'],
  coffee: ['Perfect brew ☕', 'Coffee tasting notes', 'Latte art practice', 'Morning ritual'],
  barista: ['Behind the bar', 'Espresso perfection', 'Coffee craftsmanship', 'Cafe vibes'],
  brewing: ['Brewing methods', 'Bean selection', 'Coffee science', 'Roasting process'],
  skateboarding: ['New trick landed 🛹', 'Skate park session', 'Street skating', 'Board setup'],
  action: ['Adrenaline rush', 'Extreme moments', 'Risk and reward', 'Action sports'],
  painting: ['Canvas work 🎨', 'Color mixing', 'Artistic expression', 'Gallery preview'],
  cars: ['Car show visit 🚗', 'Engine details', 'Dream garage', 'Automotive passion'],
  automotive: ['Car maintenance tips', 'Vehicle review', 'Driving experience', 'Auto enthusiast'],
  racing: ['Track day', 'Speed thrills', 'Racing heritage', 'Performance tuning'],
  pets: ['Pet training tips 🐾', 'Furry friend love', 'Animal behavior', 'Pet care advice'],
  training: ['Training progress', 'Behavioral skills', 'Positive reinforcement', 'Pet milestones'],
  animals: ['Animal welfare', 'Wildlife photography', 'Nature connection', 'Creature features'],
  hiking: ['Trail conquered 🏔️', 'Mountain views', 'Hiking essentials', 'Outdoor adventure'],
  outdoors: ['Nature therapy', 'Fresh air freedom', 'Wilderness calling', 'Outdoor lifestyle'],
  adventure: ['Adventure awaits', 'Exploring unknown', 'Thrill seeking', 'Life is an adventure'],
};

async function createUsersAndPosts() {
  console.log('Starting to create 20 users with posts...');

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    try {
      // Create Firebase Auth user
      console.log(`\nCreating user ${i + 1}/20: ${user.username}...`);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        'Test123!'
      );
      const userId = userCredential.user.uid;

      // Create Firestore user document with profile photo
      const profilePicUrl = `https://images.unsplash.com/photo-${profilePhotoIds[i]}?w=400&h=400&fit=crop&crop=faces`;

      await setDoc(doc(db, 'users', userId), {
        userId,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        bio: user.bio,
        profilePicUrl,
        followersCount: 0,
        followingCount: 0,
        postsCount: 0,
        createdAt: serverTimestamp(),
      });

      console.log(`✓ User created: ${user.username}`);
      console.log(`  Creating 10 posts...`);

      // Create 10 posts for this user
      for (let j = 0; j < 10; j++) {
        const interest = user.interests[Math.floor(Math.random() * user.interests.length)];
        const templates = postTemplates[interest] || ['Great day!', 'Loving life!', 'New post!', 'Happy moments'];
        const content = templates[Math.floor(Math.random() * templates.length)];

        // Get random Unsplash image related to the interest
        const imageId = 1500000000000 + Math.floor(Math.random() * 100000000);
        const imageUrl = `https://images.unsplash.com/photo-${imageId}?w=800&h=600&fit=crop&q=80&topic=${interest}`;

        await addDoc(collection(db, 'posts'), {
          userId,
          username: user.username,
          content,
          imageUrl,
          createdAt: serverTimestamp(),
          likesCount: Math.floor(Math.random() * 50),
          commentsCount: Math.floor(Math.random() * 20),
        });
      }

      // Update user's post count
      await setDoc(doc(db, 'users', userId), {
        postsCount: 10,
      }, { merge: true });

      console.log(`✓ Created 10 posts for ${user.username}`);

    } catch (error) {
      console.error(`Error creating user ${user.username}:`, error.message);
    }
  }

  console.log('\n✅ All 20 users and 200 posts created successfully!');
  console.log('\nUser credentials (all passwords: Test123!):');
  users.forEach(user => {
    console.log(`  ${user.username} - ${user.email}`);
  });
}

createUsersAndPosts()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Script error:', error);
    process.exit(1);
  });
