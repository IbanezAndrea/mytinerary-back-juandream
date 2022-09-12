const express = require('express');
const router = express.Router();
const { getUser, userSignUp,getUsers,modifyUser,removeUser,verifyMail } = require('../controllers/userController' )


router.post('/signup', userSignUp);
router.get('/', getUsers );
router.get('/acc/:code', verifyMail );
router.get('/:id', getUser );
router.put('/:id', modifyUser );
router.delete('/:id', removeUser );

//router.post('/registration', function(req, res));

module.exports = router;
