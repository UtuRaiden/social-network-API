const {Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
//Thought Schema in creating a new thought
const thoughtSchema = new Schema(
    {
        thoughtText:{
            type:String,
            minlength:1,
            maxlength:280,
            required:true,
        },
        createdAt:{
            type: Date,
            default: Date.now(),
            get:function(createdAt){
                //adds the time it was created at and formats it
                return createdAt.toLocaleString();
            }
        },
        username:{
            type: String,
            require:true,
            minlength:4,
        },
        //uses the reaction schema to display all the reactions
        reactions: [reactionSchema]
    },
    {
        toJSON:{
            virtuals:true,
            getters:true,
        },
        id:false,
    }
);
//grabs the amount of reactions 
thoughtSchema.virtual('reactionAmount').get(function(){ return this.reactions.length});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;