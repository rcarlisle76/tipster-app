# Tiipstr

A mobile-first social platform for sharing honest service experiences and reviews. Users can post about their experiences with businesses, tag companies, and follow each other to stay updated on service quality.

## Features

- **User Authentication** - Firebase email/password authentication
- **Posts & Feed** - Create posts with photos, tag companies, and view personalized feeds
- **Company Mentions** - Tag companies with @mentions that link to their profiles
- **Verified Company Accounts** - Blue checkmarks for verified business accounts
- **Social Following** - Follow users and companies to build your network
- **Reviews** - Leave detailed reviews with ratings
- **Search** - Find users and companies by username
- **Profile Management** - Customize your profile with photos and bio

## Tech Stack

- **Frontend**: React Native / Expo
- **Backend**: Firebase
  - Authentication
  - Firestore Database
  - Cloud Storage
- **Navigation**: React Navigation v7
- **State Management**: React Context API

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Firebase account

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tiipstr-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Cloud Storage
   - Download your `serviceAccountKey.json` and place it in the project root (this file is gitignored)
   - Update Firebase config in `src/config/firebase.js` with your project credentials

4. Run the app:
```bash
npx expo start
```

## Running Scripts

The project includes several data seeding scripts in the `/scripts` directory:

```bash
# Create test users
node scripts/createTestUsers.js

# Create sample posts
node scripts/createSamplePosts.js

# Add company accounts
node scripts/createCompanyAccounts.js

# Create complaint posts
node scripts/createComplaintPosts.js

# Add profile photos
node scripts/addProfilePhotos.js
```

## Project Structure

```
tiipstr-app/
├── src/
│   ├── components/      # Reusable UI components
│   ├── config/          # Firebase configuration
│   ├── constants/       # Theme constants
│   ├── contexts/        # React contexts (Auth)
│   ├── hooks/           # Custom React hooks
│   ├── screens/         # App screens
│   ├── services/        # Firebase service functions
│   └── utils/           # Utility functions
├── scripts/             # Data seeding scripts
├── App.js              # App entry point
└── package.json        # Dependencies
```

## Database Schema

### Users Collection
- userId (document ID)
- email, username, displayName
- profilePicUrl, bio
- accountType ('personal' | 'company')
- followersCount, followingCount, postsCount
- createdAt

### Posts Collection
- postId (document ID)
- userId, username
- content, imageUrl
- taggedCompany { userId, username, displayName, accountType }
- likesCount, commentsCount
- createdAt

### Reviews Collection
- reviewId (document ID)
- userId, username
- placeName, rating, comment
- createdAt

### Subcollections
- users/{userId}/followers/{followerId}
- users/{userId}/following/{followedUserId}

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Contact

For questions or support, contact: support@tiipstr.com
