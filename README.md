# MovieMagic

MovieMagic is a web application that allows users to explore movies based on popularity, ratings, and genres. Users can also maintain a favorite list by adding movies they like and tracking their favorite list using a personalized account.

## Project Structure

- **client**: Contains the frontend code built using React.
- **server**: Contains the backend code built using Node.js, Express, and MongoDB.

## Features

- **Explore Movies**: Browse movies by popular, top-rated, and genre categories.
- **Favorite List**: Add movies to a personal favorite list and view them anytime.
- **User Authentication**: Sign up and log in using JWT for personalized movie lists.

## Installation and Setup

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance for the database.

### Environment Variables

Create a `.env` file in the root of your `server` directory and add the following environment variables:

```
MONGO_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-random-secret-key>
```

- **`MONGO_URL`**: Connection string for your MongoDB database.
- **`JWT_SECRET`**: A random string used as a secret key for signing JWT tokens, which is essential for securely managing user sessions and authentication.

### Backend Setup

1. Navigate to the `server` directory:
   ```
   cd server
   ```
2. Install the required dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm run start
   ```

### Frontend Setup

1. Navigate to the `client` directory:
   ```
   cd client
   ```
2. Install the required dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## CORS Configuration

Ensure that the client's URL is correctly set in the CORS configuration within `authRoute.js`:

```javascript
router.use(
    cors({
        credentials: true,
        origin: '<client-url>'
    })
);
```

Replace `<client-url>` with the actual URL of your client application.
