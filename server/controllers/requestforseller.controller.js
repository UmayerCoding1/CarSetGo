import { RequestForSeller } from "../models/requestForSeller.model.js";
import { User } from "../models/user.model.js";

export const getRequestToSeller = async (req, res) => {
  const { reason } = req.body;
  const userId = req.userId;
 

  if (!reason) {
    return res
      .status(400)
      .json({ message: "All field is required", success: false });
  }

  try {
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const existReq = await RequestForSeller.findOne({ userId });
    console.log(existReq);

    if (existReq) {
      return res
        .status(400)
        .json({ message: "Request already exist", success: false });
    }

    const newRequest = await RequestForSeller.create({
      userId,
      reason,
    });

    console.log(newRequest);

    return res
      .status(201)
      .json({ message: "Request send successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


export const updateRoleToRequest = async(req,res) => {
    const {userId,reqId} = req.body; 
  try {
     const user = await User.findById({_id: userId});
     if (!user) {
       return res.status(400).json({message: "User not found", success: false})
     }
  
     const existReq = await RequestForSeller.findById({_id: reqId});
     if (!existReq) {
      return res.status(400).json({message: "Request not found", success: false})
     }
  
     const updateRole = await User.findByIdAndUpdate(
        userId,
        {role: 'seller'},
        {new: true}
     );

     const confirmRequest = await RequestForSeller.findByIdAndUpdate(
        reqId,
        {status: 'confirm'},
        {new: true}
     )

     console.log(updateRole,confirmRequest);
     return res.status(200).json({message: 'Add new seller', success: true})
     
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
   
}