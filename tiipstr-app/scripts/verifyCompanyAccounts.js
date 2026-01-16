import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

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

// List of all company usernames
const companyUsernames = [
  // Major companies
  'delta_airlines', 'united_airlines', 'amazon_retail', 'walmart_stores', 'target_stores',
  'verizon_wireless', 'comcast_xfinity', 'att_wireless', 'mcdonalds_corp', 'chipotle_mexican',

  // Small businesses - restaurants
  'marios_pizza', 'sunrise_cafe',

  // Contractors
  'joes_plumbing', 'ace_electric', 'cool_breeze_hvac', 'reliable_roofing',

  // Retail/Services
  'petals_flowers', 'quickwash_laundry',

  // Automotive
  'mikes_auto_repair',

  // Healthcare
  'careplus_dental',

  // New additions
  'jiffy_lube'
];

async function verifyAndFixCompanyAccounts() {
  console.log('Checking all company accounts...\n');

  const usersRef = collection(db, 'users');
  const querySnapshot = await getDocs(usersRef);

  let fixedCount = 0;
  let alreadyCorrect = 0;

  for (const userDoc of querySnapshot.docs) {
    const userData = userDoc.data();
    const username = userData.username;

    // Check if this username is in our company list
    if (companyUsernames.includes(username)) {
      if (userData.accountType !== 'company') {
        console.log(`⚠️  Fixing ${username} - was "${userData.accountType || 'undefined'}"`);
        await updateDoc(doc(db, 'users', userDoc.id), {
          accountType: 'company'
        });
        fixedCount++;
      } else {
        console.log(`✅ ${username} - already correct`);
        alreadyCorrect++;
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   - ${alreadyCorrect} companies already had accountType='company'`);
  console.log(`   - ${fixedCount} companies were fixed`);
  console.log(`   - Total companies: ${alreadyCorrect + fixedCount}`);
}

verifyAndFixCompanyAccounts()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
