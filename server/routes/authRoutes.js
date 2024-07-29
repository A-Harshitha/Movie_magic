const express= require('express');
const router= express.Router();
const cors= require('cors');
const {test,registerUser, loginUser, getProfile , logoutUser, addFavoriteMovie, removeFavoriteMovie, getFavorites}=require('../controllers/authController')

router.use(
    cors({
        credentials: true,
        origin: 'https://moviemagic-fend.vercel.app'
    })
)

router.get('/',test)
router.post('/register',registerUser)
router.post('/login', loginUser)
router.get('/profile',getProfile)
router.post('/logout', logoutUser);
router.post('/add-favorite', addFavoriteMovie);
router.post('/remove-favorite', removeFavoriteMovie);
router.get('/get-favorites',getFavorites)

module.exports=router;
