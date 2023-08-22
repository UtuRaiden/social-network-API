const {Schema, Types}=require('mongoose');
//only the schema for creating a new reaction
const reactionSchema = new Schema(
    {
        reactionId:{
            type:Schema.Types.ObjectId,
            default:()=> new Types.ObjectId(),
        },
        reactionBody:{
            type: String,
            required:true,
            minlength: 1,
            maxlength:280,
        },
        username:{
            type:String,
            minlength:4,
            required:true,
        },
        createdAt:{
            type: Date,
            default: Date.now(),
            get:function(createdAt){
                //grabs the current time and displays it formatted 
                return createdAt.toLocaleString();
            }
        },
    },
    {
        toJSON:{
            virtuals:true,
            getters:true,
        },
        id:false,
    }
)

module.exports = reactionSchema;