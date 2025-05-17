import {Schema,model} from "mongoose";

const dealershipSchema = new Schema({
    name: {type: String, required: true},
    address: {
        city: {type: String, required: true},
        state: {type: String, required: true},
        zip: {type: String, required: true},
        country: {type: String, required: true},
    },
    phone: {type: String, required: true},
    email: {type: String, required: true},
    status: {type: String, default: 'pending', enum: ['pending', 'approved', 'rejected']},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    carId: {type: Schema.Types.ObjectId, ref: 'Car', required: true},
    sellerId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    paymentInfo: {
        paymentId: {type: Schema.Types.ObjectId, ref: 'Payment'},
        paymentDate: {type: Date},
        paymentAmount: {type: Number},
        paymentStatus: {type: String, default: 'pending', enum: ['pending', 'success', 'failed']},
    },
},{timestamps: true});


export const Dealership = model('Dealership', dealershipSchema);