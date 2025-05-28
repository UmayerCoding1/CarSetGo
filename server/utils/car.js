import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';


// Function to convert file to base64
async function fileToBase64(file){

   const absolutePath = path.resolve(file.path);
   const buffer = await fs.promises.readFile(absolutePath);
    return buffer.toString('base64');
}


export const AlAnalyzeCarImage = async (file) => {

  try {
     if(!process.env.GEMINI_API_KEY){
      throw new Error('GEMINI_API_KEY is not configured');
     }

     const  genAi  = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
     const model = genAi.getGenerativeModel({model: 'gemini-1.5-flash'});


     const base64Image = await fileToBase64(file);

     // Determine mimeType from file extension or default to image/jpeg
     const mimeType = file.mimetype || 'image/jpeg';

     const imagePart ={
         inlineData: {
            data: base64Image,
            mimeType: mimeType,
         }
     }


     const prompt = `
      Analyze this car image and extract the following information:
      1: Make (manufacturer)
      2: Model 
      3: Year (approximately)
      4: Color
      5: Mileage (your best guess)
      6: Fuel Type (your best guess)
      7: Body Type (SUV, Sedan, etc.)
      8: Transmission (your best guess)
      9: Price (your best guess)
      10: Seats (number of seats)
      11: Category (your best guess)
      12: Description (a detailed description of the car (min 50 and max 120 words))


     Format your response in as a clean JSON object with these fields:
     {
      make: string,
      model: string,
      year: number,
      color: string,
      mileage: string,
      fuelType: string,
      bodyType: string,
      transmission: string,
      price: number,
      seats: number,
      category: string,
      description: string,
     }


   For confidence, provide a value between 0 and 1 representing how confident you are in your overall indetication.
   Only respond with the JSON object , nothing else.
     `;


     const resilt = await model.generateContent([prompt,imagePart]);
     const response = await resilt.response;
     const text = response.text();
     const cleanText = text.replace(/```(?:json)?\n?/g,"").trim();
    
     try {
        const carDetails = JSON.parse(cleanText);
        
        const requriedFields = ['make','model','year','color','mileage','fuelType','bodyType','transmission','price','seats','category','description'];

        const missingFields = requriedFields.filter(field => !(field in carDetails) );

        if(missingFields.length > 0){
            throw new Error(`AI response missing required fields: ${missingFields.join(', ')}`);
        }

        return {
            success: true,
            data: carDetails,
        };
     } catch (error) {
        console.error('Error parsing car details:', error);
        throw new Error('Failed to parse AI response');
     }

     
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.message || 'Failed to analyze car image'
    };
  }
}