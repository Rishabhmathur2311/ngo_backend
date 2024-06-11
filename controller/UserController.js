import User from "../modal/User.js";

export const SignUpUser=async (req, res)=>{
    let exist=await User.findOne({email: req.body.email});

    if(exist){
        return res.status(200).json("User already exists");
    }

    let detail=new User(req.body);
    detail.save();

    try {
        return res.status(200).json(detail);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const LogInUser=async (req, res)=>{
    let detail=await User.find({email: req.body.email, password: req.body.password});
    try {
        return res.status(200).json(detail);
    } catch (error) {
        console.log(error);
    }
}

// export const UpdateUser=async (req, res)=>{
//     console.log(req.body);

//     let detail=await User.findByIdAndUpdate(req.body._id, {amount: req.body.amount});
//     console.log(detail);
//     try {
//         return res.status(200).json(detail);
//     } catch (error) {
//         console.log(error);
//     }
// }