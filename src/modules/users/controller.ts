import { Request, Response, Router } from "express";

import { userService } from "./user.service";
const createtUser=async (req:Request,res:Response)=>{
    const {name,email}=req.body

    try{
      const result= await userService.createUser(name,email)
      res.status(201).json({
    success:false,
    message: "data inserted success fully",
    data:result.rows[0]
   })

    }catch(err:any){
       res.status(500).json({
    success:false,
    message: err?.message
   })
    }
}


const getUser= async(req:Request,res:Response)=>{
  try{
   const result = await userService.getUser()
     res.status(201).json({
    success:false,
    message: "data inserted success fully",
    data:result.rows
   })

  }catch(err:any){
    res.status(500).json({
    success:false,
    message: err?.message
   })
  }
}

export const userControllers={
    createtUser,
    getUser
}