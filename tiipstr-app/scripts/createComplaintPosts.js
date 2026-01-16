import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, updateDoc, increment, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

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

// User IDs from existing users
const users = [
  { userId: 'vrR8Nb08CePP34MosDxfFpCqjAl1', username: 'alice_tips' },
  { userId: 'PTVquf9ruVUJBZF0Ua2bQCAKJik2', username: 'bob_traveler' },
  { userId: 'riUHf3OZb3MhNFgwYe101XQchIF3', username: 'carol_foodie' },
  { userId: '14d8wtVRQOVrLfZ5FAcBJl3l4YN2', username: 'david_tech' },
  { userId: 'DVHIGeULkeV29ciNg7oqBFF46he2', username: 'emma_fitness' },
  { userId: '6JWVuciC89NPxYiIkwqCgsSDCZG3', username: 'frank_music' },
  { userId: 'yH5eWxWVYDZ1ks5ErVZTQT7pfVL2', username: 'grace_art' },
  { userId: 'blyIH05nnaRxVFQDrZzjEaGesKH3', username: 'henry_coffee' },
  { userId: 'fbmHvmbpbHd54vWi0xfdSg8Cpig2', username: 'iris_books' },
  { userId: 'HxAqFrLqH4c8Zcav0rxgNj546LN2', username: 'jack_sports' }
];

// Company username to complaint mapping
const complaintsByCompany = {
  'delta_airlines': [
    'Flight delayed 4 hours with zero communication. Missed my connection and they refused to help with rebooking.',
    'Lost my luggage AGAIN. This is the third time this year. Customer service just says "we\'re looking for it".',
    'Charged me $200 for a bag that was 2lbs over. Then saw them let someone else slide with a heavier bag. Inconsistent policies!'
  ],
  'united_airlines': [
    'Overbooked flight and bumped me even though I checked in early. Ruined my vacation plans.',
    'Sat on tarmac for 2 hours, no water, no explanation. This is unacceptable treatment of passengers.',
    'Changed my flight time 3 times in one week. How am I supposed to plan anything?'
  ],
  'comcast_xfinity': [
    'Internet has been down for 3 days. Called 5 times, each time they say "technician will come tomorrow". Still waiting.',
    'Charging me for 200mbps but speed tests show I\'m getting 50mbps. This is fraud.',
    'Tried to cancel service. They made me wait on hold for 2 hours then tried to upsell me. Just cancel my service!',
    'Bill went up $40/month with no warning. Called to ask why and got transferred 6 times with no answer.'
  ],
  'verizon_wireless': [
    'Unlimited plan that throttles after 5GB? That\'s not unlimited! False advertising.',
    'Charged me $350 early termination fee when my contract was already up. They won\'t refund it.',
    'No cell service in my neighborhood despite their coverage map showing 5 bars. Useless.'
  ],
  'att_wireless': [
    'They added insurance to my plan without asking. Been paying $15/month for a year before I noticed.',
    'Promised a $200 rebate when I switched. 6 months later still haven\'t received it.',
    'Customer service is a joke. 45 minute wait times and they can never actually help.'
  ],
  'amazon_retail': [
    'Ordered "new" item, received clearly used product. Return process is a nightmare.',
    'Prime 2-day shipping took 8 days. What am I paying for?',
    'Third party seller sent fake product. Amazon won\'t refund me, says it\'s past return window.',
    'My package was marked "delivered" but never arrived. Driver probably stole it.'
  ],
  'walmart_stores': [
    'Half the items I ordered for pickup were "out of stock" when I got there. Why let me order them?',
    'Self-checkout accused me of not scanning an item I definitely scanned. Security was rude about it.',
    'Employee followed me around the store like I was going to steal something. Racial profiling much?'
  ],
  'target_stores': [
    'Price online was $30, in store it was $50. They refused to price match their own website!',
    'Bought defective item, receipt faded after 2 weeks. They won\'t accept return without receipt.',
    'Online order pickup took 45 minutes. I could have shopped the whole store faster.'
  ],
  'mcdonalds_corp': [
    'Ice cream machine broken AGAIN. This is like the 10th time this month. Just remove it from the menu!',
    'Ordered through app, waited 30 minutes, food was cold. Asked for fresh food and they refused.',
    'Found hair in my burger. When I complained, manager said "it happens" and offered no refund.'
  ],
  'chipotle_mexican': [
    'They were out of everything by 7pm. Fajitas, corn, guac, even tortillas. How?',
    'Ordered online, paid for extra chicken. Got half a scoop of chicken total. Highway robbery.',
    'Food safety violation: employee didn\'t change gloves after handling phone and cash.'
  ],
  'marios_pizza': [
    'Waited 2 hours for delivery. Pizza arrived cold and wrong toppings. Called to complain, owner was rude.',
    'Found a piece of plastic in my pasta. This is dangerous!',
    'They added a 20% service fee that wasn\'t mentioned anywhere. Shady business practices.'
  ],
  'sunrise_cafe': [
    'Ordered almond milk latte, pretty sure they gave me regular milk. I\'m lactose intolerant!',
    'Waited 25 minutes for a simple coffee. Only 2 people in line. What takes so long?',
    'Pastries are stale. Clearly not fresh. Date on the muffin was from 3 days ago.'
  ],
  'joes_plumbing': [
    'Charged me $500 to fix a leak. Leak came back a week later. Won\'t return my calls now.',
    'Showed up 3 hours late, no call to let me know. Completely unprofessional.',
    'Did shoddy work. Had to hire another plumber to fix what he messed up. Total rip-off.'
  ],
  'ace_electric': [
    'Quoted $200 for outlet installation. Final bill was $600 with random "fees". Total scam.',
    'Electrician left wires exposed. Failed inspection. Now I have to pay someone else to fix it.',
    'No showed for appointment. Didn\'t call or text. Wasted my whole day waiting.'
  ],
  'cool_breeze_hvac': [
    'AC still doesn\'t work after they "fixed" it. Charged me $400. Want another $300 to come back.',
    'Told me I needed a whole new system for $8000. Got second opinion - just needed a $50 part.',
    'Left a mess in my house. Didn\'t clean up after themselves at all.'
  ],
  'reliable_roofing': [
    'Roof is leaking worse than before they "fixed" it. They won\'t come back without more money.',
    'Crew showed up drunk. I sent them away and they still charged me for the day!',
    'Damaged my gutters and refused to fix them. Had to threaten legal action.'
  ],
  'mikes_auto_repair': [
    'Charged me $1200 for brake job. Brakes are squeaking worse than before!',
    'They said I needed new transmission. Took it elsewhere - transmission is fine. They lie to upsell.',
    'Lost my car keys and charged ME $200 for a replacement. This is their fault!'
  ],
  'careplus_dental': [
    'Billing is a nightmare. They filed wrong insurance code. Now I owe $800 out of pocket.',
    'Dentist was 45 minutes late. No apology. Then rushed through my cleaning.',
    'They did work I didn\'t approve. Now fighting with my insurance over unauthorized charges.'
  ],
  'petals_flowers': [
    'Ordered flowers for anniversary. They delivered wilted, dying flowers. Ruined the surprise.',
    'Wrong arrangement delivered. Called to complain and they said "nothing we can do now".',
    'Same day delivery took 3 days. By then the occasion was over. Got no refund.'
  ],
  'quickwash_laundry': [
    'Dryer ate my favorite sweater. Manager says not their problem. There goes $80.',
    'Place is filthy. Washers have mold in them. Health department should shut this down.',
    'Charged me for "extra large" load when I used regular washer. They lie to overcharge.'
  ]
};

