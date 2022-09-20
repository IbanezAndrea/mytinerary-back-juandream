const express = require('express');
let passport = require('../config/passport');
const router = express.Router();
const { getUser,
        userSignUp,
        getUsers,
        modifyUser,
        removeUser,
        verifyMail,
        userSignIn,
        userSignOut,
        verifyToken 
        } = require('../controllers/userController' )


router.post('/signup', userSignUp);
router.get('/token', passport.authenticate('jwt', {session:false}), verifyToken)
router.post('/signin', userSignIn);
router.post('/signout', userSignOut);
router.get('/', getUsers );
router.get('/acc/:code', verifyMail );
router.get('/:id', getUser );
router.put('/:id', modifyUser );
router.delete('/:id', removeUser );

//router.post('/registration', function(req, res));

module.exports = router;
