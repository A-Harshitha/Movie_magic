# MovieMagic

MovieMagic is a web application that allows users to explore movies based on popularity, ratings, and genres. Users can also maintain a favorite list by adding movies they like and tracking their favorite list using a personalized account.

## View Live

You can view the live version of MovieMagic at [https://moviemagic-fend.vercel.app/](https://moviemagic-fend.vercel.app/).

## Project Structure

- **client**: Contains the frontend code built using React.
- **server**: Contains the backend code built using Node.js, Express, and MongoDB.

## Features

### Explore Movies
- **Popular Movies**: Displays a list of popular movies. Users can select a movie to view detailed information including the tagline, release date, genres, overview, rating, runtime, budget, production companies, and a homepage link for viewing the movie.
- **Top Rated Movies**: Lists the top-rated movies. Detailed information for each movie can be accessed similar to the Popular Movies tab.
- **Genre**: Offers a dropdown menu to filter movies by genre. Selecting a genre displays relevant movies and users can access detailed information for each movie as mentioned above.
- **Note**: Users can explore these features without signing in.

### Favorite List
- **Add Movies**: Users can add movies to their favorite list by clicking the heart icon on any movie in the Popular Movies, Top Rated Movies, or Genres tabs. The heart icon highlights to indicate the movie is added to Favorites.
- **Remove Movies**: Users can remove movies from their favorite list by clicking the heart icon again to remove the highlight.

### User Authentication
- **Register**: Users without an account can register by providing their name, email address, and password. All fields are required. Successful registration redirects users to the login page.
- **Login**: Users can log in using their registered email and password. Successful login redirects users to the home page. Attempting to log in with an unregistered email or incorrect password triggers warning messages.
- **Profile**: Located at the top right corner of the home page:
  - **Not Signed In**: Provides an option to sign in, navigating users to the Login/Register page.
  - **Signed In**: Displays the username and provides two options: Sign out and Favorites.
- **Favorites Access**: Once signed in, users can view and manage their favorite movies. Attempting to add movies to the favorite list without signing in gives an error message.

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
Sure! Here’s an expanded section on how to set up the `MONGO_URL` for your MovieMagic project.

### Setting up MongoDB and `MONGO_URL`

To use MongoDB with your MovieMagic application, follow these steps to set up your MongoDB instance and configure the `MONGO_URL`:

#### Option 1: Using MongoDB Atlas (Cloud MongoDB)

1. **Create a MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.

2. **Create a Cluster**:
   - Once logged in, click on "Build a Cluster" and follow the steps to create a new cluster. Choose the free tier for a no-cost option.

3. **Set Up Cluster Security**:
   - Add a database user with a username and password.
   - Whitelist your IP address to allow connections to your cluster. Alternatively, you can allow access from anywhere (not recommended for production).

4. **Get the Connection String**:
   - After your cluster is set up, click on "Connect" and then "Connect your application".
   - Copy the provided connection string. It will look something like this:
     ```
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
     ```

5. **Configure the `.env` File**:
   - Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB Atlas username, password, and database name respectively.
   - Add this connection string to your `.env` file as `MONGO_URL`:
     ```env
     MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
     JWT_SECRET=<your-random-secret-key>
     ```

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run start
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
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