// Helper to get random user
function getRandomUser() {
  return users[Math.floor(Math.random() * users.length)];
}

// Helper to get random complaints for a company
function getRandomComplaints(companyUsername, count) {
  const complaints = complaintsByCompany[companyUsername];
  if (!complaints || complaints.length === 0) return [];

  // Shuffle and take count
  const shuffled = [...complaints].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, complaints.length));
}

async function createComplaintPosts() {
  console.log('Fetching company accounts...\n');

  // Get all company accounts
  const companiesRef = collection(db, 'users');
  const q = query(companiesRef, where('accountType', '==', 'company'));
  const querySnapshot = await getDocs(q);

  const companies = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    companies.push({
      userId: doc.id,
      username: data.username,
      displayName: data.displayName
    });
  });

  console.log(`Found ${companies.length} company accounts\n`);
  console.log('Creating complaint posts...\n');

  let totalPosts = 0;

  for (const company of companies) {
    // Get 2-3 random complaints for this company
    const complaints = getRandomComplaints(company.username, 3);

    for (const complaint of complaints) {
      const user = getRandomUser();

      try {
        // Create post with tagged company
        const postsRef = collection(db, 'posts');
        const newPost = await addDoc(postsRef, {
          userId: user.userId,
          username: user.username,
          content: complaint,
          imageUrl: '',
          taggedCompany: {
            userId: company.userId,
            username: company.username,
            displayName: company.displayName
          },
          createdAt: serverTimestamp(),
          likesCount: Math.floor(Math.random() * 100),
          commentsCount: Math.floor(Math.random() * 30)
        });

        // Increment user's posts count
        const userRef = doc(db, 'users', user.userId);
        await updateDoc(userRef, {
          postsCount: increment(1)
        });

        totalPosts++;
        console.log(`✅ ${user.username} complained about ${company.displayName}`);
        console.log(`   "${complaint.substring(0, 80)}..."\n`);

      } catch (error) {
        console.error(`❌ Error creating complaint:`, error.message);
      }
    }
  }

  console.log(`\n✅ Created ${totalPosts} complaint posts!`);
}

createComplaintPosts()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
