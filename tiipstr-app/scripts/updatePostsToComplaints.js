const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc, query, where } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyB5eqTms8VvkD1JTsR_zFmu5ZdTk-WOW0U",
  authDomain: "tiipstr-app.firebaseapp.com",
  projectId: "tiipstr-app",
  storageBucket: "tiipstr-app.firebasestorage.app",
  messagingSenderId: "363973819408",
  appId: "1:363973819408:web:08c204f729449a4de29e95",
  measurementId: "G-MPCH8JR03Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Service complaints with relevant images
const complaints = [
  // Restaurant complaints
  { content: 'Worst service at Olive Garden on 5th Ave. Waited 45 mins for cold pasta. Manager didn\'t even apologize! 1/5', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&q=80' },
  { content: 'Starbucks on Main Street gave me a latte with SALT instead of sugar. How does that even happen?! 0/5', imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop&q=80' },
  { content: 'Pizza Hut delivery took 2 HOURS and arrived stone cold. Called to complain, they hung up on me. Never again! 1/5', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop&q=80' },
  { content: 'Chipotle charged me for extra guac that they never added. This is the 3rd time this month! 2/5', imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=600&fit=crop&q=80' },
  { content: 'Dennys had a ROACH crawling on the table. Absolutely disgusting! Health dept should shut them down. 0/5', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80' },

  // Retail complaints
  { content: 'Target on Broadway refused to honor their own sale price. Manager was rude and dismissive. 1/5', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80' },
  { content: 'Best Buy sold me a "new" laptop that was clearly a return. Box was already opened and had fingerprints all over it. 2/5', imageUrl: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop&q=80' },
  { content: 'Walmart self-checkout accused me of stealing when I scanned everything. Security was so embarrassing! 1/5', imageUrl: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=800&h=600&fit=crop&q=80' },
  { content: 'Nike store had zero customer service. Asked for help 3 times, everyone ignored me. 1/5', imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop&q=80' },

  // Service provider complaints
  { content: 'Comcast internet has been down for 3 days. Customer service keeps transferring me. This is ridiculous! 0/5', imageUrl: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&h=600&fit=crop&q=80' },
  { content: 'Verizon charged me $89 for a "service fee" that was never explained. Total scam! 1/5', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&q=80' },
  { content: 'AT&T promised 5G speeds but I barely get 3G. Constant buffering on every video. 2/5', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&q=80' },

  // Hotel/Travel complaints
  { content: 'Hilton Hotel room was FILTHY. Hair in the sheets, bathroom not cleaned. Paid $300/night for this?! 1/5', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80' },
  { content: 'United Airlines delayed my flight 6 hours with no explanation or compensation. Missed my connection! 0/5', imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop&q=80' },
  { content: 'Hertz rental car had a FLAT TIRE and they still charged me full price. Absolute joke of a company. 1/5', imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop&q=80' },

  // Salon/Spa complaints
  { content: 'Supercuts gave me the WORST haircut of my life. Asked for a trim, they butchered it. I look ridiculous! 0/5', imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop&q=80' },
  { content: 'Massage Envy masseuse fell asleep during my session! I could hear her snoring. What a waste of money. 1/5', imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80' },

  // Auto service complaints
  { content: 'Jiffy Lube said I needed $800 in repairs that my mechanic said were completely unnecessary. SCAM ARTISTS! 0/5', imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop&q=80' },
  { content: 'Pep Boys "fixed" my brakes but they started squeaking the next day. Took it back 3 times, still not fixed. 1/5', imageUrl: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop&q=80' },

  // Gym complaints
  { content: 'Planet Fitness lunk alarm went off while I was doing normal deadlifts. So embarrassing and unnecessary! 2/5', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&q=80' },
  { content: 'LA Fitness keeps charging me even after I cancelled my membership 2 months ago. Called 5 times! 0/5', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80' },

  // Entertainment complaints
  { content: 'AMC Theater was disgusting. Sticky floors, broken seats, and they ran out of popcorn at 7pm on a Saturday! 2/5', imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop&q=80' },
  { content: 'Six Flags ride broke down while we were on it. Stuck for 45 mins in the heat. No refund offered. 1/5', imageUrl: 'https://images.unsplash.com/photo-1594821891014-1f7d8da8f2e6?w=800&h=600&fit=crop&q=80' },

  // Delivery service complaints
  { content: 'DoorDash driver ate half my fries! Could see the bag was opened. Support refused to refund. 1/5', imageUrl: 'https://images.unsplash.com/photo-1585759071429-ee4e4a3e3ec3?w=800&h=600&fit=crop&q=80' },
  { content: 'UberEats cancelled my order AFTER I waited 40 minutes. Now I have to start over and I\'m starving! 0/5', imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop&q=80' },
  { content: 'Amazon Fresh delivered someone else\'s groceries. Half my items missing and got random stuff I didn\'t order. 2/5', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop&q=80' },

  // Bank/Financial complaints
  { content: 'Chase Bank charged me $35 overdraft fee for being $2 over. Called to waive it, they refused. Highway robbery! 1/5', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80' },
  { content: 'Bank of America ATM ate my card and it took them 2 WEEKS to mail me a new one. Terrible service! 1/5', imageUrl: 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?w=800&h=600&fit=crop&q=80' },

  // Healthcare complaints
  { content: 'CVS Pharmacy gave me the WRONG prescription! Could have been dangerous. How is this acceptable?! 0/5', imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=600&fit=crop&q=80' },
  { content: 'Dental office charged me for a cleaning that wasn\'t covered, but they said it was. Now fighting with insurance. 2/5', imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=600&fit=crop&q=80' },

  // Tech service complaints
  { content: 'Apple Store "Genius" was completely unhelpful. Acted annoyed I was there and gave me wrong advice. 1/5', imageUrl: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&h=600&fit=crop&q=80' },
  { content: 'Geek Squad charged me $150 to "fix" my laptop and it still has the same problem. Total ripoff! 1/5', imageUrl: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop&q=80' },
];

async function updatePostsToComplaints() {
  console.log('🔧 Updating posts to service complaints...\n');

  const postsSnapshot = await getDocs(collection(db, 'posts'));
  const posts = [];

  postsSnapshot.forEach(doc => {
    posts.push({ id: doc.id, ...doc.data() });
  });

  console.log(`Found ${posts.length} total posts\n`);

  let updatedCount = 0;
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const complaint = complaints[i % complaints.length]; // Cycle through complaints if we have more posts

    await updateDoc(doc(db, 'posts', post.id), {
      content: complaint.content,
      imageUrl: complaint.imageUrl,
    });

    updatedCount++;
    if (updatedCount % 20 === 0) {
      console.log(`  Updated ${updatedCount}/${posts.length} posts...`);
    }
  }

  console.log(`\n✅ Updated all ${updatedCount} posts to service complaints with images!`);
}

updatePostsToComplaints()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Script error:', error);
    process.exit(1);
  });
