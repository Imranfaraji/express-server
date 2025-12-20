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


const getSingleUser=async(req:Request,res:Response)=>{
    
  try {
   const result=await userService.getSingleUser(req.params.id as string)
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

const updateUser=async(req:Request,res:Response)=>{
    const {name,email}=req.body
     try{
    const result= await userService.updateUser(name,email,req.params.id!)

    

    if(result.rows.length===0){
       res.status(404).json({
        success:false,
        message:"user not found"
       })
    }else{
      res.status(200).json({
      success:true,
      message:"user update success fully",
      data:result.rows
    })
    }
  }catch(err:any){
     res.status(500).json({
      success:false,
      message:err?.message
     })
  }
}

const deleteUser=async (req:Request,res:Response)=>{
 try{
     const result = await userService.deleteUser(req.params.id as string)
 
     if(result.rows.length===0){
       res.status(404).json({
         success:false,
         message:"user not found"
       })
     }else{
        res.status(200).json({
       success: true,
       message: "User deleted successfully",
       data: result.rows[0],
     });
     }
    }catch(err:any){
       res.status(500).json({
       success:false,
       message:err?.message
      })
    }
}




export const userControllers={
    createtUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser

}