import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';

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
const db = getFirestore(app);

const userPosts = [
  {
    userId: 'vrR8Nb08CePP34MosDxfFpCqjAl1',
    username: 'alice_tips',
    posts: [
      { content: 'Best coffee spot in SF: Blue Bottle on Mint Plaza. Get the New Orleans iced coffee!', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800' },
      { content: 'Pro tip: Always negotiate your salary. I got a 15% increase just by asking!', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800' },
      { content: 'Morning routine hack: Prepare your outfit the night before. Saves 20 mins every morning!', imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800' },
      { content: 'Best productivity app: Notion. Changed my entire workflow!', imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800' },
      { content: 'Life hack: Use a standing desk. Your back will thank you!', imageUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800' },
      { content: 'Coffee brewing tip: Water temperature matters! 195-205°F is perfect.', imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800' },
      { content: 'Best time to send emails: Tuesday at 10am. Highest response rate!', imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800' },
      { content: 'Networking tip: Follow up within 24 hours. Makes a huge difference!', imageUrl: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800' },
      { content: 'Best co-working space in SF: WeWork Embarcadero. Amazing views!', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' },
      { content: 'Career advice: Take that scary opportunity. I did and never looked back!', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800' }
    ]
  },
  {
    userId: 'PTVquf9ruVUJBZF0Ua2bQCAKJik2',
    username: 'bob_traveler',
    posts: [
      { content: 'Hidden gem in Paris: Le Marais district. Skip the Eiffel Tower crowds!', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800' },
      { content: 'Travel hack: Book flights on Tuesday afternoons for the best deals!', imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800' },
      { content: 'Pack light tip: Roll your clothes instead of folding. Saves so much space!', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800' },
      { content: 'Best hostel in Barcelona: Sant Jordi Sagrada Familia. Amazing rooftop!', imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800' },
      { content: 'Travel insurance is worth it. Saved me $3000 when I got sick in Thailand.', imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800' },
      { content: 'Pro tip: Learn basic phrases in local language. Doors open everywhere!', imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800' },
      { content: 'Best sunrise view: Angkor Wat, Cambodia. Worth the 4am wake up!', imageUrl: 'https://images.unsplash.com/photo-1545728452-9f38c0b8dc6b?w=800' },
      { content: 'Budget travel: Use local buses instead of tours. Save 70% easily!', imageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800' },
      { content: 'Best travel app: Rome2Rio. Shows every possible route!', imageUrl: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800' },
      { content: 'Safety tip: Always have offline maps downloaded. Saved me countless times!', imageUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800' }
    ]
  },
  {
    userId: 'riUHf3OZb3MhNFgwYe101XQchIF3',
    username: 'carol_foodie',
    posts: [
      { content: 'The secret to perfect pasta: Save 1 cup of pasta water before draining!', imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800' },
      { content: 'Best tacos in LA: Leo\'s Tacos on La Brea. Order the al pastor!', imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800' },
      { content: 'Cast iron pan tip: Never use soap! Just salt and oil.', imageUrl: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800' },
      { content: 'Homemade pizza hack: Use a pizza stone. Game changer!', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800' },
      { content: 'Best farmers market: Santa Monica on Wednesdays. Fresh everything!', imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800' },
      { content: 'Kitchen tool you need: Instant-read thermometer. Perfect meat every time!', imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800' },
      { content: 'Meal prep Sunday saves me 10 hours a week. Total game changer!', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800' },
      { content: 'Best sushi in NYC: Nakazawa. Worth every penny!', imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800' },
      { content: 'Baking tip: Room temperature ingredients mix better. Trust me!', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800' },
      { content: 'Best cookbook: Salt, Fat, Acid, Heat. Changed how I cook!', imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800' }
    ]
  },
  {
    userId: '14d8wtVRQOVrLfZ5FAcBJl3l4YN2',
    username: 'david_tech',
    posts: [
      { content: 'Learning to code? Start with JavaScript, not Python. More job opportunities!', imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800' },
      { content: 'Use dark mode everywhere. Your eyes will thank you after years of coding!', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800' },
      { content: 'Best coding monitor: LG UltraWide 34". Never going back to dual monitors!', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800' },
      { content: 'Git tip: Commit often with clear messages. Future you will be grateful!', imageUrl: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800' },
      { content: 'VSCode extension you need: Prettier. Auto-format saves so much time!', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800' },
      { content: 'Best way to learn: Build projects, not just tutorials. Real experience!', imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800' },
      { content: 'Debugging tip: Rubber duck method actually works. Explain it out loud!', imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800' },
      { content: 'Mechanical keyboard worth it? Yes! Got Cherry MX Blues. Love typing now!', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800' },
      { content: 'Best free course: FreeCodeCamp. Got my first job after completing it!', imageUrl: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800' },
      { content: 'Pomodoro technique: 25 min work, 5 min break. Productivity doubled!', imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800' }
    ]
  },
  {
    userId: 'DVHIGeULkeV29ciNg7oqBFF46he2',
    username: 'emma_fitness',
    posts: [
      { content: 'Morning workout tip: Drink water BEFORE coffee. Hydration first!', imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800' },
      { content: 'Best gym in NYC: Equinox Dumbo. Amazing views while you sweat!', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800' },
      { content: 'Yoga mat recommendation: Manduka PRO. Expensive but lasts forever!', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800' },
      { content: 'Protein shake recipe: Banana, peanut butter, protein, almond milk. Perfect!', imageUrl: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=800' },
      { content: 'Running form tip: Land on midfoot, not heel. Prevents injuries!', imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800' },
      { content: 'Best fitness tracker: Whoop. Actual recovery insights, not just steps!', imageUrl: 'https://images.unsplash.com/photo-1575058752200-a9d6c0f41945?w=800' },
      { content: 'Rest days are just as important as workout days. Recovery is growth!', imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800' },
      { content: 'Meal timing: Eat protein within 30 mins post-workout. Maximizes gains!', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800' },
      { content: 'Best workout app: Nike Training Club. Free and amazing programs!', imageUrl: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=800' },
      { content: 'Stretching is not optional! 10 mins daily prevents so many injuries.', imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800' }
    ]
  },
  {
    userId: '6JWVuciC89NPxYiIkwqCgsSDCZG3',
    username: 'frank_music',
    posts: [
      { content: 'Want to learn guitar? Practice 15 mins daily beats 2 hours once a week!', imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800' },
      { content: 'Best headphones under $200: Sony WH-1000XM4. Worth every penny!', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' },
      { content: 'Music theory tip: Learn intervals first. Everything else builds on this!', imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800' },
      { content: 'Best concert venue: Red Rocks, Colorado. Acoustic perfection in nature!', imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800' },
      { content: 'Recording at home: Invest in room treatment before expensive mics!', imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800' },
      { content: 'Ear training app: Perfect Ear. 10 mins daily improved my playing so much!', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800' },
      { content: 'Best music streaming: Spotify Premium. Discover Weekly is gold!', imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800' },
      { content: 'Metronome practice changed everything. Start slow, build speed gradually!', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800' },
      { content: 'Best guitar strings: Elixir Nanoweb. Last 3x longer than regular strings!', imageUrl: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800' },
      { content: 'Music festival tip: Earplugs! Protect your hearing. Not worth the damage!', imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800' }
    ]
  },
  {
    userId: 'yH5eWxWVYDZ1ks5ErVZTQT7pfVL2',
    username: 'grace_art',
    posts: [
      { content: 'Art supply tip: Cheap brushes are fine for practice. Quality when ready!', imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800' },
      { content: 'Free art classes at MOMA every Friday evening. Check their website!', imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800' },
      { content: 'Watercolor tip: Let layers dry completely. Patience is everything!', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800' },
      { content: 'Best art book: Steal Like an Artist. Changed my creative process!', imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800' },
      { content: 'Drawing practice: Sketch something daily. Even just 5 minutes counts!', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800' },
      { content: 'Best affordable tablet: Wacom Intuos. Perfect for digital art beginners!', imageUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800' },
      { content: 'Color theory basics: Complementary colors make each other pop!', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' },
      { content: 'Art block solution: Change your medium. Try something completely new!', imageUrl: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800' },
      { content: 'Best art supplies store: Blick. Great prices and huge selection!', imageUrl: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=800' },
      { content: 'Instagram for artists: Post consistently. Quality over quantity!', imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800' }
    ]
  },
  {
    userId: 'blyIH05nnaRxVFQDrZzjEaGesKH3',
    username: 'henry_coffee',
    posts: [
      { content: 'Cold brew secret: Coarse grind + 24hr steep = smoothest coffee ever!', imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800' },
      { content: 'Skip Starbucks. Buy a French press for $20. Save thousands per year!', imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800' },
      { content: 'Coffee grinder matters more than machine! Burr grinder is essential!', imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800' },
      { content: 'Best coffee beans: Local roasters! Fresh roasted beats big brands always!', imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800' },
      { content: 'Espresso at home: Breville Bambino. Best budget espresso machine!', imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800' },
      { content: 'Water quality matters! Filtered water makes better coffee. Period.', imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800' },
      { content: 'Best coffee shop in Portland: Stumptown. The OG third-wave coffee!', imageUrl: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800' },
      { content: 'Latte art tip: Pour from higher up. Creates better microfoam!', imageUrl: 'https://images.unsplash.com/photo-1514481538271-cf9f99627ab4?w=800' },
      { content: 'Coffee subscription worth it? Yes! Try Atlas Coffee Club. World tour!', imageUrl: 'https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?w=800' },
      { content: 'Store beans properly: Airtight container, cool dark place. Stays fresh!', imageUrl: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800' }
    ]
  },
  {
    userId: 'fbmHvmbpbHd54vWi0xfdSg8Cpig2',
    username: 'iris_books',
    posts: [
      { content: 'Reading hack: Listen to audiobooks at 1.5x speed. Finish 50% more books!', imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800' },
      { content: 'Best bookstore: The Strand in NYC. 18 miles of books. Heaven!', imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800' },
      { content: 'Book club tip: Discuss as you read. Makes it so much more engaging!', imageUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800' },
      { content: 'E-reader recommendation: Kindle Paperwhite. Reads like real paper!', imageUrl: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800' },
      { content: 'Reading goal: 1 book per month minimum. Totally achievable!', imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800' },
      { content: 'Best reading app: Goodreads. Track books and get recommendations!', imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800' },
      { content: 'Library card = free books forever. Use your local library!', imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800' },
      { content: 'Genre to try: Historical fiction. Learn history while enjoying stories!', imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800' },
      { content: 'Bedtime reading: No screens 30 mins before sleep. Physical books only!', imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800' },
      { content: 'Best book podcast: What Should I Read Next. Amazing recommendations!', imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=800' }
    ]
  },
  {
    userId: 'HxAqFrLqH4c8Zcav0rxgNj546LN2',
    username: 'jack_sports',
    posts: [
      { content: 'Running tip: New shoes every 300-500 miles. Track it in your phone!', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' },
      { content: 'Best basketball court in Chicago: The Cage at Wicker Park. Legends play!', imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800' },
      { content: 'Sports betting tip: Never bet more than you can afford to lose. Period.', imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800' },
      { content: 'Basketball shoes: Nike LeBrons. Best ankle support I\'ve ever had!', imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800' },
      { content: 'Pickup game etiquette: Call your own fouls. Be honest. Respect!', imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800' },
      { content: 'Best sports bar: Buffalo Wild Wings. Wings + all the games!', imageUrl: 'https://images.unsplash.com/photo-1530550933826-0b6d38c1ef6a?w=800' },
      { content: 'Recovery tip: Foam rolling after every game. Prevents soreness!', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800' },
      { content: 'Fantasy sports: Research + gut feeling = winning combo!', imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800' },
      { content: 'Best sports documentary: The Last Dance. MJ is the GOAT!', imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800' },
      { content: 'Training tip: Consistency beats intensity. Show up every day!', imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800' }
    ]
  }
];

async function createPostsWithPhotos() {
  console.log('Creating posts with photos for all users...\n');

  let totalCreated = 0;

  for (const userData of userPosts) {
    console.log(`\n📝 Creating posts for ${userData.username}...`);

    for (const post of userData.posts) {
      try {
        // Create post
        const postsRef = collection(db, 'posts');
        await addDoc(postsRef, {
          userId: userData.userId,
          username: userData.username,
          content: post.content,
          imageUrl: post.imageUrl,
          createdAt: serverTimestamp(),
          likesCount: Math.floor(Math.random() * 100),
          commentsCount: Math.floor(Math.random() * 30)
        });

        // Increment user's posts count
        const userRef = doc(db, 'users', userData.userId);
        await updateDoc(userRef, {
          postsCount: increment(1)
        });

        totalCreated++;
        console.log(`  ✅ Created post ${totalCreated}: "${post.content.substring(0, 40)}..."`);
      } catch (error) {
        console.error(`  ❌ Error creating post:`, error.message);
      }
    }
  }

  console.log(`\n✅ Successfully created ${totalCreated} posts with photos!`);
  console.log(`📊 Total: ${userPosts.length} users × 10 posts each = ${totalCreated} posts`);
}

createPostsWithPhotos()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
