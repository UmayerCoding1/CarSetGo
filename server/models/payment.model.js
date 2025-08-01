import mongoose,{Schema,model} from "mongoose";

const paymentSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    carId: {type: Schema.Types.ObjectId, ref: 'Car', required: false},
    sellerId: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    bookingId: {type: Schema.Types.ObjectId, ref: 'Booking', required: false},
    dealershipId: {type: Schema.Types.ObjectId, ref: 'Dealership', required: false},
    paymentType: {
        type: String,
        enum:['booking', 'buying', 'plan'],
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    }
},{timestamps: true});

export const Payment = model('Payment', paymentSchema)