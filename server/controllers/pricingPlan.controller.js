import {PricingPlan} from "../models/pricing.model.js";

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


export const getAllPricingPlans = async (req, res) => {
    try {
        const pricingPlans = await PricingPlan.find().select("-__v -createdAt -updatedAt");
        res.status(200).json({message: "Pricing plans fetched successfully", pricingPlans});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
