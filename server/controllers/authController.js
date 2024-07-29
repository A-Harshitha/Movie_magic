const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({ error: 'Name is required' });
        }
        if (!email) {
            return res.json({ error: 'Email is required' });
        }
        if (!password || password.length < 6) {
            return res.json({ error: 'Password should be at least 6 characters long' });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: 'Email already exists, continue to login' });
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.json(user);
    } catch (err) {
        console.log(err);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.json({ error: 'Email is required' });
        }
        if (!password) {
            return res.json({ error: 'Password is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'No user found' });
        }

        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                 res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', 
                    sameSite: 'None', 
                }).json(user);
            });
        } else {
            res.json({ error: 'Wrong password' });
        }
    } catch (error) {
        console.log(error);
    }
}

const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
}

const logoutUser = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.json({ message: 'Logged out successfully' });
}



const addFavoriteMovie = async (req, res) => {
    const { movieId } = req.body;
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) return res.status(401).json({ error: 'Unauthorized' });

            const updatedUser = await User.findByIdAndUpdate(user.id, {
                $addToSet: { favoriteMovies: Number(movieId) }
            }, { new: true });

            res.json(updatedUser);
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

const removeFavoriteMovie = async (req, res) => {
    const { movieId } = req.body;
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) return res.status(401).json({ error: 'Unauthorized' });

            const updatedUser = await User.findByIdAndUpdate(user.id, {
                $pull: { favoriteMovies: Number(movieId) }
            }, { new: true });

            res.json(updatedUser);
        });
    } else {
        res.status(401).json({ error: 'Unauthorized token missing' });
    }
};

const getFavorites = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) return res.status(401).json({ error: 'Unauthorized' });

            try {
                const fuser = await User.findById(user.id);
                res.json({ favoriteMovies: fuser.favoriteMovies });
            } catch (error) {
                console.error('Error fetching favorite movies:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    addFavoriteMovie,
    removeFavoriteMovie,
    getFavorites
}
