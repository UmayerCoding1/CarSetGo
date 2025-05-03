import {Schema,model} from "mongoose";

const testDriveSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    carId: {type: Schema.Types.ObjectId, ref: 'Car'},
},{timestamps: true});


export const TestDrive = model('TestDrive', testDriveSchema);