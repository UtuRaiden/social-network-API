const {Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

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
                return createdAt.toLocalString();
            }
        },
        username:{
            type: String,
            require:true,
            minlength:4,
        },
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

thoughtSchema.virtual('reactionAmount').get(function(){ return this.reactions.length});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;