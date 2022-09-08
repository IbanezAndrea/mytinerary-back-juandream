const express = require('express');
const router= express.Router();

const {addComment, getComments, modifyComment, removeComment} = require ('../controllers/commentController');

router.post('/', addComment);
router.get('/', getComments);
router.put('/:id', modifyComment);
router.delete('/:id', removeComment);


module.exports = router;