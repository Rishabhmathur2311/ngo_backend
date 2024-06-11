import Cause from "../modal/CauseModal.js";

export const CreateCause=async (req, res)=>{
    let response=new Cause(req.body);
    response.save();

    try {
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const GetCauses=async(req, res)=>{
    let response = await Cause.find({});

    try {
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const NameFilter=async(req, res)=>{
    let response = await Cause.find({name: req.body.name});

    try {
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const TitleFilter=async(req, res)=>{
    let response = await Cause.find({title: req.body.title});

    try {
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const CityFilter=async(req, res)=>{
    let response = await Cause.find({city: req.body.city});

    try {
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const StateFilter=async(req, res)=>{
    console.log(req.body)
    let response = await Cause.find({state: req.body.state});

    try {
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const ValueFilter=async(req, res)=>{
    console.log(req.body.type);
    let response = await Cause.find({type: req.body.type});
    try {
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}