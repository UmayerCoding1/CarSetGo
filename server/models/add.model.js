import mongoose,{Schema,model} from "mongoose";

const addSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    carId: {type: Schema.Types.ObjectId, ref: 'Car'},
    addData:{
        title: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        image: {type: String, required: true},
        phone: {type: String, required: true},
        email: {type: String, required: true},
        productUrl: {type: String, required: true},
    }
},{timestamps: true});

export const Add = model('Add', addSchema);