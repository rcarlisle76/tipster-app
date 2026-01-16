import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

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

// Profile photos from Unsplash - diverse, professional portraits
const userPhotos = [
  {
    userId: 'vrR8Nb08CePP34MosDxfFpCqjAl1',
    username: 'alice_tips',
    profilePicUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  },
  {
    userId: 'PTVquf9ruVUJBZF0Ua2bQCAKJik2',
    username: 'bob_traveler',
    profilePicUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    userId: 'riUHf3OZb3MhNFgwYe101XQchIF3',
    username: 'carol_foodie',
    profilePicUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
  },
  {
    userId: '14d8wtVRQOVrLfZ5FAcBJl3l4YN2',
    username: 'david_tech',
    profilePicUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
  },
  {
    userId: 'DVHIGeULkeV29ciNg7oqBFF46he2',
    username: 'emma_fitness',
    profilePicUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
  },
  {
    userId: '6JWVuciC89NPxYiIkwqCgsSDCZG3',
    username: 'frank_music',
    profilePicUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
  },
  {
    userId: 'yH5eWxWVYDZ1ks5ErVZTQT7pfVL2',
    username: 'grace_art',
    profilePicUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
  },
  {
    userId: 'blyIH05nnaRxVFQDrZzjEaGesKH3',
    username: 'henry_coffee',
    profilePicUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400'
  },
  {
    userId: 'fbmHvmbpbHd54vWi0xfdSg8Cpig2',
    username: 'iris_books',
    profilePicUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'
  },
  {
    userId: 'HxAqFrLqH4c8Zcav0rxgNj546LN2',
    username: 'jack_sports',
    profilePicUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400'
  }
];

async function addProfilePhotos() {
  console.log('Adding profile photos to all users...\n');

  for (const user of userPhotos) {
    try {
      const userRef = doc(db, 'users', user.userId);
      await updateDoc(userRef, {
        profilePicUrl: user.profilePicUrl
      });

      console.log(`✅ Updated ${user.username} with profile photo`);
    } catch (error) {
      console.error(`❌ Error updating ${user.username}:`, error.message);
    }
  }

  console.log('\n✅ All profile photos added!');
}

addProfilePhotos()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
