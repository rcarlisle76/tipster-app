import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';

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

async function addVariedTimestamps() {
  console.log('Fetching all posts...\n');

  const postsRef = collection(db, 'posts');
  const q = query(postsRef);
  const querySnapshot = await getDocs(q);

  console.log(`Found ${querySnapshot.size} total posts\n`);

  let complaintCount = 0;
  let photoPostCount = 0;
  const now = new Date();

  for (const postDoc of querySnapshot.docs) {
    const postData = postDoc.data();

    // Check if it's a complaint post (has taggedCompany)
    if (postData.taggedCompany) {
      complaintCount++;
      // Make complaint posts from the last 3 days (more recent)
      const hoursAgo = Math.floor(Math.random() * 72); // 0-72 hours
      const minutesAgo = Math.floor(Math.random() * 60);

      const timestamp = new Date(now);
      timestamp.setHours(timestamp.getHours() - hoursAgo);
      timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);

      await updateDoc(doc(db, 'posts', postDoc.id), {
        createdAt: timestamp
      });

      if (complaintCount % 10 === 0) {
        console.log(`✅ Updated ${complaintCount} complaint posts...`);
      }
    } else if (postData.imageUrl) {
      photoPostCount++;
      // Make photo posts from the last 14 days
      const daysAgo = Math.floor(Math.random() * 14);
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);

      const timestamp = new Date(now);
      timestamp.setDate(timestamp.getDate() - daysAgo);
      timestamp.setHours(timestamp.getHours() - hoursAgo);
      timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);

      await updateDoc(doc(db, 'posts', postDoc.id), {
        createdAt: timestamp
      });
    }
  }

  console.log(`\n✅ Updated timestamps:`);
  console.log(`   - ${complaintCount} complaint posts (last 3 days)`);
  console.log(`   - ${photoPostCount} photo posts (last 14 days)`);
}

addVariedTimestamps()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
