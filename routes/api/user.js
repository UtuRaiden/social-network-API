//defines all the things that associate with a user
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user');

// /api/users
//declares the routes for get all and create a user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
//declares routes for get 1 delete a user and update a user
router.route('/:id').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/user/:studentId/friend/friendId
//declares how to add a friend and then delete one
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;