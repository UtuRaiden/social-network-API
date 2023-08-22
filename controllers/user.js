const {User}= require('../model');

module.exports = {
    //function to get all users
    async getUsers(req,res){
        try{
            const users = await User.find()
                res.json(users);
        }catch (err){
            res.status(400).json(err)
        }
    },
//function to get a single user
    async getSingleUser(req,res){
        try{
            const user = await User.findOne({_id: req.params.id})
            .populate("friends")
            .populate("thoughts");
            if(!user){
                res.status(404).json({message:'No User with that ID!',});
                console.error(req.params.userId)
                return;
            }
            res.json(user);
        }catch (err){
            res.status(400).json(err);
        }
    },
//function to create a user
    async createUser(req,res){
        try{
            const user = await User.create(req.body);
            res.json(user);
        }catch (err){
            console.error(err)
            res.status(400).json(err);
        }
    },
//function to update a user
    async updateUser(req,res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.id},
                {$set:req.body},
                {runValidators:true,new:true});
            if(!user){
                res.status(404).json({message:'No User with that ID!'});
                return;
            }
            res.json(user);
        }catch (err){
            res.status(400).json(err);
        }
    },
//function to delete a user
    async deleteUser(req,res){
        try{
            const user = await User.findOneAndDelete({_id: req.params.id});
            if(!user){
                res.status(404).json({message:'No User with that ID!'});
                return;
            }
            res.json(user);
        }catch (err){
            res.status(400).json(err);
        }
    },
//function to add a friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
//function to remove a friend
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    }
};