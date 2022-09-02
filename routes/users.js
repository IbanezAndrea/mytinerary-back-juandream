const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('../controllers/userController' )


router.get('/:id', getUser );
router.post('/', createUser);

//router.post('/registration', function(req, res));

module.exports = router;
