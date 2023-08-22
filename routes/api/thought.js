const router = require('express').Router();
//declares all the things you can do with thoughts
const {
    createThought,
    getThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought.js');

// /api/thoughts
//declares the routes for get all and create a thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id
// declares get 1 thought update a thought and delete a thought routes
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
//declares the add a reaction route
router.route('/:id/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
//declares the delete a reaction route
router.route('/:id/reactions/:reactionId').delete(removeReaction);

module.exports = router;