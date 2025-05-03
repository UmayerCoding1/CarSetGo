import {Schema,model} from "mongoose";

const saveCarsSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    carId: {type: Schema.Types.ObjectId, ref: 'Car'},
},{timestamps: true});


export const SaveCars = model('SaveCar', saveCarsSchema);