import mongoose ,{Schema} from 'mongoose';

const favoriteUserSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
},{
    timestamps: true
})