import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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
const auth = getAuth(app);

async function fixJiffyLubePost() {
  console.log('Step 1: Creating Jiffy Lube company account...\n');

  // Create Jiffy Lube company account
  let jiffyLubeUserId;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      'jiffylube@company.test',
      'Company123!'
    );
    jiffyLubeUserId = userCredential.user.uid;
    
    await setDoc(doc(db, 'users', jiffyLubeUserId), {
      email: 'jiffylube@company.test',
      username: 'jiffy_lube',
      displayName: 'Jiffy Lube',
      bio: 'America\'s trusted oil change and automotive maintenance service. Quick, reliable service you can count on.',
      profilePicUrl: '',
      accountType: 'company',
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      createdAt: new Date()
    });

    console.log('✅ Created Jiffy Lube company account');
    console.log(`   User ID: ${jiffyLubeUserId}\n`);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('⚠️  Jiffy Lube account already exists, fetching existing account...');
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', 'jiffy_lube'));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        jiffyLubeUserId = querySnapshot.docs[0].id;
        console.log(`   User ID: ${jiffyLubeUserId}\n`);
      }
    } else {
      throw error;
    }
  }

  console.log('Step 2: Finding posts mentioning Jiffy Lube...\n');

  // Find posts that mention "jiffy" or "Jiffy Lube"
  const postsRef = collection(db, 'posts');
  const allPostsQuery = query(postsRef);
  const allPostsSnapshot = await getDocs(allPostsQuery);

  let updatedCount = 0;

  for (const postDoc of allPostsSnapshot.docs) {
    const postData = postDoc.data();
    const content = postData.content || '';
    
    // Check if post mentions Jiffy Lube but doesn't have taggedCompany
    if ((content.toLowerCase().includes('jiffy') || content.toLowerCase().includes('jiffylube')) && !postData.taggedCompany) {
      console.log(`Found post by ${postData.username}: "${content.substring(0, 80)}..."`);
      
      // Update post to tag Jiffy Lube
      await updateDoc(doc(db, 'posts', postDoc.id), {
        taggedCompany: {
          userId: jiffyLubeUserId,
          username: 'jiffy_lube',
          displayName: 'Jiffy Lube'
        }
      });

      updatedCount++;
      console.log(`✅ Updated post to tag @jiffy_lube\n`);
    }
  }

  console.log(`\n✅ Updated ${updatedCount} posts to tag Jiffy Lube`);
}

fixJiffyLubePost()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
