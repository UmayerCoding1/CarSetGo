import  {model, Schema} from "mongoose";

const userSchema = new Schema({
    fullname: {type: String, requried: true},
     email: {type: String, requried: true, unique: true},
     username: {type: String},
     password: {type: String},
     avatar: {type: String, default: ""},
     role: {
        type: String,
        enum: ["user", 'seller', 'admin'],
        default: 'user'
     },
     paymentstatus: {
        type: String,
        enum: ["pending", 'completed'],
        default: 'pending'
     },
     isGoogleAccount: {type: Boolean, default: false},
     plan: {
        type: String,
        enum: ["free", 'pro','advanced']
     },
     isPlanActive: {type: Boolean, default: false},
     planDetails: {
        type: Schema.Types.ObjectId,
        ref: 'PricingPlan'
     },
     addedCar: [
      {type: Schema.Types.ObjectId, ref: 'Car'}
     ]
},{timestamps: true});

userSchema.pre('save', function (next) {
    if(this.role !== 'seller'){
     this.paymentstatus = undefined;
     this.addedCar = undefined
    };
    
    next();
});

export const User = model('User', userSchema);