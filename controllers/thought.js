const { Thought, User } = require('../model');

module.exports = {
    // function to get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({})
               
            res.json(thoughts);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },

    // function to get 1 thought
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id });
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                console.log(req.params.thoughtId)
                return;
            }
            res.json(thought);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },
    
    // function to create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.id },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
    
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
    
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    // function to update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // function to delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },
    
    // function to add a reaction
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },

    // function to remove a reaction
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    }
};