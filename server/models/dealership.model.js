import {Schema,model} from "mongoose";

const dealershipSchema = new Schema({
    name: {type: String, required: true},
    address: [
        {type: String, required: true}
    ],
    phone: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    status: {type: String, default: 'pending', enum: ['pending', 'approved', 'rejected']},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    carId: {type: Schema.Types.ObjectId, ref: 'Car', required: true},
    sellerId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
},{timestamps: true});


export const Dealership = model('Dealership', dealershipSchema);