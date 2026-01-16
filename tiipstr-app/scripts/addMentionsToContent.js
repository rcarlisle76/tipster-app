import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

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

async function addMentionsToContent() {
  try {
    console.log('Fetching all posts with tagged companies...');

    const postsSnapshot = await getDocs(collection(db, 'posts'));

    let updatedCount = 0;

    for (const postDoc of postsSnapshot.docs) {
      const post = postDoc.data();

      // Only update posts that have a taggedCompany and don't already have the @mention
      if (post.taggedCompany && post.taggedCompany.username) {
        const mention = `@${post.taggedCompany.username}`;

        // Check if the content already includes the mention
        if (!post.content.includes(mention)) {
          // Add the mention at the beginning of the content
          const updatedContent = `${mention} ${post.content}`;

          await updateDoc(doc(db, 'posts', postDoc.id), {
            content: updatedContent
          });

          updatedCount++;
          console.log(`Updated post ${postDoc.id}: Added ${mention}`);
        }
      }
    }

    console.log(`\n✅ Successfully updated ${updatedCount} posts with @mentions`);
    console.log(`Total posts checked: ${postsSnapshot.docs.length}`);

  } catch (error) {
    console.error('Error updating posts:', error);
  } finally {
    process.exit(0);
  }
}

addMentionsToContent();
