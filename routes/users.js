const express = require('express');
const router = express.Router();
const { getUser, userSignUp,getUsers,modifyUser,removeUser } = require('../controllers/userController' )


router.post('/', userSignUp);
router.get('/', getUsers );
router.get('/:id', getUser );
router.put('/:id', modifyUser );
router.delete('/:id', removeUser );

//router.post('/registration', function(req, res));

module.exports = router;
