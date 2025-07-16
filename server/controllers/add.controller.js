
export const postAdd = (req, res) => {
   try {
    const {title, description,price,image,phone,email,productUrl} = req.body;
   } catch (error) {
    console.log('Car add create error', error);
    return res.status(500).json({ message: "Internal server error", error:error.message, success: false });
   }
};