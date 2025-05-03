import {Schema,model} from "mongoose";

const dealershipSchema = new Schema({
    name: {type: String, required: true},
    address: [
        {type: String, required: true}
    ],
    phone: {type: String, required: true},
    email: {type: String, required: true, unique: true}
},{timestamps: true});


export const Dealership = model('Uealership', dealershipSchema);