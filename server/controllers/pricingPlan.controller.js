import {PricingPlan} from "../models/pricing.model.js";
import { User } from "../models/user.model.js";

export const createPricingPlan = async (req, res) => {
    try {
        const {name, price, features} = req.body;
        console.log(req.body);

        if(!name || !price || !features){
            return res.status(400).json({message: "All fields are required"});
        }
        
     const existingPlan = await PricingPlan.findOne({name});
     if(existingPlan){
        return res.status(400).json({message: "Pricing plan already exists"});
     }
        const pricingPlan = await PricingPlan.create({name, price, features});
        console.log(pricingPlan);
        
        res.status(201).json({message: "Pricing plan created successfully"});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getFreePlan = async (req, res) => {
    const {name,features} = req.body;
    const userId = req.userId;
    console.log(userId);
    try {
        const freePlan = await PricingPlan.findOne({name: "free"});
        console.log(freePlan);
        const user = await User.findById(userId);
        
        if(user.plan && user.plan === "free"){
            return res.status(400).json({message: "You are already on the free plan" , success: false});
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {plan: name, planDetails: freePlan._id, isPlanActive: true}, {new: true});
        res.status(200).json({message: "Free plan activated successfully", success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

export const getAllPricingPlans = async (req, res) => {
    try {
        const pricingPlans = await PricingPlan.find().select("-__v -createdAt -updatedAt");
        res.status(200).json({message: "Pricing plans fetched successfully", pricingPlans});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
