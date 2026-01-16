import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
const auth = getAuth(app);
const db = getFirestore(app);

const companyAccounts = [
  // Major Airlines
  {
    username: 'delta_airlines',
    email: 'delta@company.test',
    displayName: 'Delta Airlines',
    bio: 'Official Delta Airlines account. We connect the world through safe and reliable air travel.'
  },
  {
    username: 'united_airlines',
    email: 'united@company.test',
    displayName: 'United Airlines',
    bio: 'Fly the Friendly Skies. Connecting people and uniting the world.'
  },

  // Major Retail
  {
    username: 'amazon_retail',
    email: 'amazon@company.test',
    displayName: 'Amazon',
    bio: 'Earth\'s most customer-centric company. We\'re here to help with your orders and service.'
  },
  {
    username: 'walmart_stores',
    email: 'walmart@company.test',
    displayName: 'Walmart',
    bio: 'Save Money. Live Better. Your trusted retail partner since 1962.'
  },
  {
    username: 'target_stores',
    email: 'target@company.test',
    displayName: 'Target',
    bio: 'Expect More. Pay Less. Your one-stop shop for everything you need.'
  },

  // Telecom/Internet
  {
    username: 'verizon_wireless',
    email: 'verizon@company.test',
    displayName: 'Verizon Wireless',
    bio: 'America\'s most reliable network. Connecting you to what matters most.'
  },
  {
    username: 'comcast_xfinity',
    email: 'comcast@company.test',
    displayName: 'Comcast Xfinity',
    bio: 'Xfinity by Comcast. Delivering fast internet, TV, and phone services.'
  },
  {
    username: 'att_wireless',
    email: 'att@company.test',
    displayName: 'AT&T',
    bio: 'AT&T - connecting you to better. Mobile, internet, and entertainment services.'
  },

  // Restaurants/Food
  {
    username: 'mcdonalds_corp',
    email: 'mcdonalds@company.test',
    displayName: 'McDonald\'s',
    bio: 'I\'m lovin\' it! Serving delicious food and creating memorable experiences.'
  },
  {
    username: 'chipotle_mexican',
    email: 'chipotle@company.test',
    displayName: 'Chipotle Mexican Grill',
    bio: 'Food with Integrity. Real ingredients, real flavor, real good.'
  },

  // Small Business - Local Restaurants
  {
    username: 'marios_pizza',
    email: 'marios@company.test',
    displayName: 'Mario\'s Pizza & Pasta',
    bio: 'Family-owned Italian restaurant serving authentic pizza and pasta since 1985. Brooklyn, NY.'
  },
  {
    username: 'sunrise_cafe',
    email: 'sunrise@company.test',
    displayName: 'Sunrise Café',
    bio: 'Your neighborhood coffee shop. Fresh pastries, artisan coffee, and friendly service daily.'
  },

  // Contractors - Home Services
  {
    username: 'joes_plumbing',
    email: 'joesplumbing@company.test',
    displayName: 'Joe\'s Plumbing Services',
    bio: 'Licensed plumber serving the community for 15 years. 24/7 emergency service available.'
  },
  {
    username: 'ace_electric',
    email: 'aceelectric@company.test',
    displayName: 'Ace Electric Inc',
    bio: 'Certified electricians. Residential & commercial electrical services. Free estimates.'
  },
  {
    username: 'cool_breeze_hvac',
    email: 'coolbreeze@company.test',
    displayName: 'Cool Breeze HVAC',
    bio: 'Heating & air conditioning repair, installation, and maintenance. Family owned since 2005.'
  },
  {
    username: 'reliable_roofing',
    email: 'reliableroofing@company.test',
    displayName: 'Reliable Roofing Co',
    bio: 'Professional roofing contractor. Repairs, replacements, and inspections. Licensed & insured.'
  },

  // Small Business - Retail/Services
  {
    username: 'petals_flowers',
    email: 'petals@company.test',
    displayName: 'Petals Flower Shop',
    bio: 'Fresh flowers for every occasion. Same-day delivery available. Supporting local growers.'
  },
  {
    username: 'quickwash_laundry',
    email: 'quickwash@company.test',
    displayName: 'QuickWash Laundromat',
    bio: 'Clean, modern laundromat with wash & fold service. Open 7 days a week, 6am-10pm.'
  },

  // Automotive
  {
    username: 'mikes_auto_repair',
    email: 'mikesauto@company.test',
    displayName: 'Mike\'s Auto Repair',
    bio: 'Honest, reliable auto repair. ASE certified mechanics. All makes and models welcome.'
  },

  // Healthcare
  {
    username: 'careplus_dental',
    email: 'careplus@company.test',
    displayName: 'CarePlus Dental',
    bio: 'Comprehensive family dentistry. Accepting new patients. Most insurance plans accepted.'
  }
];

const password = 'Company123!';

async function createCompanyAccounts() {
  console.log('Starting to create company accounts...\n');

  for (const companyData of companyAccounts) {
    try {
      // Create authentication account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        companyData.email,
        password
      );

      const userId = userCredential.user.uid;
      console.log(`✅ Created auth account for ${companyData.username} (${userId})`);

      // Create company profile in Firestore
      await setDoc(doc(db, 'users', userId), {
        email: companyData.email,
        username: companyData.username,
        displayName: companyData.displayName,
        bio: companyData.bio,
        profilePicUrl: '',
        accountType: 'company', // THIS IS THE KEY FIELD
        followersCount: 0,
        followingCount: 0,
        postsCount: 0,
        createdAt: new Date()
      });

      console.log(`✅ Created company profile for ${companyData.displayName}\n`);

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`⚠️  Company ${companyData.username} already exists, skipping...\n`);
      } else {
        console.error(`❌ Error creating ${companyData.username}:`, error.message, '\n');
      }
    }
  }

  console.log('Finished creating company accounts!');
  console.log('\nCompany account credentials:');
  console.log('Password for all companies: Company123!');
  console.log('\nCompany usernames:');
  companyAccounts.forEach(company => {
    console.log(`  - ${company.username} (${company.displayName})`);
  });
}

createCompanyAccounts()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
