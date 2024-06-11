import express from "express";
import { LogInUser, SignUpUser} from "./controller/UserController.js";
import { CreateCause, GetCauses, NameFilter, TitleFilter, CityFilter, StateFilter, ValueFilter } from "./controller/CauseController.js";

const Route=express.Router();

// Route.post("/addBuyerData", AddBuyer);
Route.post("/SignUpUser", SignUpUser);
Route.post("/LogInUser", LogInUser)
Route.post("/CreateCause", CreateCause);
Route.get("/GetCauses", GetCauses);
Route.post("/NameFilter", NameFilter);
Route.post("/TitleFilter", TitleFilter);
Route.post("/CityFilter", CityFilter);
Route.post("/StateFilter", StateFilter);
Route.post("/ValueFilter", ValueFilter);


export default Route;