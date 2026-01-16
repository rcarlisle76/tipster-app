import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

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

async function checkCoolBreezeData() {
  console.log('Checking Cool Breeze HVAC data...\n');

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', 'cool_breeze_hvac'));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log('❌ Cool Breeze HVAC account not found!');
  } else {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('✅ Found Cool Breeze HVAC account:');
      console.log(`   User ID: ${doc.id}`);
      console.log(`   Username: ${data.username}`);
      console.log(`   Display Name: ${data.displayName}`);
      console.log(`   Account Type: ${data.accountType}`);
      console.log(`   Bio: ${data.bio}`);
    });
  }
}

checkCoolBreezeData()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
