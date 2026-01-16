import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

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

// Photo URLs for complaint posts - relevant to complaints
const complaintPhotos = [
  'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800', // Delayed flight
  'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800', // Airport
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800', // Airplane wing
  'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800', // Waiting area
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', // Customer service
  'https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=800', // Complaints
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800', // Service desk
  'https://images.unsplash.com/photo-1573497161079-f3fd25cc6276?w=800', // Frustrated person
  'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800', // Bad service
  'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?w=800', // Phone call
  'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800', // WiFi router
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', // Broken cable
  'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800', // Computer error
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800', // Retail store
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', // Shopping
  'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800', // Fast food
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', // Pizza
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', // Coffee
  'https://images.unsplash.com/photo-1572392640988-ba48d1a74457?w=800', // Plumbing
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800', // Electrician
  'https://images.unsplash.com/photo-1581094794329-c8112d38e1e8?w=800', // HVAC
  'https://images.unsplash.com/photo-1632679260241-7f5ea1e1cd0a?w=800', // Roofing
  'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800', // Car repair
  'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800', // Dentist
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800', // Flowers
];

function getRandomPhoto() {
  return complaintPhotos[Math.floor(Math.random() * complaintPhotos.length)];
}

async function addPhotosToComplaints() {
  console.log('Fetching complaint posts...\n');

  const postsRef = collection(db, 'posts');
  const q = query(postsRef);
  const querySnapshot = await getDocs(q);

  let updatedCount = 0;

  for (const postDoc of querySnapshot.docs) {
    const postData = postDoc.data();

    // Only update posts with taggedCompany but no imageUrl
    if (postData.taggedCompany && !postData.imageUrl) {
      const photoUrl = getRandomPhoto();

      await updateDoc(doc(db, 'posts', postDoc.id), {
        imageUrl: photoUrl
      });

      updatedCount++;
      if (updatedCount % 10 === 0) {
        console.log(`✅ Updated ${updatedCount} complaint posts with photos...`);
      }
    }
  }

  console.log(`\n✅ Added photos to ${updatedCount} complaint posts!`);
}

addPhotosToComplaints()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
